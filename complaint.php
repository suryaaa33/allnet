<?php
require_once 'conn.php';
require_once 'header.php';

if ($conn->connect_error) {
    http_response_code(500);
    die(json_encode(["status" => "error", "message" => "Connection failed: " . $conn->connect_error]));
}

function createComplaint($user_id = null, $complaint = '', $name = null, $phone = null, $uuid = null, $address = null, $photo_path = null, $created_at = null)
{
    global $conn;
    $stmt = $conn->prepare(
        "INSERT INTO complaints 
        (customer_id, complaint, status, name, phone, uuid, address, photo_path, created_at) 
        VALUES (?, ?, 'baru', ?, ?, ?, ?, ?, ?)"
    );
    $stmt->bind_param("isssssss", $user_id, $complaint, $name, $phone, $uuid, $address, $photo_path, $created_at);
    $response = [];

    if ($stmt->execute()) {
        $response = ["status" => "success", "message" => "Complaint created successfully"];
    } else {
        $response = ["status" => "error", "message" => "Error: " . $stmt->error];
    }

    echo json_encode($response);
    http_response_code($response['status'] === 'success' ? 201 : 400);
    $stmt->close();
}

function getUserComplaintHistory($user_id)
{
    global $conn;
    $stmt = $conn->prepare("SELECT * FROM complaints WHERE customer_id = ?");
    $stmt->bind_param("i", $user_id);
    $stmt->execute();
    $result = $stmt->get_result();
    $complaints = $result->fetch_all(MYSQLI_ASSOC);
    $stmt->close();
    return $complaints;
}

function getUserAssignedComplaints($technician_id)
{
    global $conn;
    $stmt = $conn->prepare("SELECT * FROM complaints WHERE technician_id = ?");
    $stmt->bind_param("i", $technician_id);
    $stmt->execute();
    $result = $stmt->get_result();
    $complaints = $result->fetch_all(MYSQLI_ASSOC);
    $stmt->close();
    return $complaints;
}

function updateComplaintStatus($complaint_id, $status)
{
    global $conn;
    $stmt = $conn->prepare("UPDATE complaints SET status = ? WHERE complaint_id = ?");
    $stmt->bind_param("si", $status, $complaint_id);
    $response = [];

    if ($stmt->execute()) {
        $response = ["status" => "success", "message" => "Complaint status updated successfully"];
    } else {
        $response = ["status" => "error", "message" => "Error: " . $stmt->error];
    }

    echo json_encode($response);
    http_response_code($response['status'] === 'success' ? 200 : 400);
    $stmt->close();
}

function countNewComplaints()
{
    global $conn;
    $stmt = $conn->prepare("SELECT COUNT(*) as new_complaints FROM complaints WHERE status = 'baru'");
    $stmt->execute();
    $result = $stmt->get_result();
    $count = $result->fetch_assoc();
    $stmt->close();
    return $count['new_complaints'];
}

function updateComplaint($complaint_id, $data)
{
    global $conn;
    $fields = [];
    $params = [];
    $types = '';

    $complaint = findComplaintByID($complaint_id);

    foreach ($data as $key => $value) {
        $fields[] = "$key = ?";
        $params[] = $value;
        $types .= is_int($value) ? 'i' : 's';
    }
    $params[] = $complaint_id;
    $types .= 'i';

    $stmt = $conn->prepare("UPDATE complaints SET " . implode(', ', $fields) . " WHERE complaint_id = ?");
    $stmt->bind_param($types, ...$params);
    $response = [];

    if ($stmt->execute()) {
        $response = ["status" => "success", "message" => "Complaint updated successfully"];
    } else {
        $response = ["status" => "error", "message" => "Error: " . $stmt->error];
    }


    if (isset($data['status']) && $data['status'] !== $complaint['status']) {
        // Send notification to customer
        $stmt = $conn->prepare("INSERT INTO notifications (user_id, message) VALUES (?, ?)");

        $message = "";
        $notification_user_id = null;
        $stmt->bind_param("is", $notification_user_id, $message);
        if ($complaint['customer_id'] != null) {
            $message = "Status pengaduan anda telah dirubah menjadi " . $data['status'];
            $notification_user_id = $complaint['customer_id'];
            $stmt->execute();
        }

        // Send notification to technician if status is 'diproses'
        if ($data['status'] === 'diproses') {
            $notification_user_id = $data['technician_id'];
            $message = "Anda ditugaskan untuk menangani pengaduan baru.";
            $stmt->execute();
        }

        // Send notification to all admins if status is 'selesai'
        if ($data['status'] === 'selesai') {
            $message = "Pengaduan telah selesai";

            $sql = "SELECT user_id FROM users WHERE role = 'admin'";
            $result = mysqli_query($conn, $sql);

            if ($result) {
                if (mysqli_num_rows($result) > 0) {
                    while ($row = mysqli_fetch_assoc($result)) {
                        $notification_user_id = $row['user_id'];
                        $stmt->execute();
                    }
                }
            }
        }
    }

    echo json_encode($response);
    http_response_code($response['status'] === 'success' ? 200 : 400);
    $stmt->close();
}

