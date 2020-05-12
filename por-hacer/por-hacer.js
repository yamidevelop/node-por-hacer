const fs = require('fs');

let listadoPorHacer = [];

//guardar la info en un JSON
const guardarDB = () => {
    let data = JSON.stringify(listadoPorHacer);
    //stringify convierte un objeto a JSON totalmente valido

    fs.writeFile('db/data.json', data, (err) => {
        if (err) throw new Error('No se pudo grabar', err);
    });
}

const cargarDB = () => {

    //la ejecucion se guarda en un try porque si esta vacio el archivo no lo va a reconocer como json y dara error: Unexpected end of JSON input at parse (<anonymous>)
    try {
        listadoPorHacer = require('../db/data.json');
    } catch (error) {
        let listadoPorHacer = [];
    }
}

const crear = (descripcion) => {

    cargarDB(); //para mantener la info que estaba e ir agregando por append

    let porHacer = {
        descripcion,
        completado: false
    };

    listadoPorHacer.push(porHacer);
    //metodo push() añade uno o más elementos al final de un array y devuelve la nueva
    guardarDB();

    return porHacer;
}

const getListado = () => {
    cargarDB();

    return listadoPorHacer; //solo asi devolviendo el objeto entero
}

const actualizar = (descripcion, completado = true) => {
    cargarDB();

    let index = listadoPorHacer.findIndex(tarea => tarea.descripcion === descripcion);
    //si devuelve -1 es que no lo encontró. Devolverá la posicion en que se encuentra la descripcion pasada por parm

    if (index >= 0) {
        listadoPorHacer[index].completado = completado;
        guardarDB();
        return true;
    } else {
        return false;
    }
}

const borrar = (descripcion) => {
    cargarDB();

    //crea un nuevo listado con todos los datos menos la descripcion
    let nuevoListado = listadoPorHacer.filter(tarea => tarea.descripcion !== descripcion);

    if (listadoPorHacer.length === nuevoListado.length) {
        return false
    } else {
        //se asigna el nuevo listado limpio sin la descripcion por parametro
        listadoPorHacer = nuevoListado
        guardarDB();
        return true;
    }
}

module.exports = {
    crear,
    getListado,
    actualizar,
    borrar
}