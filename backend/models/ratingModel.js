const db = require('../config/db');

exports.submitRating = async (user_id, store_id, rating) => {
  const [existing] = await db.execute(
    'SELECT * FROM ratings WHERE user_id = ? AND store_id = ?',
    [user_id, store_id]
  );

  if (existing.length > 0) {
    await db.execute(
      'UPDATE ratings SET rating = ? WHERE user_id = ? AND store_id = ?',
      [rating, user_id, store_id]
    );
  } else {
    await db.execute(
      'INSERT INTO ratings (user_id, store_id, rating) VALUES (?, ?, ?)',
      [user_id, store_id, rating]
    );
  }
};

exports.getRatingsByStore = async (store_id) => {
  const [rows] = await db.execute('SELECT * FROM ratings WHERE store_id = ?', [store_id]);
  return rows;
};

exports.getRatingsByUser = async (user_id) => {
  const [rows] = await db.execute('SELECT * FROM ratings WHERE user_id = ?', [user_id]);
  return rows;
};

exports.getAverageRating = async (store_id) => {
  const [rows] = await db.execute(
    'SELECT AVG(rating) as avg_rating FROM ratings WHERE store_id = ?',
    [store_id]
  );
  return rows[0].avg_rating;
};
