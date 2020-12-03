const Company = require('../../models/CompanyModel');
const JobPostings = require('../../models/JobPostingModel');
const Reviews = require('../../models/ReviewModel');

function handle_request(msg, callback) {
    if (msg.path === 'all_companies_get') {
        allCompaniesGet(msg, callback);
    } else if (msg.path === 'company_reviews_get') {
        companyReviewsGet(msg, callback);
    } else if (msg.path === 'hired_applicants') {
        hiredApplicants(msg, callback);
    } else if (msg.path === 'applicant_demographics') {
        applicantDemographics(msg, callback);
    } 
}

async function allCompaniesGet(msg, callback) {
    var res = {};
    try {
        console.log('Entered all_companies_get. Message', msg);
        const companies = await Company.find().select("overAllRating name _id email location ceoName website type industry headquarters size founded revenue logo");
        if (!companies || companies.length === 0 ) {
            res.status = 404;
            res.message = JSON.stringify({ msg: 'No Companies have registered!' });
            callback(null, res);
        } else if( companies ) {
            res.status = 200;
            res.message = JSON.stringify(companies);
            callback(null, res);
        }
    } catch (err) {
        console.error(err.message);
        res.status = 500;
        res.message = 'Server Error: Database';
        callback(null, res);
    }
}

async function companyReviewsGet(msg, callback) {
    var res = {};
    try {
        console.log('Entered company_reviews_get. Message', msg);
        const reviews = await Reviews.find({company: msg.company_id, approvalStatus:{ $ne: 'new' }});
        console.log("reviews list fetched", reviews);
        if (!reviews || reviews.length === 0 ) {
            res.status = 404;
            res.message = JSON.stringify({ msg: 'No Reviews for the company!' });
            callback(null, res);
        } else if( reviews ) {
            res.status = 200;
            res.message = JSON.stringify(reviews);
            callback(null, res);
        }
    } catch (err) {
        console.error(err.message);
        res.status = 500;
        res.message = JSON.stringify('Server Error: Database');
        callback(null, res);
    }
}

// @route  GET /admin/companies/*/hired-applicants
// @Desc   Get number of hired applicants for a company
// @access Private

async function hiredApplicants(msg, callback) {
    var res = {};
    try {
        console.log('Entered hired_applicants. Message', msg);
        JobPostings.aggregate([
            { "$match": { 
                $and: [
                    {'company': mongoose.Types.ObjectId(msg.company_id)}, 
                    { "applicants.applicantStatus": { $eq: 'hired' } }
                ]} 
            },
            { "$project": {
                    "name": 1,
                    "title": 1,
                    "applicants": {
                        "$map": {
                            "input": {
                                "$filter": {
                                    "input": "$applicants",
                                    "as": "applicant",
                                    "cond": { "$eq": ["$$applicant.applicantStatus", "hired"] }
                                }
                            },
                            "as": "item",
                            "in": "$$item"
                        }
                    }
                } 
            },
        ]).exec((err, jobPostings) => {
            console.log("jobPostings list fetched");
            if (err) {
                console.error(err.message);
                res.status = 500;
                res.message = JSON.stringify('Server Error: Database');
                callback(null, res);
            } else if (jobPostings && jobPostings.length>0 ){
                jobPostings.map(jobPosting =>  {
                    jobPosting.count = jobPosting.applicants.length;
                    delete jobPosting.applicants;
                });
                res.status = 200;
                res.message = JSON.stringify({jobPostings});
                callback(null, res);
            } else {
                res.status = 404;
                res.message = JSON.stringify({msg:'No hires for the company!'});
                callback(null, res);
            }
        });
    } catch (err) {
        console.error(err.message);
        res.status = 404;
        res.message = 'Server Error: Database';
        callback(null, res);
    }
}

