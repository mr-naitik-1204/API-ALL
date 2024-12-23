const express = require('express');
const BB = require('../controller/busC'); 
const { tokensecure } = require('../middlewhere/Auth'); 
const router = express.Router();


router.post('/api/buses', tokensecure, BB.createBus);
router.get('/api/busesget', BB.getAllBuses);
router.get('/api/buses/:id', BB.getBusById);
router.put('/api/buses/:id', tokensecure, BB.updateBus);
router.delete('/api/buses/:id', tokensecure, BB.deleteBus);

module.exports = router;
