const express = require('express');

const router = express.Router();
const { checkAuth } = require('../../middleware/studentAuth');

const Student = require('../../models/StudentModel');
const Company = require('../../models/CompanyModel');
const Jobposting = require('../../models/JobPostingModel');

router.post('/', checkAuth, async (req, res) => {
  console.log('here: ', req.user);

  const { name, email } = req.user;
  student = new Student({
    name,
    email,
  });

  await student.save();

  res.status(200).json(student);
});

router.get('/', checkAuth, async (req, res) => {
  try {
    const student = await Student.find({ email: req.user.email });
    res.status(200).json(student);
  } catch (err) {
    console.log(err);
    res.status(500).send('Server Error');
  }
});

router.get('/search/:data/:query', async (req, res) => {
  const searchData = req.params.data;
  const query = req.params.query;
  try {
    let results = [];
    if (query === 'JOBS') {
      results = await Jobposting.find({
        title: { $regex: `.*${searchData}.*` },
      }).populate('company');
    } else {
      results = await Company.find({
        name: { $regex: `.*${searchData}.*` },
      }).populate({
        path: 'company',
        select: 'name',
        model: Jobposting,
      });
    }

    if (results.length === 0) {
      return res.status(400).json({ errors: [{ msg: 'No results found.' }] });
    }

    res.status(200).json(results);
  } catch (err) {
    console.log(err);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
