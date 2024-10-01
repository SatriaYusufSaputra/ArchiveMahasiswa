<?php
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: DELETE");

include 'config.php'; // Pastikan ini mengarah ke file config.php yang benar

$id = $_GET['id']; // Ambil id dari parameter query

if ($id) {
    // Masukkan query untuk menghapus data berdasarkan id
    $query = "DELETE FROM students WHERE id = ?";
    $stmt = $conn->prepare($query);
    $stmt->bind_param("i", $id); // "i" berarti integer

    if ($stmt->execute()) {
        if ($stmt->affected_rows > 0) {
            echo json_encode(["success" => true, "message" => "Data berhasil dihapus!"]);
        } else {
            echo json_encode(["success" => false, "message" => "Data tidak ditemukan."]);
        }
    } else {
        echo json_encode(["success" => false, "message" => "Gagal menghapus data."]);
    }

    $stmt->close();
} else {
    echo json_encode(["success" => false, "message" => "ID tidak valid."]);
}

$conn->close();

