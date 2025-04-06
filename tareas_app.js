const express = require('express');
const app = express();
const sqlite = require('sqlite3');
const bodyParser = require('body-parser');
app.set('view engine','ejs');
app.set('view cache', false);

app.use(bodyParser.urlencoded({ extended: true }));

const db = new sqlite.Database('./central.db', sqlite.OPEN_READWRITE, (error)=>{
	if (error){
		return console.log(error);
	}
	console.log("Conexión a la BD establecida");
});

app.get('/', (req,res)=>{
	res.render('index');
});

app.get('/agregar', (req,res)=>{
	res.render('tareas');
});

app.post('/guardar', (req,res) =>{
	const { codigo, descripcion } = req.body;
	db.run('insert into tareas (codigo,descripcion) VALUES (?,?)', [codigo,descripcion], function (err){
		if (err){
			return console.error(err.message);
		}
		console.log("registro insertado correctamente");
		res.render('tareas',{
			mensaje: 'Tarea registrada satisfactoriamente',
			id: this.lastID
		});
	});
});

app.get('/tareas', (req,res) =>{
	db.all("select * from tareas", [], (err,rows) =>{
		if (err){
			throw err;
		}
		res.render('lista', { tareas: rows });
	});
});

app.listen(3000,()=>{
	console.log("Servidor en puerto 3000");
});
