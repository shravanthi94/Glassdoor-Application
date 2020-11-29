// /* eslint-disable max-len */
// const express = require('express');

// const router = express.Router();
// const path = require('path');
// const multer = require('multer');
// const { ObjectId } = require('mongodb');
// const auth = require('../../../middleware/auth');

// const userstorage = multer.diskStorage({
//     destination: `${path.join(__dirname, '../../../')}/frontend/src/components/images`,
//     filename: (req, file, cb) => {
//         cb(
//             null, `${req.body.company.toLowerCase()}_banner${path.extname(file.originalname)}`,
//         );
//     },
// });

// const useruploads = multer({
//     storage: userstorage,
//     limits: { fileSize: 1000000000 },
// }).single('image');

// router.post('/company/profilepic/:id', auth, async(req, res) => {
//     // console.log("inside image upload, email id is", req.customer.id);
//     // console.log ("inside image upload, req is ", req);
//     // console.log("inside image upload, image is,", req.get("image"));
//     // console.log("inside image upload, Cust_Email,", req);
//     // console.log("inside image upload, file,", file);
//     // console.log("inside image upload, req is,", req.customer);
//     // console.log("inside image upload, res is ", res);
//     console.log('inside image upload, id is,', req.params.id);

//     // const Email = req.Email

//     // console.log ("inside image upload, query result is,",JSON.stringify(restuser))
//     // console.log('outside req email is ', req.body.Email);
//     // let restuser = RestUser.findOneAndUpdate({restEmail:req.body.Email},{image:"rest_" +req.restuser.id.replace("@", "_") +  path.extname(req.file.filename)},{new:true})
//     // console.log ("outside query result is",restuser.restEmail)
//     const restuser = null;
//     await useruploads(req, res, async(err) => {
//         console.log('this is useruploads');
//         if (!err) {
//             try {
//                 const objId = new ObjectId(req.params.id);
//                 await console.log('inside useruploads, req.file.filename is ', req.file.filename);
//                 await console.log('inside useruploads, req.params.company is', req.body.company);
//                 const company = await Company.findOneAndUpdate({ _id: objId }, { profilePic: req.body.company.toLowerCase() }, { new: true });
//                 console.log('query result is', company.profilePic);
//                 // console.log ("rest user,",restuser._id)
//                 // console.log ("query result is",RestUser.find({restEmail:req.body.Email}))
//                 if (!company) {
//                     return res.status(400).json({ msg: 'company profile not found' });
//                 }
//                 // restuser.save ()
//                 res.json(company);
//             } catch (error) {
//                 console.log('caught error', error);
//                 res.status(500).send('Try block Server Error');
//             }
//         } else {
//             console.log('hit an error', err);
//             res.status(500).send('Server Error');
//         }
//     });
// });

// module.exports = router;