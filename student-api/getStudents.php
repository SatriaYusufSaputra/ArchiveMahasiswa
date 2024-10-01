<?php
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *"); // Allow requests from any origin

include 'config.php'; // Sertakan file konfigurasi database

// Query untuk mengambil data dari tabel students
$query = "SELECT id, nama, nim, universitas, noHpEmail, kelompok, proyek, github, tanggalMasuk, tanggalKeluar, penempatan FROM students";

$result = $conn->query($query);

$students = array();

if ($result->num_rows > 0) {
    // Loop melalui hasil query
    while($row = $result->fetch_assoc()) {
        // Masukkan hasil query ke dalam array
        $students[] = $row;
    }
}

// Kembalikan data dalam format JSON
echo json_encode($students);

// Tutup koneksi
$conn->close();

