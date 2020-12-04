/* eslint-disable max-len */
const express = require('express');

const router = express.Router();
const Company = require('../../models/CompanyModel');
const { companyAuth, companyCheckAuth } = require('../../middleware/companyAuth');
const kafka = require('../../kafka/client');
companyAuth();
// companyCheckAuth

// @route  POST /company/salary
// @Desc   Add new salary detail for a position at the company
// @access Private

router.post('/', companyCheckAuth, async(req, res) => {
    // try {
    //     console.log("salary details: ", req.body);

    //     var totalPay = parseInt(req.body.baseSalary) + parseInt(req.body.bonuses);
    //     var data =  { 
    //         avgTotalPay: totalPay,
    //         baseSalary: req.body.baseSalary,
    //         bonuses: req.body.bonuses,
    //         jobTitle: req.body.jobTitle,
    //         yearsOfExperience: req.body.yearsOfExp,
    //         location: req.body.location,
    //         salaryGender: req.body.gender,
    //         student: req.body.student
    //      };

    //     const company = await Company.findByIdAndUpdate({_id: req.body.company}, {$push:{ salary: data }, $inc:{numberOfSalaries : 1}}, {new: true});

    //     if(!company){
    //         res.status(400).send("Couldn't add salary details. Try after sometime");  
    //     }else{
    //         console.log("After salary add - company: ", company);
    //         res.status(200).send(company);  
    //     }

    // } catch (err) {
    //     console.error(err.message);
    //     res.status(500).send('Server Error: Database');
    // }
    const payload = {
        topic: 'addSalary',
        body: req.body,
    };
    console.log("Add Salary,", payload)
    kafka.make_request('salaryStudent', payload, (err, results) => {
        console.log('in result');
        if (err) {
            console.log('Inside err');
            res.status(500).send('System Error, Try Again.');
        } else {
            if (results.status === 400) {
                return res.status(400).json({ msg: results.message });
            }
            if (results.status === 500) {
                return res.status(500).send('Server Error');
            }
            res.status(200).json(results.message);
        }
    });

});

module.exports = router;