const express = require('express');
const router = express.Router();
const CR = require('../controller/carC');
const AU = require('../midlewhere/Auth')
router.get('/cars/getAllCars', CR.getAllCars);
router.post('/cars/createCar',AU.tokensecure, CR.createCar);

module.exports = router;