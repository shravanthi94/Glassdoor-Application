const mongoose = require('mongoose');

const StudentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  image: { type: String },
  jobPreference: {
    status: {
      type: String,
    },
    title: {
      type: String,
    },
    salary: {
      type: String,
    },
    relocation: {
      type: Boolean,
    },
    industry: {
      type: String,
    },
  },
  demographics: {
    ethnicity: {
      type: String,
    },
    gender: {
      type: String,
    },
    disability: {
      type: String,
    },
    veteran: {
      type: Boolean,
    },
  },

  primaryResume: {
    type: String,
  },
  
  applications:{
    type: String,
  },

  date: { type: Date, default: Date.now() },
});

const Student = mongoose.model('student', StudentSchema);
module.exports = Student;


/*
 * 
 * 
 * 
 * 
 * 
 * 
 */