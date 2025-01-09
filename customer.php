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
    $stmt = $conn->prepare("SELECT *, s.name as service_name FROM customers
        LEFT JOIN services s ON customers.service_id = s.service_id
        LEFT JOIN service_areas ON customers.service_area_id = service_areas.service_area_id");
    $stmt->execute();
    $result = $stmt->get_result();
    $customers = $result->fetch_all(MYSQLI_ASSOC);
    $stmt->close();
    return $customers;
}

function createCustomer($name, $phone, $uuid, $address, $photo_path, $email, $nik, $service_area_id, $service_id, $service_type, $payment_method, $payment_type)
{
    global $conn;
    $stmt = $conn->prepare(
        "INSERT INTO customers 
        (name, phone, uuid, address, photo_path, email, nik, service_area_id, service_id, service_type, payment_method, payment_type) 
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)"
    );
    $stmt->bind_param("sssssssiisss", $name, $phone, $uuid, $address, $photo_path, $email, $nik, $service_area_id, $service_id, $service_type, $payment_method, $payment_type);
    $response = [];

    if ($stmt->execute()) {
        $response = ["status" => "success", "message" => "Customer created successfully"];
    } else {
        $response = ["status" => "error", "message" => "Error: " . $stmt->error];
    }

    echo json_encode($response);
    http_response_code($response['status'] === 'success' ? 201 : 400);
    $stmt->close();
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    if (isset($_POST['action'])) {
        if ($_POST['action'] === 'create' && isset($_POST['name']) && isset($_POST['email'])) {
            $name = $_POST['name'];
            $phone = $_POST['phone'] ?? null;
            $uuid = $_POST['uuid'] ?? null;
            $address = $_POST['address'] ?? null;
            $photo_path = $_POST['photo_path'] ?? null;
            $email = $_POST['email'];
            $nik = $_POST['nik'] ?? null;
            $service_area_id = $_POST['service_area_id'] ?? null;
            $service_id = $_POST['service_id'] ?? null;
            $service_type = $_POST['service_type'] ?? null;
            $payment_method = $_POST['payment_method'] ?? null;
            $payment_type = $_POST['payment_type'] ?? null;

            createCustomer($name, $phone, $uuid, $address, $photo_path, $email, $nik, $service_area_id, $service_id, $service_type, $payment_method, $payment_type);
        } else {
            http_response_code(404);
            echo json_encode(["status" => "error", "message" => "Invalid action"]);
        }
    } else {
        http_response_code(404);
        echo json_encode(["status" => "error", "message" => "No action specified"]);
    }
} else {
    $result = getAllCustomers();
    echo json_encode(["status" => "success", "message" => "Success", "data" => $result]);
}

$conn->close();
