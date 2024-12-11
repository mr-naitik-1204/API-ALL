const express = require('express');
const router = express.Router();
const BC = require('../controller/Booking');

// Book a taxi
router.post('/bookTaxi', BC.bookTaxi);

module.exports = router;
