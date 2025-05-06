import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import API from '../services/api';
import { getUser } from '../utils/auth';

const StoreDetails = () => {
  const { id } = useParams();
  const [store, setStore] = useState(null);
  const [userRating, setUserRating] = useState(0);
  const user = getUser();

  useEffect(() => {
    const fetchStoreAndRating = async () => {
      const storeRes = await API.get(`/stores`);
      const found = storeRes.data.find(s => s.id === parseInt(id));
      setStore(found);

      const ratingRes = await API.get(`/ratings/user/${user.id}`);
      const existing = ratingRes.data.find(r => r.store_id === parseInt(id));
      if (existing) setUserRating(existing.rating);
    };
    fetchStoreAndRating();
  }, [id, user.id]);

  const handleSubmit = async () => {
    try {
      await API.post('/ratings', { store_id: id, rating: userRating });
      alert('Rating submitted');
    } catch (err) {
      alert('Error submitting rating');
    }
  };

  if (!store) return <p>Loading...</p>;

  return (
    <div>
      <h2>{store.name}</h2>
      <p>{store.address}</p>
      <p>Average Rating: {parseFloat(store.avg_rating || 0).toFixed(2)}</p>

      <h3>Your Rating</h3>
      <input
        type="number"
        min="1"
        max="5"
        value={userRating}
        onChange={(e) => setUserRating(Number(e.target.value))}
      />
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
};

export default StoreDetails;
