import React, { useEffect, useState } from 'react';
import API from '../services/api';
import { getUser } from '../utils/auth';

const UserDashboard = () => {
  const [stores, setStores] = useState([]);
  const user = getUser();

  useEffect(() => {
    API.get('/stores').then((res) => setStores(res.data));
  }, []);

  return (
    <div>
      <h2>Welcome, {user.name}</h2>
      <h3>Browse Stores</h3>
      {stores.map(store => (
        <div key={store.id} style={{ border: '1px solid #ccc', margin: '1rem', padding: '1rem' }}>
          <p><strong>{store.name}</strong></p>
          <p>{store.address}</p>
          <p>Average Rating: {parseFloat(store.avg_rating || 0).toFixed(2)}</p>
          <a href={`/store/${store.id}`}>Rate this store</a>
        </div>
      ))}
    </div>
  );
};

export default UserDashboard;
