const db = require('../config/db');

exports.createStore = async (name, address, owner_id) => {
  const [result] = await db.execute(
    'INSERT INTO stores (name, address, owner_id) VALUES (?, ?, ?)',
    [name, address, owner_id]
  );
  return result;
};

exports.getAllStores = async () => {
  const [rows] = await db.execute('SELECT * FROM stores');
  return rows;
};

exports.getStoreById = async (id) => {
  const [rows] = await db.execute('SELECT * FROM stores WHERE id = ?', [id]);
  return rows[0];
};

exports.getStoresByOwner = async (ownerId) => {
  const [rows] = await db.execute('SELECT * FROM stores WHERE owner_id = ?', [ownerId]);
  return rows;
};
