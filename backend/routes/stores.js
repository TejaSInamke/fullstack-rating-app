const express = require('express');
const router = express.Router();
const storeController = require('../controllers/storeController');
const { protect, restrictTo } = require('../middleware/auth');

router.post('/', protect, restrictTo('admin'), storeController.addStore);
router.get('/', protect, storeController.getAllStores);
router.get('/owner', protect, restrictTo('owner'), storeController.getStoresByOwner);

module.exports = router;
