/* eslint-disable max-len */
const express = require('express');

const router = express.Router();
const Company = require('../../models/CompanyModel');
const Review = require('../../models/ReviewModel');
const { companyAuth, companyCheckAuth } = require('../../middleware/companyAuth');

// companyAuth();
// companyCheckAuth

// @route  GET /company/overview
// @Desc   Get the overview of company
// @access Private

router.get('/:id', async (req, res) => {
    try {
        console.log("company id: ", req.params.id);
        const overview = await Company.findById(req.params.id);

        if (!overview) {
            return res.status(400).json({ msg: 'No company profile found!' });
        }else{

            const reviews = await Review.find({ "company": req.params.id, featured: "yes" });

            const company= {
                overview: overview,
                reviews: reviews
            }

            console.log("company overview-review: ", company);
            res.status(200).json(company);
        }
        
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error: Database');
    }
});

module.exports = router;