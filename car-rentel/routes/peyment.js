const express = require('express');
const router = express.Router();
const PM = require('../controller/paymentC');

router.post('/processPayment', PM.processPayment);

module.exports = router;
