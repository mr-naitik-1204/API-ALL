const express = require('express');
const router = express.Router();

const OP = require('../controller/ordercontroller');


router.post('/order',OP.order);
router.get('/show', OP.show);
router.delete('/delete/:id',OP.delete);
router.patch('/update/:id',OP.update)

module.exports = router;
