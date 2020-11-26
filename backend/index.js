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
const jobApplicant = require('./routes/company/applicant');

const overviewCompany = require('./routes/company/overview');
const salaryCompany = require('./routes/company/salary');
const interviewCompany = require('./routes/company/interview');
const jobCompany = require('./routes/company/job');

// Admin
const signupAdmin = require('./routes/admin/signup');
const loginAdmin = require('./routes/admin/login');
const review = require('./routes/admin/reviews');

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
// Company - Applicant
app.use('/company/applicant', jobApplicant);
//  Company - REVIEW
app.use('/company/review', reviewCompany);
//  Company - OVERVIEW
app.use('/company/overview', overviewCompany);
//  Company - SALARY
app.use('/company/salary', salaryCompany);

//  Company - SALARY
app.use('/company/interview', interviewCompany);
//  Company - JOB
app.use('/company/job', jobCompany);

/*  Routes for Admin */
// Admin - SIGNUP
app.use('/admin/signup', signupAdmin);
//  Admin - LOGIN
app.use('/admin/login', loginAdmin);
//  Admin - LOGIN
app.use('/admin/review', review);

//  Connection to a port
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Application started listening to port ${PORT} successfully.`);
});
