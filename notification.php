<?php
require_once 'conn.php';
require_once 'header.php';

if ($conn->connect_error) {
    http_response_code(500);
    die(json_encode(["status" => "error", "message" => "Connection failed: " . $conn->connect_error]));
}

function createNotification($user_id, $message)
{
    global $conn;
    $stmt = $conn->prepare("INSERT INTO notifications (user_id, message) VALUES (?, ?)");
    $stmt->bind_param("is", $user_id, $message);
    $response = [];

    if ($stmt->execute()) {
        $response = ["status" => "success", "message" => "Notification created successfully"];
    } else {
        $response = ["status" => "error", "message" => "Error: " . $stmt->error];
    }

    echo json_encode($response);
    http_response_code($response['status'] === 'success' ? 201 : 400);
    $stmt->close();
}

function markNotificationsAsRead($user_id)
{
    global $conn;
    $stmt = $conn->prepare("UPDATE notifications SET read_at = NOW() WHERE user_id = ? AND read_at IS NULL");
    $stmt->bind_param("i", $user_id);
    $stmt->execute();
    $stmt->close();
}

function readNotifications($user_id)
{
    global $conn;
    $stmt = $conn->prepare("SELECT * FROM notifications WHERE user_id = ?");
    $stmt->bind_param("i", $user_id);
    $stmt->execute();
    $result = $stmt->get_result();
    $notifications = $result->fetch_all(MYSQLI_ASSOC);
    $stmt->close();

    return $notifications;
}

function countUnreadNotifications($user_id)
{
    global $conn;
    $stmt = $conn->prepare("SELECT COUNT(*) as unread_count FROM notifications WHERE user_id = ? AND read_at IS NULL");
    $stmt->bind_param("i", $user_id);
    $stmt->execute();
    $result = $stmt->get_result();
    $count = $result->fetch_assoc()['unread_count'];
    $stmt->close();
    return $count;
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    if (isset($_POST['action'])) {
        if ($_POST['action'] === 'create' && isset($_POST['message'])) {
            $user_id = $_POST['user_id'] ?? null;
            $message = $_POST['message'] ?? null;

            createNotification($user_id, $message);
        } else {
            http_response_code(404);
            echo json_encode(["status" => "error", "message" => "Invalid action"]);
        }
    } else {
        http_response_code(404);
        echo json_encode(["status" => "error", "message" => "No action specified"]);
    }
} else {
    if (isset($_GET['user_id']) && isset($_GET['action'])) {
        $result = null;
        $response = ["status" => "success", "message" => "Success", "data" => $result];

        if ($_GET['action'] === 'read') {
            $result = readNotifications($_GET['user_id']);
        } elseif ($_GET['action'] === 'count') {
            $result = countUnreadNotifications($_GET['user_id']);
        } elseif ($_GET['action'] === 'mark_as_read') {
            markNotificationsAsRead($_GET['user_id']);
        } else {
            http_response_code(404);
            $response = ["status" => "error", "message" => "Invalid action"];
        }
        $response['data'] = $result;
        echo json_encode($response);
    } else {
        http_response_code(404);
        echo json_encode(["status" => "error", "message" => "No user_id specified"]);
    }
}
$conn->close();
