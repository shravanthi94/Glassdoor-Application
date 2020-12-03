const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const mysqlConnectionPool = require('../../config/sqlConnectionPool');

// Student Model
const Student = require('../../models/StudentModel');
const Company = require('../../models/CompanyModel');

const response = {};

const handle_request = async (payload, callback) => {
  const { topic } = payload;
  console.log('In topic: ', topic);
  switch (topic) {
    case 'studentSignup':
      return studentSignup(payload, callback);
  }
};

async function studentSignup(msg, callback) {
  const { name, email, password } = msg.body;
  // See if user exists
  try {
    student = new Student({
      name,
      email,
    });

    await student.save();
    mysqlConnectionPool.query(
      `SELECT email FROM student WHERE email= '${email}'`,
      async (error, result) => {
        if (error) {
          console.log(error);
          return res.status(500).send('Server Error');
        }
        if (result.length > 0) {
          response.status = 400;
          response.message = 'Student already exists';
          return callback(null, response);
        }

        //Encrypt password using bcrypt
        const salt = await bcrypt.genSalt(10);
        const passwordEncrypted = await bcrypt.hash(password, salt);

        mysqlConnectionPool.query(
          `INSERT into student (name, email, password) 
                        VALUES ('${name}', '${email}', '${passwordEncrypted}')`,
          (error, result) => {
            if (error) {
              console.log(error);
              response.status = 500;
              response.message = 'Server Error';
              return callback(null, response);
            }
            const payload = {
              user: {
                id: student._id,
                name: name,
                email: email,
                usertype: 'student',
              },
            };
            jwt.sign(
              payload,
              config.get('jwtSecret'),
              { expiresIn: 6000000 },
              (error, token) => {
                if (error) throw error;
                const result = {
                  token,
                  id: student._id,
                  name: name,
                  email: email,
                };
                response.status = 200;
                response.message = result;
                return callback(null, response);
              },
            );
          },
        );
      },
    );
  } catch (error) {
    console.error(err.message);
    response.status = 500;
    response.message = 'Server Error';
    return callback(null, response);
  }
}

exports.handle_request = handle_request;
