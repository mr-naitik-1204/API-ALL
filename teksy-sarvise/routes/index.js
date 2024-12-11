const express = require('express');
const router = express.Router();
const TC = require('../controller/texi');


router.post('/createTaxi', TC.createTaxi);

router.get('/getTaxis', TC.getTaxis);

router.get('/nearby', TC.getNearbyTaxis);

module.exports = router;

