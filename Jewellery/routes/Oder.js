var express = require('express');
var router = express.Router();

const OC = require('../controller/Odercontroller')

router.post('/oder' , OC.Createoder)
router.get('/data' , OC.Showdata)
router.delete('/delete/:id' , OC.Delete)
router.patch('/update/:id' , OC.Update)

module.exports = router;