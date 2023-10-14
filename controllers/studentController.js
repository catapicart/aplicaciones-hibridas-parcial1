const studentModel = require('../models/studentModel');

exports.create = async (req, res)=>{

    try{
        const data = req.body;
        const {classId} = req.params;
        data.class = classId;

        if(data.name == '' || !isNaN(data.name)){
            res.send('El nombre no puede estar vacio ni ser un numero')
            datosCorrectos = false;

        }else if(data.age == '' || isNaN(data.age)){
            res.send('La edad del alumno no puede estar vacia y debe ser un numero');
            datosCorrectos = false;

        }else if(data.year == '' || !isNaN(data.year)){
            res.send('El año del curso no puede estar vacio ni ser un numero');
            datosCorrectos = false;
        }else{
            const newStudent = new studentModel(data);

            await newStudent.save();

            res.status(201).json({
                msg: 'Student file created successfully'
            })
        }
    }catch(err){
        console.log(err);
        res.status(500).json({
            msg: 'Unexpected error'
        });
    }
};

exports.getStudents = async (req, res)=>{
    try{
        const students = await studentModel.find({});

        let list = '';

        students.forEach(s =>{
            list += `Student: ${s.name}  <a href='/student/${s.id}'>Read detail</a> <a href='/student/edit/${s.id}'>Edit</a> <a href='/report/create/${s.id}'>Add report</a><br><a href='/student/delete/${s.id}'>DELETE Student</a>`
        })

        if(list != ''){
            res.send('<h1>Students</h1>' + list)
        }else{
            res.send(`<h1>Couldn't find any students</h1>`);
        }

    }catch(err){
        console.log(err);
        res.status(500).json({
            msg: 'Unexpected error'
        });
    }
}

exports.getStudentById = async (req, res)=>{
    try{
        const {id } = req.params;

        const student = await studentModel.find({_id: id});

        res.json({
            msg: 'Student',
            data: student
        })
    }catch(err){
        console.log(err);
        res.status(500).json({
            msg: 'Unexpected error'
        });
    }
};

exports.edit = async (req, res)=>{
    try{
        const {id} = req.params;
        const data = req.body;

        if(data.name == '' || !isNaN(data.name)){
            res.send('name must be of type string, it can not be empty')
            datosCorrectos = false;

        }else if(data.age == '' || isNaN(data.age)){
            res.send('age must be of type number, it can not be empty');
              datosCorrectos = false;

        }else if(data.year == '' || !isNaN(data.year)){
            res.send('year must be of type string, it can not be empty');
            datosCorrectos = false;
        }else{

            datosCorrectos = true;
            studentModel.updateOne({ _id: id }, {
                name: data.name,
                age: data.age,
                year: data.year,
                class: data.class
            }).then(function(){
                console.log("Student updated"); // Success
             }).catch(function(error){
                console.log(error); // Failure
             });
        }

        res.status(201).json({
            msg: 'Student file updated successfully'
        })

    }catch(err){
        console.log(err)
        res.status(500).json({
            msg: 'Unexpected error'
        });
    }
}

exports.delete = async (req, res)=>{
    try{
        const { id } = req.params;

        studentModel.deleteOne({ _id: id }).then(function(){
            console.log("Student file deleted"); // Success
         }).catch(function(error){
            console.log(error); // Failure
         });


        res.json({
            msg: 'Student file deleted correctly'
        });

    }catch(err){
        console.log(err)
        res.status(500).json({
            msg: 'Unexpected error'
        });
    }
};