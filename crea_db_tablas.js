
const sqlite = require('sqlite3');
const fs = require('fs');
const path = './central.db';


const existeDB = fs.existsSync(path);

const db = new sqlite.Database(
    path, sqlite.OPEN_READWRITE | sqlite.OPEN_CREATE, (error) => {
    if (error) {
        console.error('Error en la conexion:', error.message);
        return;
    }
    
    if (existeDB) {
        console.log('Base de datos ya existe');
    } else {
        console.log('Base de datos creada');
        crearTabla();
    }
});

function crearTabla() {
    db.run(`
        create table if not exists tareas (
            id integer primary key autoincrement,
            codigo varchar(20) not null,
            descripcion varchar(100) not null
        )
    `, (err) => {
        if (err) {
            console.error('Error!!! :', err.message);
        } else {
            console.log('Tabla creada correctamente.');
        }
    });
}