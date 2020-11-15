const express = require('express');

const router = express.Router();
const { checkAuth } = require('../../middleware/studentAuth');

const Company = require('../../models/StudentModel');
const Job = require('../../models/StudentModel');

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