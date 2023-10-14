const express = require('express');

const db = require('./database');

const studentController = require('./controllers/studentController.js');

const classController = require('./controllers/classController.js');

const reportController = require('./controllers/reportController');

const reminderController = require('./controllers/reminderController')

const app = express();
const port = 3000;

app.use(express.json()); //soporte para JSON

//conexion a la db
db.on('error', ()=> {
    console.error('Error de conexion con la base');
});

db.once('open', ()=> {
    console.log('Conexion exitosa')
})

app.get('/', (req, res)=>{
    res.send("<h1>Teacher's helper</h1>")
})

//ruta para ver todas las clases
app.get('/classes', classController.getClasses)
//ruta para ver una clase especifica
app.get('/class/:id', classController.getClassbyId);
//ruta para agregar clase
app.post('/class/create', classController.create);
//editar clase /api/class/edit/:id
app.put('/class/edit/:id', classController.edit); 
//borrar clase
app.delete('/class/delete/:id', classController.delete)


//ruta para ver todos los alumnos
app.get('/students', studentController.getStudents);
//ruta para ver detalles de un alumno
app.get('/student/:id', studentController.getStudentById)
//ruta para agregar alumno y ubicarlo en una clase
app.post('/student/create/:classId', studentController.create)
//ruta para editar alumno
app.put('/student/edit/:id', studentController.edit)
//ruta para borrar alumno
app.delete('/student/delete/:id', studentController.delete)

//ruta para ver todos los boletines
app.get('/reports', reportController.getReports)
//ruta para ver un boletin
app.get('/report/:id', reportController.getReportById)
//ruta para crear boletin de alumno
app.post('/report/create/:studentId', reportController.create);
//ruta para editarlo
app.put('/report/edit/:reportId', reportController.edit);
//ruta para borrarlo
app.delete('/report/delete/:reportId', reportController.delete);


//ruta para traer todos los recordatorios
app.get('/reminders', reminderController.getReminders);
//ruta para ver detalle de un recordatorio
app.get('/reminder/:id', reminderController.getReminderById);
//agregar recordatorio
app.post('/reminder/create/:classId', reminderController.create)
//editarlo
app.put('/reminder/edit/:id', reminderController.edit);
//borrarlo
app.delete('/reminder/delete/:id', reminderController.delete);


app.listen(port, ()=>{
    console.log('Escuchando el puerto', port)
});
