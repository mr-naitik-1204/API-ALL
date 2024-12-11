// controllers/companyController.js

const Company = require('../modal/compny');

// Create a new company
exports.createCompany = async (req, res) => {
    const { name, symbol, industry, sector, marketCap } = req.body;

    try {
        const company = new Company({ name, symbol, industry, sector, marketCap });
        await company.save();
        res.status(201).json({ message: 'Company created successfully!', company });
    } catch (err) {
        res.status(500).json({ message: 'Error creating company.', error: err });
    }
};

// Get all companies
exports.getCompanies = async (req, res) => {
    try {
        const companies = await Company.find();
        res.status(200).json(companies);
    } catch (err) {
        res.status(500).json({ message: 'Error fetching companies.', error: err });
    }
};