function deleteComplaint($complaint_id)
{
    global $conn;
    $stmt = $conn->prepare("DELETE FROM complaints WHERE complaint_id = ?");
    $stmt->bind_param("i", $complaint_id);
    $response = [];

    if ($stmt->execute()) {
        $response = ["status" => "success", "message" => "Complaint deleted successfully"];
    } else {
        $response = ["status" => "error", "message" => "Error: " . $stmt->error];
    }

    echo json_encode($response);
    http_response_code($response['status'] === 'success' ? 200 : 400);
    $stmt->close();
}

function getAllComplaints()
{
    global $conn;
    $stmt = $conn->prepare(
        "SELECT c.*,
                t.name as technician_name, 
                s.name as service_name,
                cus.name as customer_name,
                cus.phone as customer_phone,
                cus.address as customer_address,
                cus.uuid as customer_uuid
         FROM complaints c
         LEFT JOIN users t ON c.technician_id = t.user_id
         LEFT JOIN users cus ON c.customer_id = cus.user_id
         LEFT JOIN subscriptions sub ON c.customer_id = sub.user_id
         LEFT JOIN services s ON sub.service_id = s.service_id"
    );
    $stmt->execute();
    $result = $stmt->get_result();
    $complaints = $result->fetch_all(MYSQLI_ASSOC);
    $stmt->close();
    return $complaints;
}

function findComplaintByID($complaint_id)
{
    global $conn;
    $stmt = $conn->prepare(
        "SELECT c.*,
                t.name as technician_name, 
                s.name as service_name,
                cus.name as customer_name,
                cus.phone as customer_phone,
                cus.address as customer_address,
                cus.uuid as customer_uuid
         FROM complaints c
         LEFT JOIN users t ON c.technician_id = t.user_id
         LEFT JOIN users cus ON c.customer_id = cus.user_id
         LEFT JOIN subscriptions sub ON c.customer_id = sub.user_id
         LEFT JOIN services s ON sub.service_id = s.service_id
         WHERE c.complaint_id = ?"
    );
    $stmt->bind_param("i", $complaint_id);
    $stmt->execute();
    $result = $stmt->get_result();
    $complaint = $result->fetch_assoc();
    $stmt->close();
    return $complaint;
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    if (isset($_POST['action'])) {
        if ($_POST['action'] === 'create' && isset($_POST['complaint'])) {
            $user_id = $_POST['user_id'] ?? null;
            $complaint = $_POST['complaint'] ?? null;
            $name = $_POST['name'] ?? null;
            $phone = $_POST['phone'] ?? null;
            $uuid = $_POST['uuid'] ?? null;
            $address = $_POST['address'] ?? null;
            $photo_path = $_POST['photo_path'] ?? null;
            $created_at = $_POST['created_at'] ?? null;

            createComplaint(
                $user_id,
                $complaint,
                $name,
                $phone,
                $uuid,
                $address,
                $photo_path,
                $created_at
            );
        } elseif ($_POST['action'] === 'updateStatus' && isset($_POST['complaint_id']) && isset($_POST['status'])) {
            $complaint_id = $_POST['complaint_id'];
            $status = $_POST['status'];
            updateComplaintStatus($complaint_id, $status);
        } elseif ($_POST['action'] === 'update' && isset($_POST['complaint_id'])) {
            $complaint_id = $_POST['complaint_id'];
            $data = $_POST;
            unset($data['action']);
            unset($data['complaint_id']);
            updateComplaint($complaint_id, $data);
        } elseif ($_POST['action'] === 'delete' && isset($_POST['complaint_id'])) {
            $complaint_id = $_POST['complaint_id'];
            deleteComplaint($complaint_id);
        } elseif ($_POST['action'] === 'getAllComplaints') {
            $result = getAllComplaints();
            echo json_encode(["status" => "success", "message" => "Success", "data" => $result]);
        } elseif ($_POST['action'] === 'findComplaintByID' && isset($_POST['complaint_id'])) {
            $complaint_id = $_POST['complaint_id'];
            $result = findComplaintByID($complaint_id);
            echo json_encode(["status" => "success", "message" => "Success", "data" => $result]);
        } else {
            http_response_code(404);
            echo json_encode(["status" => "error", "message" => "Invalid action"]);
        }
    } else {
        http_response_code(404);
        echo json_encode(["status" => "error", "message" => "No action specified"]);
    }
} else {
    if (isset($_GET['user_id'])) {
        $result = getUserComplaintHistory($_GET['user_id']);
        echo json_encode(["status" => "success", "message" => "Success", "data" => $result]);
    } elseif (isset($_GET['technician_id'])) {
        $result = getUserAssignedComplaints($_GET['technician_id']);
        echo json_encode(["status" => "success", "message" => "Success", "data" => $result]);
    } elseif (isset($_GET['new_complaints'])) {
        $result = countNewComplaints();
        echo json_encode(["status" => "success", "message" => "Success", "data" => $result]);
    } else {
        http_response_code(404);
        echo json_encode(["status" => "error", "message" => "No user_id specified"]);
    }
}
$conn->close();
