<?php
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");

include 'config.php'; // Sertakan file konfigurasi database

// Ambil data JSON dari request
$data = json_decode(file_get_contents("php://input"), true);

if (isset($data['nama'], $data['nim'], $data['universitas'], $data['noHpEmail'], $data['kelompok'], $data['proyek'], $data['github'], $data['tanggalMasuk'], $data['tanggalKeluar'], $data['penempatan'])) {
    // Query untuk menyimpan data baru
    $query = "INSERT INTO students (nama, nim, universitas, noHpEmail, kelompok, proyek, github, tanggalMasuk, tanggalKeluar, penempatan) 
              VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
    
    $stmt = $conn->prepare($query);
    $stmt->bind_param("ssssssssss", $data['nama'], $data['nim'], $data['universitas'], $data['noHpEmail'], $data['kelompok'], $data['proyek'], $data['github'], $data['tanggalMasuk'], $data['tanggalKeluar'], $data['penempatan']);
    
    if ($stmt->execute()) {
        // Kembalikan data yang berhasil disimpan sebagai response
        echo json_encode([
            "success" => true,
            "message" => "Data berhasil disimpan!",
            "id" => $stmt->insert_id, // Kirim ID yang baru dihasilkan
            "nama" => $data['nama'],
            "nim" => $data['nim'],
            "universitas" => $data['universitas'],
            "noHpEmail" => $data['noHpEmail'],
            "kelompok" => $data['kelompok'],
            "proyek" => $data['proyek'],
            "github" => $data['github'],
            "tanggalMasuk" => $data['tanggalMasuk'],
            "tanggalKeluar" => $data['tanggalKeluar'],
            "penempatan" => $data['penempatan']
        ]);
    } else {
        echo json_encode(["success" => false, "message" => "Gagal menyimpan data."]);
    }

    $stmt->close();
} else {
    echo json_encode(["success" => false, "message" => "Data tidak lengkap."]);
}

$conn->close();

