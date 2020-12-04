const express = require('express');

const router = express.Router();
const { checkAuth } = require('../../middleware/studentAuth');

const Student = require('../../models/StudentModel');
const Company = require('../../models/CompanyModel');
const Jobposting = require('../../models/JobPostingModel');
const Review = require('../../models/ReviewModel');
const redisRead = require('../../config/RedisRead');
const redisWrite = require('../../config/RedisWrite');
const kafka = require('../../kafka/client');

router.get('/', checkAuth, async (req, res) => {
  // try {
  //   const student = await Student.findOne({ email: req.user.email });
  //   res.status(200).json(student);
  // } catch (err) {
  //   console.log(err);
  //   res.status(500).send('Server Error');
  // }

  try {
    var studentProfile = 'studentProfile' + req.user.id;
    console.log('studentProfile :', studentProfile)
    redisRead.get(studentProfile, async (err, studentProfile) => {
      if(studentProfile !== null) {
        console.log("fetching studentProfile from inside redis")
        return res.status(200).json(JSON.parse(studentProfile));
      } else {
        console.log("fetching studentProfile from kafka call");

  const payload = {
    topic: 'currentStudent',
    user: req.user,
  };
  kafka.make_request('studentProfile', payload, (err, results) => {
    console.log('in result');
    if (err) {
      console.log('Inside err');
      res.status(500).send('System Error, Try Again.');
    } else {
      if (results.status === 400) {
        return res.status(400).json({ errors: [{ msg: results.message }] });
      }
      if (results.status === 500) {
        return res.status(500).send('Server Error');
      }
      if(results.status) {
        var studentProfile = 'studentProfile' + req.user.id;
        redisWrite.setex(studentProfile, 36000, JSON.stringify(results.message));
        console.log("writing studentProfile to redis finished", JSON.stringify(results.message))
      }
      res.status(200).json(results.message);
    }
  });
}
});
} catch (err) {
console.error(err.message);
res.status(500).send('Server Error');
}
});

router.get('/search/:data/:query', async (req, res) => {
  // const searchData = req.params.data;
  // const query = req.params.query;
  // try {
  //   let results = [];
  //   // let interviewCount, salaryCount;
  //   if (query === 'JOBS') {
  //     results = await Jobposting.find({
  //       title: { $regex: new RegExp('^' + searchData.toLowerCase(), 'i') },
  //     }).populate('company');
  //   } else {
  //     results = await Company.find({
  //       name: { $regex: new RegExp('^' + searchData.toLowerCase(), 'i') },
  //     });
  //   }

  //   if (results.length === 0) {
  //     return res.status(400).json({ errors: [{ msg: 'No results found.' }] });
  //   }

  //   res.status(200).json(results);
  // } catch (err) {
  //   console.log(err);
  //   res.status(500).send('Server Error');
  // }

  const payload = {
    topic: 'studentSearchResults',
    user: req.user,
    params: req.params,
  };
  kafka.make_request('studentProfile', payload, (err, results) => {
    console.log('in result');
    if (err) {
      console.log('Inside err');
      res.status(500).send('System Error, Try Again.');
    } else {
      if (results.status === 400) {
        return res.status(400).json({ errors: [{ msg: results.message }] });
      }
      if (results.status === 500) {
        return res.status(500).send('Server Error');
      }
      res.status(200).json(results.message);
    }
  });
});

module.exports = router;