async function applicantDemographics(msg, callback) {
    var res = {};
    try {
        console.log('Entered applicant_demographics. Message', msg);
        var query = JobPostings.find({company: msg.company_id}).select('applicants name title');
        query.populate({ path: 'applicants.student', select: 'demographics' });
        query.exec((err, jobPostings) => {
            console.log("jobPostings list fetched");
            if (err) {
                console.error(err.message);
                res.status = 404;
                res.message = 'Server Error: Database';
                callback(null, res);
            } else if (jobPostings && jobPostings.length>0 ){
                jobDemographics = [];
                for ( var i = 0; i < jobPostings.length; i++ ) {
                    if ( jobPostings[i].applicants && jobPostings[i].applicants.length > 0 ) {
                        var asianCount = 0, nativeCount = 0, blackCount = 0, whiteCount = 0, islanderCount =0;
                        var maleCount = 0, femaleCount = 0;
                        var disabilityYes = 0, disabilityNo = 0;
                        var veteranYes = 0, veteranNo = 0;
                        for ( var j=0; j < jobPostings[i].applicants.length; j++ ) {
                            if ( jobPostings[i].applicants[j].student && jobPostings[i].applicants[j].student.demographics ) {

                                console.log('veteran: ', jobPostings[i].applicants[j].student.demographics.veteran)
                                console.log('disability: ', jobPostings[i].applicants[j].student.demographics.disability)

                                if ( jobPostings[i].applicants[j].student.demographics.veteran === 'Yes' ) {
                                    veteranYes = veteranYes+1;
                                } else if ( jobPostings[i].applicants[j].student.demographics.veteran === 'No' ) {
                                    veteranNo = veteranNo+1;
                                }

                                if ( jobPostings[i].applicants[j].student.demographics.disability === 'Yes' ) {
                                    disabilityYes = disabilityYes+1;
                                } else if (jobPostings[i].applicants[j].student.demographics.disability === 'No') {
                                    disabilityNo = disabilityNo+1;
                                }

                                if ( jobPostings[i].applicants[j].student.demographics.gender === 'Female' ) {
                                    femaleCount = femaleCount+1;
                                } else if (jobPostings[i].applicants[j].student.demographics.gender === 'Male' ) {
                                    maleCount = maleCount+1;
                                }

                                if ( jobPostings[i].applicants[j].student.demographics.ethnicity === 'American Indian or Alaska Native' ) {
                                    nativeCount = nativeCount+1;
                                } else if (jobPostings[i].applicants[j].student.demographics.ethnicity === 'Asian' ) {
                                    asianCount = asianCount+1;
                                } else if (jobPostings[i].applicants[j].student.demographics.ethnicity === 'Black or African American' ) {
                                    blackCount = blackCount+1;
                                } else if (jobPostings[i].applicants[j].student.demographics.ethnicity === 'Native Hawaiian or Other Pacific Islander' ) {
                                    islanderCount = islanderCount+1;
                                } else if (jobPostings[i].applicants[j].student.demographics.ethnicity === 'White' ) {
                                    whiteCount = whiteCount+1;
                                }
                            }
                        }
                        jobDemographics.push(
                            {
                                jobId: jobPostings[i]._id,
                                name: jobPostings[i].name,
                                title: jobPostings[i].title,
                                whiteCount : whiteCount, 
                                islanderCount : islanderCount, 
                                blackCount : blackCount, 
                                asianCount : asianCount,
                                nativeCount : nativeCount,
                                femaleCount : femaleCount,
                                maleCount : maleCount,
                                disabilityNo : disabilityNo,
                                disabilityYes : disabilityYes,
                                veteranNo : veteranNo,
                                veteranYes : veteranYes
                            }
                        )
                    } 
                }
                res.status = 200;
                res.message = JSON.stringify({ 
                    jobDemographics: jobDemographics,
                    company : msg.company_id
                });
                callback(null, res);
            } else {
                res.status = 404;
                res.message = JSON.stringify({msg:'No applicants for the jobs posted by the company!'});
                callback(null, res);
            }
        });
    } catch (err) {
        res.status = 404;
        res.message = 'Server Error: Database';
        callback(null, res);
    }
}

exports.handle_request = handle_request;