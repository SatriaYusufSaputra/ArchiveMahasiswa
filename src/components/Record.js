import React, { useEffect, useState } from 'react';
import Sidebar from './Sidebar'; // Import Sidebar
import './Record.css'; // CSS khusus untuk halaman record

const Record = () => {
  const [records, setRecords] = useState([]); // State untuk menyimpan data
  const [searchTerm, setSearchTerm] = useState(''); // State untuk menyimpan input pencarian

  useEffect(() => {
    fetchRecords(); // Ambil data dari backend saat komponen di-mount
  }, []);

  // Fungsi untuk mengambil data dari server
  const fetchRecords = () => {
    fetch('http://localhost/archive_mahasiswa/student-api/getStudents.php')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        if (Array.isArray(data)) {
          setRecords(data); // Set records dengan data yang didapat
        } else {
          console.error('Data is not an array:', data);
        }
      })
      .catch(error => console.error('Error fetching data:', error));
  };

  // Fungsi untuk menangani perubahan input pencarian
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value); // Update state searchTerm
  };

  // Filter records berdasarkan searchTerm
  const filteredRecords = records.filter(record =>
    record.kelompok.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Fungsi untuk menghapus record
  const handleDelete = (id) => {
    if (window.confirm('Apakah Anda yakin ingin menghapus data ini?')) {
      fetch(`http://localhost/archive_mahasiswa/student-api/deleteStudent.php?id=${id}`, {
        method: 'DELETE', // Menggunakan metode DELETE
      })
        .then(response => response.json())
        .then(data => {
          if (data.success) {
            alert(data.message); // Tampilkan pesan sukses
            fetchRecords(); // Memuat ulang data setelah penghapusan berhasil
          } else {
            alert(data.message); // Tampilkan pesan kesalahan
          }
        })
        .catch(error => console.error('Error deleting data:', error));
    }
  };

  return (
    <div className="record-container">
      {/* Sidebar di sebelah kiri */}
      <Sidebar />

      {/* Konten Record di sebelah kanan */}
      <div className="record-content">
        <h1>Record</h1>
        <input
          type="text"
          placeholder="Cari berdasarkan Nama Kelompok..."
          value={searchTerm}
          onChange={handleSearchChange}
          className="search-input" // Tambahkan kelas untuk styling
        />
        {/* Tampilkan data dalam tabel */}
        <table>
          <thead>
            <tr>
              <th>Nama</th>
              <th>NIM</th>
              <th>Universitas</th>
              <th>No HP/Email</th>
              <th>Kelompok</th>
              <th>Proyek</th>
              <th>GitHub</th>
              <th>Tanggal Masuk</th> {/* Kolom untuk Tanggal Masuk */}
              <th>Tanggal Keluar</th> {/* Kolom untuk Tanggal Keluar */}
              <th>Penempatan</th> {/* Kolom untuk Penempatan */}
              <th>Aksi</th> {/* Kolom untuk aksi */}
            </tr>
          </thead>
          <tbody>
            {filteredRecords.length > 0 ? (
              filteredRecords.map((record, index) => (
                <tr key={index}>
                  <td>{record.nama}</td>
                  <td>{record.nim}</td>
                  <td>{record.universitas}</td>
                  <td>{record.noHpEmail}</td>
                  <td>{record.kelompok}</td>
                  <td>{record.proyek}</td>
                  <td>
                    <a href={record.github} target="_blank" rel="noopener noreferrer">
                      {record.github}
                    </a>
                  </td>
                  <td>{record.tanggalMasuk}</td> {/* Menampilkan Tanggal Masuk */}
                  <td>{record.tanggalKeluar}</td> {/* Menampilkan Tanggal Keluar */}
                  <td>{record.penempatan}</td> {/* Menampilkan Penempatan */}
                  <td>
                    <button onClick={() => handleDelete(record.id)}>Delete</button> {/* Tombol delete */}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="11">No records available</td> {/* Perbarui colspan sesuai kolom */}
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Record;
