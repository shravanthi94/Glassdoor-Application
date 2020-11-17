/* eslint-disable no-console */
const app = require('./app');
//  Connect database
const connectDB = require('./config/db');
const sqlConnectDB = require('./config/sqlConnectionPool');

// Student
const signupStudent = require('./routes/student/signup');
const loginStudent = require('./routes/student/login');
const landingPageStudent = require('./routes/student/landingPage');
const demographics = require('./routes/student/demographics');
const jobPreferences = require('./routes/student/jobPreferences');

// Company
const signupCompany = require('./routes/company/signup');
const loginCompany = require('./routes/company/login');
const profileCompany = require('./routes/company/profile');
const reviewCompany = require('./routes/company/review');
const jobPosting = require('./routes/company/jobPosting');


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

/*  Routes for Company */
// Company - SIGNUP
app.use('/company/signup', signupCompany);
//  Company - LOGIN
app.use('/company/login', loginCompany);
//  Company - PROFILE
app.use('/company/profile', profileCompany);
//  Company - JOBPOSTING
app.use('/company/jobposting', jobPosting);

app.use('/company/review', reviewCompany);

//app.use();

//  Connection to a port
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Application started listening to port ${PORT} successfully.`);
});