const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const reminderSchema = new Schema({
    title: {
        type: String,
        required: true
    }, 
    description: {
        type: String,
        required: true
    },
    deadline: {
        //type: Date,
        type: String,
        required: true
    },
    class_id : {
        type: Schema.Types.ObjectId,
        ref: 'Class',
        required: true
    },
    student_id : {
        type: Schema.Types.ObjectId,
        ref: 'Student',
        required: false
    },
    created_at: {
        type: Date,
        default: Date.now()
    }
});

const Reminder = mongoose.model('Reminder', reminderSchema);

module.exports = Reminder;
