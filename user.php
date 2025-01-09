<?php
require_once 'conn.php';
require_once 'header.php';

if ($conn->connect_error) {
    http_response_code(500);
    die(json_encode(["status" => "error", "message" => "Connection failed: " . $conn->connect_error]));
}

function getAllCustomers()
{
    global $conn;

    $sql = "SELECT u.*, s.name AS service_name, s.speed AS service_speed FROM users u
            LEFT JOIN subscriptions su ON u.user_id = su.user_id
            LEFT JOIN services s ON su.service_id = s.service_id
            WHERE u.role = 'customer'";
    $stmt = $conn->prepare($sql);
    $stmt->execute();
    $result = $stmt->get_result();
    $customers = $result->fetch_all(MYSQLI_ASSOC);
    $stmt->close();
    return $customers;
}

function getAllTechnicians()
{
    global $conn;
    $stmt = $conn->prepare("
        SELECT u.*
        FROM users u
        WHERE u.role = 'technician'
    ");
    $stmt->execute();
    $result = $stmt->get_result();
    $technicians = $result->fetch_all(MYSQLI_ASSOC);
    $stmt->close();
    return $technicians;
}
function countCustomers()
{
    global $conn;
    $stmt = $conn->prepare("
        SELECT 
            (SELECT COUNT(*) FROM users u 
             JOIN subscriptions s ON u.user_id = s.user_id 
             WHERE u.role = 'customer') as active,
            (SELECT COUNT(*) FROM users u 
             WHERE  NOT EXISTS (SELECT * FROM subscriptions s WHERE u.user_id = s.user_id)
             AND u.role = 'customer') as inactive,
             (SELECT COUNT(*) FROM customers) as new
    ");
    $stmt->execute();
    $result = $stmt->get_result();
    $count = $result->fetch_assoc();
    $stmt->close();

    return $count;
}

function createUser($data)
{
    global $conn;
    $name = $data['name'];
    $email = $data['email'];
    $phone = $data['phone'];
    $role = $data['role'] ?? 'customer';
    $uuid = uniqid();
    $nik = $data['nik'] ?? null;
    $address = $data['address'] ?? null;
    $payment_type = $data['payment_type'] ?? null;
    $payment_method = $data['payment_method'] ?? null;
    $service_type = $data['service_type'] ?? null;
    $area = $data['area'] ?? null;
    $status = $data['status'] ?? null;
    $password = $data['password'];

    $sql = "INSERT INTO users 
        (name, email, phone, password, role, uuid, nik, address, payment_type, payment_method, service_type, area, status) 
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param(
        "sssssssssssss",
        $name,
        $email,
        $phone,
        password_hash($password, PASSWORD_BCRYPT),
        $role,
        $uuid,
        $nik,
        $address,
        $payment_type,
        $payment_method,
        $service_type,
        $area,
        $status
    );
    $stmt->execute();
    $stmt->close();

    if (isset($data['service_id'])) {
        $sql = "INSERT INTO subscriptions (user_id, service_id, service_area_id, nama_paket) VALUES (?, ?, ?, ?)";
        $stmt = $conn->prepare($sql);
        $stmt->bind_param("iiis", $user_id, $data['service_id'], $data['service_area_id'], $data['nama_paket']);
    }

    return true;
}

function updateUser($user_id, $data)
{
    global $conn;

    $sql = "UPDATE users SET name = ?, email = ?, phone = ?,
        role = ?, nik = ?, address = ?, payment_type = ?, payment_method = ?, 
        service_type = ?, area = ?, status = ? WHERE user_id = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param(
        "sssssssssssi",
        $data['name'],
        $data['email'],
        $data['phone'],
        $data['role'],
        $data['nik'],
        $data['address'],
        $data['payment_type'],
        $data['payment_method'],
        $data['service_type'],
        $data['area'],
        $data['status'],
        $user_id
    );
    $stmt->execute();
    $stmt->close();


    $sql = "SELECT * FROM subscriptions WHERE user_id = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("i", $user_id);
    $stmt->execute();
    $result = $stmt->get_result();
    $subscription = $result->fetch_assoc();

    if ($subscription) {
        $sql = "UPDATE subscriptions SET service_id = ?, service_area_id = ? WHERE user_id = ?";
        $stmt = $conn->prepare($sql);
        $stmt->bind_param("iii", $data['service_id'], $data['service_area_id'], $user_id);
    } else {
        if (isset($data['service_id'])) {
            $sql = "INSERT INTO subscriptions (user_id, service_id, service_area_id) VALUES (?, ?, ?)";
            $stmt = $conn->prepare($sql);
            $stmt->bind_param("iii", $user_id, $data['service_id'], $data['service_area_id']);
        }
    }
    $stmt->execute();
    $stmt->close();

    return true;
}

function deleteUser($user_id)
{
    global $conn;
    $stmt = $conn->prepare("DELETE FROM users WHERE user_id = ?");
    $stmt->bind_param("i", $user_id);
    $stmt->execute();
    $stmt->close();
    return true;
}

function findUserById($user_id)
{
    global $conn;

    $sql = "SELECT u.*, s.service_id, sa.service_area_id FROM users  u
    LEFT JOIN subscriptions su ON u.user_id = su.user_id
    LEFT JOIN services s ON su.service_id = s.service_id
    LEFT JOIN service_areas sa ON su.service_area_id = sa.service_area_id
    WHERE u.user_id = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("i", $user_id);
    $stmt->execute();
    $result = $stmt->get_result();
    $user = $result->fetch_assoc();
    $stmt->close();
    return $user;
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    if (isset($_POST['action'])) {
        if ($_POST['action'] === 'createUser') {
            $data = json_decode(file_get_contents('php://input'), true);
            $user_id = createUser($_POST);
            echo json_encode(["status" => "success", "message" => "User created", "user_id" => $user_id]);
        } elseif ($_POST['action'] === 'updateUser') {
            $user_id = $_POST['user_id'];
            updateUser($user_id, $_POST);
            echo json_encode(["status" => "success", "message" => "User updated"]);
        } elseif ($_POST['action'] === 'deleteUser') {
            $user_id = $_POST['user_id'];
            deleteUser($user_id);
            echo json_encode(["status" => "success", "message" => "User deleted"]);
        } else {
            http_response_code(404);
            echo json_encode(["status" => "error", "message" => "Invalid action"]);
        }
    } else {
        http_response_code(404);
        echo json_encode(["status" => "error", "message" => "No action specified"]);
    }
} elseif ($_SERVER['REQUEST_METHOD'] === 'GET') {
    if (isset($_GET['action'])) {
        if ($_GET['action'] === 'getAllCustomers') {
            $result = getAllCustomers();
            echo json_encode(["status" => "success", "message" => "Success", "data" => $result]);
        } elseif ($_GET['action'] === 'getAllTechnicians') {
            $result = getAllTechnicians();
            echo json_encode(["status" => "success", "message" => "Success", "data" => $result]);
        } elseif ($_GET['action'] === 'countCustomers') {
            $result = countCustomers();
            echo json_encode(["status" => "success", "message" => "Success", "data" => $result]);
        } elseif ($_GET['action'] === 'findUserById' && isset($_GET['user_id'])) {
            $user_id = $_GET['user_id'];
            $result = findUserById($user_id);
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
    http_response_code(405);
    echo json_encode(["status" => "error", "message" => "Method not allowed"]);
}

$conn->close();
