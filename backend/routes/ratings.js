const express = require('express');
const router = express.Router();
const ratingController = require('../controllers/ratingController');
const { protect } = require('../middleware/auth');

router.post('/', protect, ratingController.submitOrUpdateRating);
router.get('/store/:id', protect, ratingController.getRatingsByStore);
router.get('/user/:id', protect, ratingController.getRatingsByUser);

module.exports = router;
