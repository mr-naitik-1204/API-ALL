const express = require('express');
const router = express.Router();
var multer = require('multer')
const PI = require('../controller/productcontroller');

const AM = require('../middelware/Authchek')

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/images')
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, file.fieldname + '-' + uniqueSuffix + '-' + file.originalname)
  }
})


const upload = multer({ storage: storage })
router.post('/procduct', upload.single('image'), AM.tokenSecure, PI.procduct);
router.get('/show', AM.tokenSecure, PI.show);
router.delete('/delete/:id',AM.tokenSecure,PI.delete);
router.patch('/update/:id', upload.single('image') , AM.tokenSecure,PI.update)

module.exports = router;
