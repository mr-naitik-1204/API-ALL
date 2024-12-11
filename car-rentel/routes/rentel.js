const express = require('express');
const router = express.Router();
const RT = require('../controller/rentelC');
const AU = require("../midlewhere/Auth")

router.post('/rentals/createRental',AU.tokensecure, RT.createRental);

module.exports = router;
