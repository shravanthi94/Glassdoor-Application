const express = require('express');

const router = express.Router();
const { checkAuth } = require('../../middleware/studentAuth');
const { check, validationResult } = require('express-validator');

const Student = require('../../models/StudentModel');
const Company = require('../../models/CompanyModel');
const Job = require('../../models/JobPostingModel');

router.post('/', checkAuth, async (req,res) => {
  console.log('here: ', req.user);
  
  const { name, email } = req.user;
  student = new Student({
        name,
        email,
  });

  await student.save();

  res.status(200).json(student);
});

router.get('/:data', checkAuth, async (req, res) => {
  const searchData = req.params.data;
  const { query } = req.body;
  try {
    let results = [];
    if (query === 'JOB') {
      results = await Job.find({ title: { $regex: `.*${searchData}.*` } });
    } else {
      results = await Company.find({ name: { $regex: `.*${searchData}.*` } });
    }

    if (!results) {
      return res
        .status(400)
        .json({ errors: [{ msg: 'No results found.' }] });
    }

    res.status(200).json(results);
  } catch (err) {
    console.log(err);
    res.status(500).send('Server Error');
  }
});

module.exports = router;