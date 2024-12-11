// routes/companyRoutes.js
// 1
const express = require('express');
const CP = require('../controller/compny');
const router = express.Router();

router.post('/companies', CP.createCompany);
router.get('/companies/get', CP.getCompanies);

module.exports = router;
