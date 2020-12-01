const express = require('express');

const router = express.Router();
const { checkAuth } = require('../../middleware/studentAuth');

const Student = require('../../models/StudentModel');
const Company = require('../../models/CompanyModel');
const Jobposting = require('../../models/JobPostingModel');
const Review = require('../../models/ReviewModel');
const e = require('express');

// router.post('/', checkAuth, async (req, res) => {
//   console.log('here: ', req.user);

//   const { name, email } = req.user;
//   student = new Student({
//     name,
//     email,
//   });

//   await student.save();

//   res.status(200).json(student);
// });

router.get('/', checkAuth, async (req, res) => {
  try {
    const student = await Student.findOne({ email: req.user.email });
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
    let interviewCount, salaryCount;
    if (query === 'JOBS') {
      results = await Jobposting.find({
        title: { $regex: new RegExp('^' + searchData.toLowerCase(), 'i') },
      }).populate('company');
    } else {
      results = await Company.find({
        name: { $regex: new RegExp('^' + searchData.toLowerCase(), 'i') },
      });
    }

    if (results.length === 0) {
      return res.status(400).json({ errors: [{ msg: 'No results found.' }] });
    }

    const ids = results.map((each) => {
      if (query === 'JOBS') {
        return each.company._id.toString();
      } else {
        return each._id.toString();
      }
    });

    console.log('id: ', ids);

    const ans = await Review.aggregate([
      {
        $group: {
          _id: '$company',
          company_id: {
            $first: '$company',
          },
          count: { $sum: 1 },
        },
      },
    ]);

    const final = ans.filter((each) =>
      ids.includes(each.company_id.toString()),
    );

    const data = {
      results,
      final,
    };
    // console.log(data);

    res.status(200).json(data);
  } catch (err) {
    console.log(err);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
