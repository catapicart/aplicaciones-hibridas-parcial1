const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const reportSchema = new Schema({
    student_id: {
        type: Schema.Types.ObjectId,
        ref: 'Student',
        required: true
    },
    absences: {
        type: Number,
        required: true,
        default: 0
    },
    date: {
        type: Date,
        default: Date.now(),
        required: true
    },
    unit: {
        type: Number,
        required: true
    },
    oral :{
        type: Number,
        required: true
    },
    grammar:{
        type: Number,
        required: true
    },
    writing: {
        type: Number,
        required: true
    },
    listening:{
        type: Number,
        required: true
    },
    homework: {
        type: Number,
        required: true
    },
    reading:{
        type: Number,
        required: true
    },
    comment:{
        type: String,
        required: true
    },
});

const Report = mongoose.model('Report', reportSchema);

module.exports = Report;