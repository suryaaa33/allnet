<?php
require_once 'conn.php';
require_once 'header.php';

if ($conn->connect_error) {
    http_response_code(500);
    die(json_encode(["status" => "error", "message" => "Connection failed: " . $conn->connect_error]));
}

function getAllServiceArea()
{
    global $conn;
    $sql = "SELECT * FROM service_areas";
    $result = $conn->query($sql);

    $serviceAreas = [];
    if ($result->num_rows > 0) {
        while ($row = $result->fetch_assoc()) {
            $serviceAreas[] = $row;
        }
    }
    return $serviceAreas;
}

function getAllServicesWithArea()
{
    global $conn;
    $sql = "SELECT s.*, sa.area_name FROM services s 
        LEFT JOIN service_areas sa ON s.service_area_id = sa.service_area_id";
    $result = $conn->query($sql);

    $services = [];
    if ($result->num_rows > 0) {
        while ($row = $result->fetch_assoc()) {
            $services[] = $row;
        }
    }
    return $services;
}

function findServiceByIDWithArea($id)
{
    global $conn;
    $sql =
        "SELECT s.*, sa.area_name FROM services s 
     LEFT JOIN service_service_area ssa ON s.service_id = ssa.service_id
     LEFT JOIN service_areas sa ON ssa.service_area_id = sa.service_area_id
     WHERE s.service_id = ?";

    $stmt = $conn->prepare($sql);
    $stmt->bind_param("i", $id);
    $stmt->execute();
    $result = $stmt->get_result();

    $service = null;
    if ($result->num_rows > 0) {
        $service = $result->fetch_assoc();
    }
    return $service;
}

function getAllServicesByArea($area_id)
{
    global $conn;
    $sql =
        "SELECT s.*, ssa.*, sa.area_name FROM services s 
     LEFT JOIN service_service_area ssa ON s.service_id = ssa.service_id
     LEFT JOIN service_areas sa ON ssa.service_area_id = sa.service_area_id
     WHERE sa.service_area_id = ?";

    $stmt = $conn->prepare($sql);
    $stmt->bind_param("i", $area_id);
    $stmt->execute();
    $result = $stmt->get_result();

    $services = [];
    if ($result->num_rows > 0) {
        while ($row = $result->fetch_assoc()) {
            $services[] = $row;
        }
    }
    return $services;
}

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    if (isset($_GET['action'])) {
        if ($_GET['action'] === 'getAllServices') {
            $result = getAllServicesWithArea();
            echo json_encode(["status" => "success", "message" => "Success", "data" => $result]);
        } elseif ($_GET['action'] === 'getAllServiceArea') {
            $result = getAllServiceArea();
            echo json_encode(["status" => "success", "message" => "Success", "data" => $result]);
        } elseif ($_GET['action'] === 'findServiceByID' && isset($_GET['id'])) {
            $result = findServiceByIDWithArea($_GET['id']);
            echo json_encode(["status" => "success", "message" => "Success", "data" => $result]);
        } elseif ($_GET['action'] === 'getAllServicesByArea' && isset($_GET['area_id'])) {
            $result = getAllServicesByArea($_GET['area_id']);
            echo json_encode(["status" => "success", "message" => "Success", "data" => $result]);
        } else {
            http_response_code(404);
            echo json_encode(["status" => "error", "message" => "Invalid action or missing parameters"]);
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
