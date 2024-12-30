var express = require('express');
var router = express.Router();

const JC = require('../controller/Jewellerycontroller')

router.post('/Jewellery' , JC.CreateJewellery)
router.get('/Jewellery' , JC.getJewellery)

module.exports = router;