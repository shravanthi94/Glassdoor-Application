const mongoose = require('mongoose');

const { Schema } = mongoose;

const resumeSchema = new Schema({
    student: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'student'
    },
    file: { type: String, required: true },
    preview: { type: String },
    format: { type: String, required: true }
}, {
    versionKey: false,
}, { collection: 'resume' });

module.exports = mongoose.model('resume', resumeSchema);