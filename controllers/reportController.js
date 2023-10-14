const reportModel = require('../models/reportModel');

exports.create = async (req, res)=>{
    try{
        const data = req.body;
        const {studentId} = req.params;
        data.student_id = studentId;

        if(data.absences == '' || isNaN(data.absences)){
            res.send('The absences must be of type number, if the student was not absent, indicate it with a 0');
        }else if(data.date == ''){
            res.send('Date must not be empty')
        }else if(data.unit == '' || isNaN(data.unit)){
            res.send('Unit of the test must be of type number and it can not be empty')
        }else if(data.oral == '' || isNaN(data.oral)){
            res.send('Mark of the oral test must be of type number and it can not be empty')
        }else if(data.grammar == '' || isNaN(data.grammar)){
            res.send('Mark of the grammar test must be of type number and it can not be empty')
        }else if(data.writing == '' || isNaN(data.writing)){
            res.send('Mark of the writing test must be of type number and it can not be empty')
        }else if(data.listening == '' || isNaN(data.listening)){
            res.send('Mark of the listening test must be of type number and it can not be empty')
        }else if(data.homework == '' || isNaN(data.homework)){
            res.send('Homework mark must be of type number and it can not be empty')
        }else if(data.reading == '' || isNaN(data.reading)){
            res.send('Reading mark must be of type number and it can not be empty')
        }else if(data.comment == '' || !isNaN(data.comment || data.comment.length > 10)){
            res.send('Comment for the report must be of type string and can not be longer than 10 words')
        }else{
            const newReport = new reportModel(data);
            await newReport.save();

            res.status(201).json({
                msg: 'Student report created successfully'
            })
        }
    }catch(err){
        console.log(err);
        res.status(500).json({
            msg: 'Unexpected error'
        });
    }
};

exports.getReports = async (req, res)=>{
    try{
        const reports = await reportModel.find({});

        let list = '';

        reports.forEach(r =>{
            list += `Student: ${r.student_id} <a href='/report/${r.id}'>Read details</a> <a href='/report/edit/${r.id}'>Edit</a>`
        });

        if(list != ''){
            res.send('<h1>Students</h1>' + list)
        }else{
            res.send(`<h1>Couldn't find any reports</h1>`);
        }
    }catch(err){
        console.log(err);
        res.status(500).json({
            msg: 'Unexpected error'
        });
    }
};

exports.getReportById = async(req, res)=>{
    try{
        const { id } = req.params;

        const report = await reportModel.find({_id: id});

        res.json({
            msg: 'Report',
            data: report
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
        const {reportId} = req.params;
        const data = req.body;

        if(data.absences == '' || isNaN(data.absences)){
            res.send('The absences must be of type number, if the student was not absent, indicate it with a 0');
        }else if(data.date == ''){
            res.send('Date must not be empty')
        }else if(data.unit == '' || isNaN(data.unit)){
            res.send('Unit of the test must be of type number and it can not be empty')
        }else if(data.oral == '' || isNaN(data.oral)){
            res.send('Mark of the oral test must be of type number and it can not be empty')
        }else if(data.grammar == '' || isNaN(data.grammar)){
            res.send('Mark of the grammar test must be of type number and it can not be empty')
        }else if(data.writing == '' || isNaN(data.writing)){
            res.send('Mark of the writing test must be of type number and it can not be empty')
        }else if(data.listening == '' || isNaN(data.listening)){
            res.send('Mark of the listening test must be of type number and it can not be empty')
        }else if(data.homework == '' || isNaN(data.homework)){
            res.send('Homework mark must be of type number and it can not be empty')
        }else if(data.reading == '' || isNaN(data.reading)){
            res.send('Reading mark must be of type number and it can not be empty')
        }else if(data.comment == '' || !isNaN(data.comment || data.comment.length > 10)){
            res.send('Comment for the report must be of type string and can not be longer than 10 words')
        }else{
            reportModel.updateOne({_id: reportId},{
                absences: data.absences,
                unit: data.unit,
                oral: data.oral,
                grammar: data.grammar,
                writing: data.writing,
                listening: data.listening,
                homework: data.homework,
                reading: data.reading,
                comment: data.comment
            }).then(function(){
                console.log("Report updated"); // Success
             }).catch(function(error){
                console.log(error); // Failure
             });
        }

        res.status(201).json({
            msg: 'Student report updated successfully'
        })
        }catch(err){
            console.log(err)
            res.status(500).json({
                msg: 'Unexpected error'
            });
        }
};

exports.delete = async (req, res)=>{
    try{
        const {reportId} = req.params;

        reportModel.deleteOne({_id: reportId}).then(function(){
            console.log("Report deleted"); // Success
         }).catch(function(error){
            console.log(error); // Failure
         });

         res.json({
            msg: 'Student report deleted correctly'
        });
    }catch(err){
        console.log(err)
        res.status(500).json({
            msg: 'Unexpected error'
        });
    }
};