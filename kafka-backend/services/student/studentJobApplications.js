const JobPostings = require('../../models/JobPostingModel');
const mongoose = require('mongoose');

function handle_request(msg, callback) {
    if (msg.path === 'my_applications') {
        myJobApplications(msg, callback);
    } else if (msg.path === 'withdraw_application') {
        withdrawApplication(msg, callback);
    } 
}

async function myJobApplications(msg, callback) {
    var res = {};
    try {
        JobPostings.aggregate([
            { "$match":  
                    { "applicants.student": mongoose.Types.ObjectId(msg.student_id)}
                
            },
            { "$project": {
                    "name": 1,
                    "title": 1,
                    "applications": {
                        "$map": {
                            "input": {
                                "$filter": {
                                    "input": "$applicants",
                                    "as": "applicant",
                                    "cond": { "$eq": ["$$applicant.student", mongoose.Types.ObjectId(msg.student_id)] }
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
                res.message = 'Server Error: Database';
                callback(null, res);
            } else if (jobPostings && jobPostings.length>0 ) {
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
        res.status = 500;
        res.message = 'Server Error: Database';
        callback(null, res);
    }
}

async function withdrawApplication(msg, callback) {
    var res = {};
    try {
        console.log('Job application for withdraw : ', msg.application_id)
        let job = await JobPostings.findOne({ "_id": msg.job_id })
        if (job) {
            console.log("Found the job. Updating the status");
            job.applicants.map((applicant) => {
                if(applicant._id+"" === msg.application_id) {
                    applicant.applicantStatus = 'withdraw';
                }
            });
            job.save();
            res.status = 200;
            res.message = JSON.stringify({msg:"Application withdraw successful!"});
            callback(null, res);

        } else {
            res.status = 400;
            res.message = JSON.stringify({ msg: 'No Job found' });
            callback(null, res);
        }
    } catch (err) {
        console.error(err.message);
        res.status = 500;
        res.message = 'Server Error: Database';
        callback(null, res);
    }
}

exports.handle_request = handle_request;