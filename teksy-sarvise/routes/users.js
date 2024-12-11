const express = require('express');
const router = express.Router();
const UC = require('../controller/user');

// Create a user
router.post('/createUser', UC.createUser);

// Get user details
router.get('/getUser/:id', UC.getUser);

// Get user trip history
router.get('/getTripHistory/:id', UC.getTripHistory);

module.exports = router;

