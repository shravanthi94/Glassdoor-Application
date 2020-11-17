/* eslint-disable max-len */
const express = require('express');

const router = express.Router();
const Salary = require('../../models/SalaryModel');
const { companyAuth, companyCheckAuth } = require('../../middleware/companyAuth');

// companyAuth();
// companyCheckAuth

// @route  GET /company/salary
// @Desc   Get all the salary details of company
// @access Private

router.get('/:id', async (req, res) => {
    try {
        console.log("company id: ", req.params.id);
        const salaries = await Salary.find({ "company": req.params.id });

        if (!salaries) {
            return res.status(400).json({ msg: 'No salary detail added yet!' });
        }else{

            console.log("company salaries: ", salaries);
            res.status(200).json(salaries);
        }
        
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error: Database');
    }
});



// @route  POST /company/salary
// @Desc   Add new salary detail for a position at the company
// @access Private

router.post('/', async (req, res) => {
    try {
        console.log("salary details: ", req.body);

        const salary =  new Salary({ 
            company: req.body.company,
            avgTotalPay: req.body.avgTotalPay,
            baseSalary: req.body.baseSalary,
            bonuses: req.body.bonuses,
            jobTitle: req.body.jobTitle,
            yearsOfExperience: req.body.yearsOfExperience,
            location: req.body.location,
            salaryGender: req.body.salaryGender,
            companyName: req.body.companyName
         });

         await salary.save((error, data) => {
            if (error) {
                return res.status(400).json({ msg: "Couldn't add salary, try after sometime!" });
            }
            else {
                return res.status(200).json({ msg: "Salary detail successfully added" });
            }
        });
        
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error: Database');
    }
});

module.exports = router;