const ratingModel = require('../models/ratingModel');

exports.submitOrUpdateRating = async (req, res) => {
  const { store_id, rating } = req.body;
  const user_id = req.user.id;

  try {
    await ratingModel.submitRating(user_id, store_id, rating);
    res.json({ message: 'Rating submitted/updated successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to submit rating', error: err.message });
  }
};

exports.getRatingsByStore = async (req, res) => {
  try {
    const ratings = await ratingModel.getRatingsByStore(req.params.id);
    res.json(ratings);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching store ratings', error: err.message });
  }
};

exports.getRatingsByUser = async (req, res) => {
  try {
    const ratings = await ratingModel.getRatingsByUser(req.params.id);
    res.json(ratings);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching user ratings', error: err.message });
  }
};
