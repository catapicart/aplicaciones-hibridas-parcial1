const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const studentSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true
    }, 
    year: {
        type: String,
        required: true
    },
    class : {
        type: Schema.Types.ObjectId,
        ref: 'Class',
        required: true
    },
    created_at: {
        type: Date,
        default: Date.now()
    }
});

const Student = mongoose.model('Student', studentSchema);

module.exports = Student;
