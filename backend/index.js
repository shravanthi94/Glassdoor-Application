/* eslint-disable no-console */
const app = require('./app');
//  Connect database
const connectDB = require('./config/db');

// Student
const signupStudent = require('./routes/student/signup');
const loginStudent = require('./routes/student/login');
const landingPageStudent = require('./routes/student/landingPage');
const demographics = require('./routes/student/demographics');
const jobPreferences = require('./routes/student/jobPreferences');

connectDB();

/*  Routes for Students */
//  Student - SIGNUP
app.use('/student/signup', signupStudent);
//  Student - LOGIN
app.use('/student/login', loginStudent);
//  Student - LANDING PAGE
app.use('/student/landing', landingPageStudent);
//  Student - DEMOGRAPHICS
app.use('/student/demographics', demographics);
//  Student - JOB PREFERENCES
app.use('/student/jobPreferences', jobPreferences);

//  Connection to a port
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Application started listening to port ${PORT} successfully.`);
});