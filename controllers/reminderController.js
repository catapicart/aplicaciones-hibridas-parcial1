const reminderModel = require('../models/reminderModel');
const studentModel = require('../models/studentModel');


exports.create = async (req, res)=>{
    try{
        const data = req.body;
        const {classId} = req.params;

        data.class_id = classId;

        if(data.student_id){
            const student = await studentModel.find({_id: data.student_id});
            if(!student){
                res.send('Please enter a valid student id')
            }
        }

        if(data.title == '' || !isNaN(data.title)){
            res.send('Title must be of type string and can not be empty');
        }else if(data.description == '' || !isNaN(data.description) || data.description == data.title){
            res.send('Description must be of type string and can not be empty. It should be different from the title');
        }else if(data.deadline == ''){
            res.send('Deadline can not be empty')
        }
        else{
            const newReminder = new reminderModel(data);

            await newReminder.save();

            res.status(201).json({
                msg: 'Reminder created successfully'
            })
        }
    }catch(err){
        console.log(err);
        res.status(500).json({
            msg: 'Unexpected error'
        });
    
    }
};

exports.getReminders = async (req, res)=>{
    try{
        const reminders = await reminderModel.find({});

        let list = '';

        reminders.forEach(r=>{
            list += `<p>${r.title}</p> <p>${r.deadline}</p> <a href='/reminder/${r.id}'>Read detail</a> <a href='/reminder/edit/${r.id}'>Edit</a> <a href='/reminder/delete/${r.id}'>DELETE</a>`
        })

        if(list != ''){
            res.send('<h1>Reminders</h1>' + list)
        }else{
            res.send(`<h1>Couldn't find any reminders</h1>`);
        }

    }catch(err){
        console.log(err);
        res.status(500).json({
            msg: 'Unexpected error'
        });
    }
}

exports.getReminderById = async (req, res)=>{
    try{
        const {id } = req.params;

        const reminder = await reminderModel.find({_id: id});

        res.json({
            msg: 'Reminder',
            data: reminder
        })
    }catch(err){
        console.log(err);
        res.status(500).json({
            msg: 'Unexpected error'
        });
    }
}

exports.edit = async (req, res)=>{
    try{
        const {id} = req.params;
        const data = req.body;

        if(data.student_id){
            const student = await studentModel.find({_id: data.student_id});
            if(!student){
                res.send('Please enter a valid student id')
            }
        }

        if(data.title == '' || !isNaN(data.title)){
            res.send('Title must be of type string and can not be empty');
        }else if(data.description == '' || !isNaN(data.description) || data.description == data.title){
            res.send('Description must be of type string and can not be empty. It should be different from the title');
        }else if(data.deadline == ''){
            res.send('Deadline can not be empty')
        }
        else{

            reminderModel.updateOne({_id: id}, {
                title: data.title,
                description: data.description,
                deadline: data.deadline,
                student_id: data.student_id,
                class_id : data.class_id
            }).then(function(){
                console.log("Student updated"); // Success
             }).catch(function(error){
                console.log(error); // Failure
             });
            
        }
        res.status(201).json({
            msg: 'Reminder updated successfully'
        })
    }catch(err){
        console.log(err)
        res.status(500).json({
            msg: 'Unexpected error'
        });
    }
};

exports.delete = async (req,res)=>{
    try{
        const {id} = req.params;

        reminderModel.deleteOne({_id: id}).then(function(){
            console.log("Reminder deleted"); // Success
         }).catch(function(error){
            console.log(error); // Failure
         });
         res.json({
            msg: 'Reminder deleted correctly'
        });

    }catch(err){
        console.log(err)
        res.status(500).json({
            msg: 'Unexpected error'
        });
    }
}