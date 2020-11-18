/* eslint-disable max-len */
const express = require('express');

const router = express.Router();
const Company = require('../../models/CompanyModel');
const { companyAuth, companyCheckAuth } = require('../../middleware/companyAuth');

// companyAuth();
// companyCheckAuth

// @route  POST /company/salary
// @Desc   Add new salary detail for a position at the company
// @access Private

router.post('/', async (req, res) => {
    try {
        console.log("salary details: ", req.body);

        var data =  { 
            avgTotalPay: req.body.avgTotalPay,
            baseSalary: req.body.baseSalary,
            bonuses: req.body.bonuses,
            jobTitle: req.body.jobTitle,
            yearsOfExperience: req.body.yearsOfExperience,
            location: req.body.location,
            salaryGender: req.body.salaryGender,
         };

        const company = await Company.findByIdAndUpdate({_id: req.body.company}, {$push:{ salary: data }}, {new: true});
        
        if(!company){
            res.status(400).send("Couldn't add salary details. Try after sometime");  
        }else{
            console.log("After salary add - company: ", company);
            res.status(200).send(company);  
        }
        
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error: Database');
    }
});

module.exports = router;