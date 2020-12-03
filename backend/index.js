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
const resume = require('./routes/student/resume');
const jobPostings = require('./routes/student/jobPostings');
const studentProfile = require('./routes/student/profile');

const applications = require('./routes/student/applications');

// Company
const signupCompany = require('./routes/company/signup');
const loginCompany = require('./routes/company/login');
const profileCompany = require('./routes/company/profile');
const reviewCompany = require('./routes/company/review');
const jobPosting = require('./routes/company/jobPosting');
const jobApplicant = require('./routes/company/applicant');
const companyProfilePic = require('./routes/company/companyprofilepic');
const overviewCompany = require('./routes/company/overview');
const salaryCompany = require('./routes/company/salary');
const interviewCompany = require('./routes/company/interview');
const jobCompany = require('./routes/company/job');
const companyPhotos = require('./routes/company/photos');

// Admin
const signupAdmin = require('./routes/admin/signup');
const loginAdmin = require('./routes/admin/login');
const review = require('./routes/admin/reviews');
const company = require('./routes/admin/company');
const analytics = require('./routes/admin/analytics');
const photos = require('./routes/admin/photos');

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
//  Student - JOB PROFILE
app.use('/student/profile', studentProfile);
//  Student - UPLOAD RESUME
app.use('/student/resume', resume);
//  Student - JOB POSTINGS
app.use('/student/jobs', jobPostings);
//  Student - JOB APPLICATIONS
app.use('/student/applications', applications);


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
// Company - Photos
app.use('/company/images', companyPhotos);

//  Company - SALARY
app.use('/company/interview', interviewCompany);
//  Company - JOB
app.use('/company/job', jobCompany);

//Company - Profile Pic
app.use('/company/profilepic', companyProfilePic);

/*  Routes for Admin */
// Admin - SIGNUP
app.use('/admin/signup', signupAdmin);
//  Admin - LOGIN
app.use('/admin/login', loginAdmin);
//  Admin - REVIEW
app.use('/admin/review', review);
app.use('/admin/photos', photos);
//  Admin - COMPANY
app.use('/admin/companies', company);
//  Admin - ANALYTICS
app.use('/admin/analytics', analytics);

//  Connection to a port
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Application started listening to port ${PORT} successfully.`);
});