/* eslint-disable max-len */

// Is this being used ???

const express = require('express');

const router = express.Router();
const JobPosting = require('../../models/JobPostingModel');
const { companyAuth, companyCheckAuth } = require('../../middleware/companyAuth');
const kafka = require('../../kafka/client');

companyAuth();
// companyCheckAuth

// @route  GET /company/jobs
// @Desc   Get all the salary details of company
// @access Private

router.get('/:id', companyCheckAuth, async(req, res) => {
    // try {
    //     console.log("company id: ", req.params.id);
    //     const jobPosting = await JobPosting.find({ "company": req.params.id });

    //     if (!jobPosting) {
    //         return res.status(400).json({ msg: 'No job posted yet!' });
    //     }else{

    //         console.log("company job postings: ", jobPosting);
    //         res.status(200).json(jobPosting);
    //     }

    // } catch (err) {
    //     console.error(err.message);
    //     res.status(500).send('Server Error: Database');
    // }

    const payload = {
        topic: 'getSalaryByCompanyId',
        params: req.params,
    };
    console.log("get salraries by companyid", payload)
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
                return res.status(500).send('Server Error: Database');
            }
            res.status(200).json(results.message);
        }
    });
});



// @route  POST /company/salary
// @Desc   Add new salary detail for a position at the company
// @access Private

// router.post('/', async (req, res) => {
//     try {
//         console.log("salary details: ", req.body);

//         const salary =  new Salary({ 
//             company: req.body.company,
//             avgTotalPay: req.body.avgTotalPay,
//             baseSalary: req.body.baseSalary,
//             bonuses: req.body.bonuses,
//             jobTitle: req.body.jobTitle,
//             yearsOfExperience: req.body.yearsOfExperience,
//             location: req.body.location,
//             salaryGender: req.body.salaryGender,
//             employerName: req.body.employerName
//          });

//          await salary.save((error, data) => {
//             if (error) {
//                 return res.status(400).json({ msg: "Couldn't add salary, try after sometime!" });
//             }
//             else {
//                 return res.status(200).json({ msg: "Salary detail successfully added" });
//             }
//         });

//     } catch (err) {
//         console.error(err.message);
//         res.status(500).send('Server Error: Database');
//     }
// });

module.exports = router;