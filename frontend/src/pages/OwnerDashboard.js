import React, { useEffect, useState } from 'react';
import API from '../services/api';
import { getUser } from '../utils/auth';

const OwnerDashboard = () => {
  const [stores, setStores] = useState([]);
  const [ratings, setRatings] = useState({});
  const user = getUser();

  useEffect(() => {
    const fetchData = async () => {
      const storeRes = await API.get('/stores/owner');
      setStores(storeRes.data);

      const ratingsData = {};
      for (const store of storeRes.data) {
        const ratingRes = await API.get(`/ratings/store/${store.id}`);
        ratingsData[store.id] = ratingRes.data;
      }
      setRatings(ratingsData);
    };
    fetchData();
  }, []);

  return (
    <div>
      <h2>Store Owner Dashboard</h2>
      {stores.map(store => (
        <div key={store.id} style={{ border: '1px solid gray', margin: '1rem', padding: '1rem' }}>
          <h3>{store.name}</h3>
          <p>{store.address}</p>
          <p>Average Rating: {
            ratings[store.id]?.length
              ? (ratings[store.id].reduce((a, b) => a + b.rating, 0) / ratings[store.id].length).toFixed(2)
              : 'No ratings yet'
          }</p>
          <ul>
            {ratings[store.id]?.map((r, i) => (
              <li key={i}>User ID {r.user_id}: {r.rating}/5</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default OwnerDashboard;
