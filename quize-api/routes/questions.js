var express = require('express');
var router = express.Router();
var hc = require('../controllar/questions')
const mid= require('../middleware/Authorization')
/* GET users listing. */
router.post('/create', hc.addquestion);
router.get('/show', hc.showdata,mid.tokensecure);
router.delete('/delete/:id', hc.deletedata1);

module.exports = router;
