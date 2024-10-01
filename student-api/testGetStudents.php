<?php
header("Content-Type: application/json");
$host = 'localhost';
$user = 'root';
$password = '';
$dbname = 'student_records';

// Membuat koneksi
$conn = new mysqli($host, $user, $password, $dbname);

// Cek koneksi
if ($conn->connect_error) {
    die("Koneksi gagal: " . $conn->connect_error);
}

// Query untuk mengambil data
$query = "SELECT * FROM students";
$result = $conn->query($query);

$students = [];
if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $students[] = $row;
    }
}

// Mengembalikan data dalam format JSON
echo json_encode($students);

$conn->close();

