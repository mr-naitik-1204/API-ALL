var express = require('express');
var router = express.Router();

const CC = require('../controller/Customercontroller')

router.post('/customer' , CC.Createcustomer)
router.get('/showcustomer' , CC.customerShowdata)
router.delete('/delete/:id' , CC.Delete)
router.patch('/update/:id' , CC.Update)




module.exports = router;