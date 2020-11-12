const mongoose = require('mongoose');

const StudentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  image: { type: String },
  jobPreferance: {
    status: {
      type: String,
      required: true,
    },
    title: {
        type: [String],
        required: true,
    },
    salary: {
        type: String,
        required: true,
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
      vetran: {
        type: Boolean,
      },
   },
  date: { type: Date, default: Date.now() },
});

const Student = mongoose.model('student', StudentSchema);
module.exports = Student;
