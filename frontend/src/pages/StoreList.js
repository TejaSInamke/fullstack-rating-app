import React, { useEffect, useState } from 'react';
import API from '../services/api';
import { Link } from 'react-router-dom';

const StoreList = () => {
  const [stores, setStores] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    API.get('/stores').then(res => setStores(res.data));
  }, []);

  const filteredStores = stores.filter(store =>
    store.name.toLowerCase().includes(search.toLowerCase()) ||
    store.address.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <h2>All Stores</h2>
      <input
        type="text"
        placeholder="Search by name or address"
        value={search}
        onChange={e => setSearch(e.target.value)}
      />
      {filteredStores.map(store => (
        <div key={store.id} style={{ border: '1px solid #ddd', margin: '1rem', padding: '1rem' }}>
          <h4>{store.name}</h4>
          <p>{store.address}</p>
          <p>Average Rating: {parseFloat(store.avg_rating || 0).toFixed(2)}</p>
          <Link to={`/store/${store.id}`}>View & Rate</Link>
        </div>
      ))}
    </div>
  );
};

export default StoreList;
