/* eslint-disable max-len */
const Company = require('../../models/CompanyModel');

function handle_request(msg, callback) {
    if (msg.path === 'company_new_photos') {
        companyNewPhotos(msg, callback);
    } else if (msg.path === 'approve_photo') {
        approvePhoto(msg, callback);
    }
}

async function companyNewPhotos(msg, callback) {
    var res = {};
    try {
        console.log('Entered company_new_photos. Message', msg);
        const photos = await Company.//find({"photos.status":'new'}).select("_id name photos");

        aggregate([
            { "$match": {  "photos.status": { $eq: 'new' } }
            },
            { "$project": {
                    "name": 1,
                    "photos": {
                        "$map": {
                            "input": {
                                "$filter": {
                                    "input": "$photos",
                                    "as": "photo",
                                    "cond": { "$eq": ["$$photo.status", "new"] }
                                }
                            },
                            "as": "item",
                            "in": "$$item"
                        }
                    }
                },
            },
        ]).exec((err, photosForApproval) => {
            console.log("photosForApproval list fetched : ", photosForApproval);
            if (err) {
                console.error(err.message);
                res.status = 500;
                res.message = 'Server Error: Database';
                callback(null, res);
            } else if (!photosForApproval || photosForApproval.length === 0 ) {
                res.status = 404;
                res.message = JSON.stringify({ msg: 'No photos for approval!' });
                callback(null, res);
            } else if (photosForApproval) {
                res.status = 200;
                res.message = JSON.stringify(photosForApproval);
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

async function approvePhoto(msg, callback) {
    var res = {};
    try {
        console.log('Entered approve_hoto. Message', msg);
        let company = await Company.findOne({ "_id": req.params.company_id })
        if (company) {
            console.log("Found the company. Updating the approvalStatus");
            company.photos.map((photo) => {
                console.log('photo.id : ', photo._id+"", ' req.params.photo_id : ', req.params.photo_id)
                console.log('equality : ', photo._id+"" === req.params.photo_id)
                if(photo._id+"" === req.params.photo_id) {
                    photo.status = req.body.status;
                    console.log("photo.status : ", photo.status);
                }
            });
            company.save();
            res.status = 200;
            res.message = JSON.stringify({company});
            callback(null, res);
        } else {
            res.status = 400;
            res.message = JSON.stringify({ msg: 'No Photo found' });
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