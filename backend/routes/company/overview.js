/* eslint-disable max-len */
// kafka - completed and working
const express = require('express');

const router = express.Router();
const Company = require('../../models/CompanyModel');
const Review = require('../../models/ReviewModel');
const { companyAuth, companyCheckAuth } = require('../../middleware/companyAuth');
const kafka = require('../../kafka/client');

companyAuth();
// companyCheckAuth

// @route  GET /company/overview
// @Desc   Get the overview of company
// @access Private

router.get('/:id', companyCheckAuth, async(req, res) => {
    // try {
    //     console.log("company id: ", req.params.id);
    //     const overview = await Company.findById(req.params.id);

    //     if (!overview) {
    //         return res.status(400).json({ msg: 'No company profile found!' });
    //     } else{

    //         var d = new Date();
    //         var mm = d.getMonth() + 1;
    //         var dd = d.getDate();
    //         var yy = d.getFullYear();
    //         var myDateString = yy + '-' + mm + '-' + dd;
    //         const view = {
    //             date: myDateString,
    //             count: 1,
    //         }

    //         if(overview.views && overview.views.length>0) {
    //             var flag = false;
    //             for(var i = 0; i < overview.views.length; i++ ) {
    //                 if(overview.views[i].date === myDateString) {
    //                     overview.views[i].count = overview.views[i].count + 1;
    //                     flag =true;
    //                 }
    //             }
    //             if (!flag) {
    //                 overview.views.push(view);
    //             }
    //         } else {
    //             overview.views.push(view);
    //         }
    //         overview.save();

    //         // const reviews = await Review.find({ "company": req.params.id, featured: true });

    //         const company= {
    //             overview: overview,
    //             // reviews: reviews
    //         }

    //         console.log("company overview-review: ", company);
    //         res.status(200).json(company);
    //     }

    // } catch (err) {
    //     console.error(err.message);
    //     res.status(500).send('Server Error: Database');
    // }

    const payload = {
        topic: 'getCompanyById',
        params: req.params
    };
    kafka.make_request('overviewCompanyStudent', payload, (err, results) => {
        console.log('in result');
        if (err) {
            console.log('Inside err', err);
            res.status(500).send('System Error, Try Again.');
        } else {
            if (results.status === 400) {
                console.log('Inside err2', results);
                return res.status(400).json({ msg: results.message });
            }
            if (results.status === 500) {
                console.log('Inside err3', results);
                return res.status(500).send('Server Error');
            }
            console.log('in result1234', results);
            res.status(200).json(results.message);
        }
    });
});

module.exports = router;