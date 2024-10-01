import React, { useState } from 'react';
import Sidebar from './Sidebar'; // Import Sidebar component
import './Dashboard.css';

const Dashboard = ({ setRecords }) => {
  const [data, setData] = useState({
    nama: '',
    nim: '',
    universitas: '',
    noHpEmail: '',
    kelompok: '',
    proyek: '',
    github: '',
    tanggalMasuk: '',
    tanggalKeluar: '',
    penempatan: ''
  });

  const [successMessage, setSuccessMessage] = useState(''); // Menyimpan pesan sukses

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Kirim data ke backend
    fetch('http://localhost/archive_mahasiswa/student-api/insertStudent.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data), // Mengirim data dalam format JSON
    })
      .then(response => response.json())
      .then(data => {
        setSuccessMessage(data.message); // Tampilkan pesan dari backend
        setRecords(prevRecords => [...prevRecords, data]); // Update records di parent state
        setData({
          nama: '',
          nim: '',
          universitas: '',
          noHpEmail: '',
          kelompok: '',
          proyek: '',
          github: '',
          tanggalMasuk: '',
          tanggalKeluar: '',
          penempatan: ''
        });
      })
      .catch(error => console.error('Error:', error));
  };

  return (
    <div className="dashboard-container">
      <Sidebar /> {/* Sidebar di sebelah kiri */}

      <div className="dashboard-content">
        <h2>Silahkan Input</h2>
        {successMessage && <p>{successMessage}</p>} {/* Tampilkan pesan sukses */}
      <form onSubmit={handleSubmit} className="form-grid">
      <div className="form-group">
        <input type="text" name="nama" placeholder="Nama" value={data.nama} onChange={handleChange} required />
        <input type="text" name="nim" placeholder="NIM" value={data.nim} onChange={handleChange} required />
        <input type="text" name="universitas" placeholder="Asal Universitas" value={data.universitas} onChange={handleChange} required />
        <input type="text" name="noHpEmail" placeholder="No HP / Email" value={data.noHpEmail} onChange={handleChange} required />
      </div>
      <div className="form-group">
        <input type="text" name="kelompok" placeholder="Nama Kelompok" value={data.kelompok} onChange={handleChange} required />
        <input type="text" name="proyek" placeholder="Nama Proyek" value={data.proyek} onChange={handleChange} required />
        <input type="text" name="github" placeholder="Link GitHub" value={data.github} onChange={handleChange} required />
        <input type="date" name="tanggalMasuk" value={data.tanggalMasuk} onChange={handleChange} required />
        <input type="date" name="tanggalKeluar" value={data.tanggalKeluar} onChange={handleChange} required />
        <input type="text" name="penempatan" placeholder="Penempatan" value={data.penempatan} onChange={handleChange} required />
      </div>
      <button type="submit">Submit</button>
    </form>
      </div>
    </div>
  );
};

export default Dashboard;
