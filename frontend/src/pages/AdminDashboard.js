import React, { useEffect, useState } from 'react';
import API from '../services/api';

const AdminDashboard = () => {
  const [stats, setStats] = useState({ users: 0, stores: 0, ratings: 0 });

  useEffect(() => {
    const fetchStats = async () => {
      const [usersRes, storesRes, ratingsRes] = await Promise.all([
        API.get('/users'),
        API.get('/stores'),
        API.get('/ratings/all')
      ]);
      setStats({
        users: usersRes.data.length,
        stores: storesRes.data.length,
        ratings: ratingsRes.data.length
      });
    };
    fetchStats();
  }, []);

  return (
    <div>
      <h2>Admin Dashboard</h2>
      <p>Total Users: {stats.users}</p>
      <p>Total Stores: {stats.stores}</p>
      <p>Total Ratings: {stats.ratings}</p>
      {/* You can add tables with sorting/filtering for users and stores here */}
    </div>
  );
};

export default AdminDashboard;
