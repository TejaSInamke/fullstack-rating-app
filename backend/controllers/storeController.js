const storeModel = require('../models/storeModel');
const ratingModel = require('../models/ratingModel');

exports.addStore = async (req, res) => {
  const { name, address, owner_id } = req.body;

  try {
    await storeModel.createStore(name, address, owner_id);
    res.status(201).json({ message: 'Store created successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Store creation failed', error: err.message });
  }
};

exports.getAllStores = async (req, res) => {
  try {
    const stores = await storeModel.getAllStores();
    const withRatings = await Promise.all(
      stores.map(async (store) => ({
        ...store,
        avg_rating: await ratingModel.getAverageRating(store.id) || 0
      }))
    );
    res.json(withRatings);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching stores', error: err.message });
  }
};

exports.getStoresByOwner = async (req, res) => {
  try {
    const stores = await storeModel.getStoresByOwner(req.user.id);
    res.json(stores);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching owner stores', error: err.message });
  }
};
