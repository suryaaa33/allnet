<?php
require_once 'conn.php';
require_once 'header.php';

if ($conn->connect_error) {
    http_response_code(500);
    die(json_encode(["status" => "error", "message" => "Connection failed: " . $conn->connect_error]));
}

function register($conn)
{
    $name = $_POST['name'];
    $email = $_POST['email'];
    $phone = $_POST['phone'];
    $nik = $_POST['nik'];
    $address = $_POST['address'];
    $payment_method = $_POST['payment_method'];
    $payment_type = $_POST['payment_type'];
    $service_type = $_POST['service_type'];
    $service_id = $_POST['service_id'];
    $password = password_hash($_POST['password'], PASSWORD_BCRYPT);
    $uuid = uniqid();
    $role = 'customer';

    $stmt = $conn->prepare(
        "INSERT INTO users 
        (name, email, phone, password, role, uuid, nik, address, payment_method, payment_type, service_type, service_id) 
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)"
    );
    $stmt->bind_param(
        "ssssssssssss",
        $name,
        $email,
        $phone,
        $password,
        $role,
        $uuid,
        $nik,
        $address,
        $payment_method,
        $payment_type,
        $service_type,
        $service_id
    );
    $response = [];

    if ($stmt->execute()) {
        $response = ["status" => "success", "message" => "User registered successfully"];
    } else {
        $response = ["status" => "error", "message" => "Error: " . $stmt->error];
    }

    echo json_encode($response);
    http_response_code($response['status'] === 'success' ? 201 : 400);

    $stmt->close();
}

function login($conn)
{
    $username = $_POST['username'];
    $password = $_POST['password'];

    $sql = "SELECT * FROM users WHERE uuid = '$username'";
    $result = $conn->query($sql);
    $result = $result->fetch_assoc();
    $response = [];

    if (password_verify($password, $result['password']) && $password !== '') {
        $response = ["status" => "success", "message" => "Login successful", "code" => 200];
    } else {
        $response = ["status" => "error", "message" => "Login failed", "code" => 401];
    }

    $response['user'] = $result;
    echo json_encode($response);
    http_response_code($response['code']);
}

function getUserById($conn, $id)
{
    $sql = "SELECT u.*,
    s.price, s.name AS service_name, s.description, s.speed, su.subscription_id, su.started_at, su.next_payment_at
    FROM users u
    LEFT JOIN subscriptions su ON u.user_id = su.user_id
    LEFT JOIN services s ON su.service_id = s.service_id
    WHERE u.user_id = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("i", $id);
    $stmt->execute();
    $result = $stmt->get_result();
    $response = [];

    if ($result->num_rows > 0) {
        $response = ["status" => "success", "user" => $result->fetch_assoc()];
    } else {
        $response = ["status" => "error", "message" => "User not found"];
    }

    echo json_encode($response);
    http_response_code($response['status'] === 'success' ? 200 : 404);

    $stmt->close();
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    if (isset($_POST['action'])) {
        if ($_POST['action'] === 'register') {
            register($conn);
        } elseif ($_POST['action'] === 'login') {
            login($conn);
        } elseif ($_POST['action'] === 'get_user_by_id') {
            getUserById($conn, $_POST['user_id']);
        } else {
            echo json_encode(["status" => "error", "message" => "Invalid action"]);
        }
    } else {
        echo json_encode(["status" => "error", "message" => "No action specified"]);
    }
} else {
    echo json_encode(["status" => "error", "message" => "Invalid request method"]);
}

$conn->close();
