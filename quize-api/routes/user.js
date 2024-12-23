// user router

var express = require('express');
var hc=require('../controllar/user')
const router = express.Router();



/* GET home page. */
router.post('/Signup',hc.Signup );
router.post('/Login',hc.Login );
router.delete('/deletedata/:id',hc.deletedata );

module.exports = router;
