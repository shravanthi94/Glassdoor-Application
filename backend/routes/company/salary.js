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

        var totalPay = parseInt(req.body.baseSalary) + parseInt(req.body.bonuses);
        var data =  { 
            avgTotalPay: totalPay,
            baseSalary: req.body.baseSalary,
            bonuses: req.body.bonuses,
            jobTitle: req.body.jobTitle,
            yearsOfExperience: req.body.yearsOfExp,
            location: req.body.location,
            salaryGender: req.body.gender,
            student: req.body.student
         };

        const company = await Company.findByIdAndUpdate({_id: req.body.company}, {$push:{ salary: data }, $inc:{numberOfSalaries : 1}}, {new: true});
        
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