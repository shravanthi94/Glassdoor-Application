const express = require('express');

const router = express.Router();
const { validationResult, check } = require('express-validator');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const { checkAuth } = require('../../middleware/studentAuth');

const Student = require('../../models/StudentModel');
const Review = require('../../models/ReviewModel');
const Company = require('../../models/CompanyModel');

// @route  POST /student/profile/basic
// @desc   Update current student basic details
// @access Private
router.post(
  '/basic',
  [checkAuth, [check('name', 'Student name is required').notEmpty()]],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const studentId = req.user.id;
    const { name, email } = req.body;

    try {
      const student = await Student.findById(studentId).select('-password');
      student.name = name;
      student.email = email;

      await student.save();

      res.status(200).json(student);
    } catch (err) {
      console.log(err);
      res.status(500).send('Server Error');
    }
  },
);

const studentstorage = multer.diskStorage({
  destination: `${path.join(__dirname, '../..')}/public/uploads/student`,
  filename: (req, file, cb) => {
    cb(
      null,
      `student${req.user.id}-${Date.now()}${path.extname(file.originalname)}`,
    );
  },
});

const studentuploads = multer({
  storage: studentstorage,
  limits: { fileSize: 100000000 },
}).single('image');

// @route  POST student/profile/image
// @desc   Upload profile picture of the student
// @access Private
router.post('/image', checkAuth, async (req, res) => {
  studentuploads(req, res, async (err) => {
    if (!err) {
      try {
        const student = await Student.findById(req.user.id);
        student.profilePic.image = req.file.filename;
        student.profilePic.status = 'new';

        await student.save();

        res.status(200).json(student);
      } catch (error) {
        console.log(error);
        res.status(500).send('Server Error');
      }
    } else {
      console.log('Error!', err);
    }
  });
});

// @route  GET /student/profile/view/:img
// @desc   View the student profile picture
// @access Public
router.get('/view/:img', (req, res) => {
  const image = `${path.join(__dirname, '../..')}/public/uploads/student/${
    req.params.img
  }`;
  if (fs.existsSync(image)) {
    res.sendFile(image);
  } else {
    res.sendFile(
      `${path.join(
        __dirname,
        '../..',
      )}/public/uploads/students/placeholderimg.jpg`,
    );
  }
});

// @route  GET /student/profile/counts
// @desc   Count of student review and rating
// @access Public
router.get('/counts', checkAuth, async (req, res) => {
  try {
    const reviewCount = await Review.find({
      student: req.user.id,
      comment: { $ne: null },
    }).countDocuments();

    const ratingCount = await Review.find({
      student: req.user.id,
      overAllRating: { $ne: null },
    }).countDocuments();

    const results = {
      reviewCount,
      ratingCount,
    };

    res.status(200).json(results);
  } catch (err) {
    console.log(err);
    res.status(500).send('Server Error');
  }
});

// @route  GET /student/profile/contributions/:query
// @desc   View the student contributions
// @access Private
router.get('/contributions/:query', checkAuth, async (req, res) => {
  const query = req.params.query;
  console.log('Query: ', query);
  try {
    let results = [];
    if (query === 'reviews') {
      results = await Review.find({ student: req.user.id }).populate('company');
    } else if (query === 'interviews') {
      results = await Company.find({ 'interview.student': req.user.id });
    } else if (query === 'salaries') {
      results = await Company.find({ 'salary.student': req.user.id });
    } else if (query === 'photos') {
      results = await Company.find({ 'photos.student': req.user.id });
    }

    if (!results || results.length === 0) {
      console.log('here');
      return res.status(400).json({ errors: [{ msg: 'No results found.' }] });
    }

    res.status(200).json(results);
  } catch (err) {
    console.log(err);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
