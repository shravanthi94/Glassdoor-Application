const express = require('express');

const router = express.Router();
const { checkAuth } = require('../../middleware/studentAuth');

const Student = require('../../models/StudentModel');

const kafka = require('../../kafka/client');
const redisRead = require('../../config/RedisRead');
const redis = require("redis");
const redisPort = process.env.PORT || 6379;
const redisClient = redis.createClient(redisPort);

router.post('/', checkAuth, async (req, res) => {
  // const studentEmail = req.user.email;
  // const { ethnicity, gender, disability, veteran } = req.body;

  // try {
  //   const student = await Student.findOne({ email: studentEmail });
  //   student.demographics.ethnicity = ethnicity;
  //   student.demographics.gender = gender;
  //   student.demographics.disability = disability;
  //   student.demographics.veteran = veteran;

  //   await student.save();

  //   res.status(200).json(student);
  // } catch (err) {
  //   console.log(err);
  //   res.status(500).send('Server Error');
  // }

  try {
    var studentProfileRedis = 'studentProfile' + req.user.id;
    console.log('studentProfile :', studentProfileRedis)
    redisRead.get(studentProfileRedis, async (err, studentProfile) => {
      if(studentProfile !== null) {
        console.log("deleting studentProfile from inside redis");
        redisClient.del(studentProfileRedis, function (err, reply) {
          console.log("Redis Delete of studentProfile", reply);
        });
      } 
    });
  const payload = {
    topic: 'updateStudentDemographics',
    body: req.body,
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
      res.status(200).json(results.message);
    }
  });
} catch (err) {
  console.error(err.message);
  res.status(500).send('Redis Server Error');
}
},
);

module.exports = router;
