// Sidebar.js
import React from 'react';
import { Link } from 'react-router-dom';
import './Sidebar.css'; // CSS untuk styling sidebar

const Sidebar = () => {
  return (
    <div className="sidebar">
      <h1>Magang Kita</h1>
      <ul>
        <li><Link to="/dashboard">Home</Link></li>
        <li><Link to="/record">Record</Link></li>
        <li><Link to="/">Logout</Link></li>
      </ul>
    </div>
  );
};

export default Sidebar;
