const classModel = require('../models/classModel');
const mongoose = require('mongoose')

//Class

exports.create = async (req, res)=>{

    try{
        //validar
        const data = req.body;

        //if(data.name != '' && !isNaN(data.name))
        //data.name != 
        const newClass = new classModel(data);

        await newClass.save();

        res.status(201).json({
            msg: 'Class file created successfully'
        })

    }catch(err){
        console.log(err);
        res.status(500).json({
            msg: 'Unexpected error'
        });
    }
};

exports.getClasses = async (req,res)=>{
    try{
        const classes = await classModel.find({});

        let list = '';

        classes.forEach(c =>{
            list += `${c.name}  <a href='/class/${c.id}'>Ver detalle</a> <a href='/class/edit/${c.id}'>Editar</a> <a href='/student/create/${c.id}'>Agregar alumno a la clase</a> <a href='/reminder/create/${c.id}'>Agregar recordatorio</a>`
            
        })
        if(list != ''){
            res.send('<h1>My classes</h1>' + list)
        }else{
            res.send(`<h1>Couldn't find any classes</h1>`)
        }

    }catch(err){
        console.log(err);
        res.status(500).json({
            msg: 'Unexpected error'
        });
    }
}

exports.getClassbyId = async (req,res)=>{
    try{
        const { id } = req.params;

        const classObj = await classModel.find({_id: id});
        res.json({
            msg: 'Clase',
            data: classObj
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
         const { id } = req.params;
         const data = req.body;


          if(data.name == '' || !isNaN(data.name)){
              res.send('El nombre no puede estar vacio ni ser un numero')
              datosCorrectos = false;

          }else if(data.year == '' || !isNaN(data.year)){
              res.send('El año del curso no puede estar vacio ni ser un numero');
              datosCorrectos = false;

          }else if(data.book == '' || !isNaN(data.book)){
              res.send('El nombre del libro no puede estar vacio ni ser un numero');
              datosCorrectos = false;

          }else if(data.workbook == '' || !isNaN(data.workbook)){
              res.send('El nombre del libro de tareas no puede estar vacio ni ser un numero');
              datosCorrectos = false;

          }else if(data.novel == '' || !isNaN(data.novel)){
              res.send('El nombre de la novela no puede estar vacio ni ser un numero');
              datosCorrectos = false;

          }else{

            datosCorrectos = true;
            classModel.updateOne({ _id: id }, {
                name: data.name,
                year: data.year,
                book: data.book,
                workbook: data.workbook,
                novel: data.novel
            }).then(function(){
                console.log("Class updated"); // Success
             }).catch(function(error){
                console.log(error); // Failure
             });

            res.json({
                msg: 'Class updated correctly'
            });
            }    
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

        classModel.deleteOne({ _id: id }).then(function(){
            console.log("Class deleted"); // Success
         }).catch(function(error){
            console.log(error); // Failure
         });


        res.json({
            msg: 'Class deleted correctly'
        });

    }catch(err){
        console.log(err);
        res.status(500).json({
            msg: 'Unexpected error'
        });
    }
       
};