/**
 * @file Plantilla.js
 * @description Funciones para el procesamiento de la info enviada por el MS Plantilla
 * @author Víctor M. Rivas <vrivas@ujaen.es>
 * @date 03-feb-2023
 */

"use strict";

/// Creo el espacio de nombres
let Plantilla = {};

// Plantilla de datosDescargados vacíos
Plantilla.datosDescargadosNulos = {
    mensaje: "Datos Descargados No válidos",
    autor: "",
    email: "",
    fecha: ""
}


/**
 * Función que descarga la info MS Plantilla al llamar a una de sus rutas
 * @param {string} ruta Ruta a descargar
 * @param {función} callBackFn Función a la que se llamará una vez recibidos los datos.
 */
Plantilla.descargarRuta = async function (ruta, callBackFn) {
    let response = null

    // Intento conectar con el microservicio Plantilla
    try {
        const url = Frontend.API_GATEWAY + ruta
        response = await fetch(url)

    } catch (error) {
        alert("Error: No se han podido acceder al API Gateway")
        console.error(error)
        //throw error
    }

    // Muestro la info que se han descargado
    let datosDescargados = null
    if (response) {
        datosDescargados = await response.json()
        callBackFn(datosDescargados)
    }
}


/**
 * Función principal para mostrar los datos enviados por la ruta "home" de MS Plantilla
 */
Plantilla.mostrarHome = function (datosDescargados) {
    // Si no se ha proporcionado valor para datosDescargados
    datosDescargados = datosDescargados || this.datosDescargadosNulos

    // Si datos descargados NO es un objeto 
    if (typeof datosDescargados !== "object") datosDescargados = this.datosDescargadosNulos

    // Si datos descargados NO contiene el campo mensaje
    if (typeof datosDescargados.mensaje === "undefined") datosDescargados = this.datosDescargadosNulos

    Frontend.Article.actualizar("Plantilla Home", datosDescargados.mensaje)
}

/**
 * Función principal para mostrar los datos enviados por la ruta "acerca de" de MS Plantilla
 */
Plantilla.mostrarAcercaDe = function (datosDescargados) {
    // Si no se ha proporcionado valor para datosDescargados
    datosDescargados = datosDescargados || this.datosDescargadosNulos

    // Si datos descargados NO es un objeto 
    if (typeof datosDescargados !== "object") datosDescargados = this.datosDescargadosNulos

    // Si datos descargados NO contiene los campos mensaje, autor, o email
    if (typeof datosDescargados.mensaje === "undefined" ||
        typeof datosDescargados.autor === "undefined" ||
        typeof datosDescargados.email === "undefined" ||
        typeof datosDescargados.fecha === "undefined"
    ) datosDescargados = this.datosDescargadosNulos

    const mensajeAMostrar = `<div>
    <p>${datosDescargados.mensaje}</p>
    <ul>
        <li><b>Autor/a</b>: ${datosDescargados.autor}</li>
        <li><b>E-mail</b>: ${datosDescargados.email}</li>
        <li><b>Fecha</b>: ${datosDescargados.fecha}</li>
    </ul>
    </div>
    `;
    Frontend.Article.actualizar("Plantilla Acerca de", mensajeAMostrar)
}


/**
 * Función principal para responder al evento de elegir la opción "Home"
 */
Plantilla.procesarHome = function () {
    this.descargarRuta("/plantilla/", this.mostrarHome);
}

Plantilla.listar = function () {
    this.recupera(this.imprime);
}

Plantilla.pieTable = function () { //hecho el TDD
    return "</tbody></table>";
}

Plantilla.imprimee = function (vector) { //hecho el TDD
    //console.log( vector ) // Para comprobar lo que hay en vector
    let msj = "";
    msj += Plantilla.cabeceraTablee();
    vector.forEach(e => msj += Plantilla.cuerpoTrr(e))
    msj += Plantilla.pieTable();

    // Borro toda la info de Article y la sustituyo por la que me interesa
    Frontend.Article.actualizar( "Listado de proyectos", msj )
}


Plantilla.recupera = async function (callBackFn) {
    let response = null

    // Intento conectar con el microservicio personas
    try {
        const url = Frontend.API_GATEWAY + "/plantilla/getTodas"
        response = await fetch(url)

    } catch (error) {
        alert("Error: No se han podido acceder al API Gateway")
        console.error(error)
        //throw error
    }

    // Muestro todas las persoans que se han descargado
    let vectorPersonas = null
    if (response) {
        vectorPersonas = await response.json()
        callBackFn(vectorPersonas.data)
    }
}

Plantilla.listarPersona = function () {
    this.recupera(this.imprimee);
}

Plantilla.cabeceraTablee = function () { //hecho el TDD
    return `<table class="listado-proyectos">
        <thead>
        <th>Nombre de los participantes</th>
        </thead>
        <tbody>
    `;
}

Plantilla.cuerpoTrr = function (p) {  //hecho el tdd
    const d = p.data
    const Nombre = d.nombre;

    return `<tr title="${p.ref['@ref'].id}">
    <td>${Nombre}</td>
    </tr>
    `;
}


Plantilla.procesarAcercaDe = function () {
    this.descargarRuta("/plantilla/acercade", this.mostrarAcercaDe);
}


Plantilla.listarAlfb = function () { // es asincrona -> No TDD
    (this.recuperaAlf(this.imprimee));
}

Plantilla.recuperaAlf = async function (callBackFn) { // es asincrona -> No TDD
    let response = null

    // Intento conectar con el microservicio proyectos
    try {
        const url = Frontend.API_GATEWAY + "/plantilla/getTodas"
        response = await fetch(url)

    } catch (error) {
        alert("Error: No se han podido acceder al API Gateway")
        console.error(error)
        //throw error
    }

    // Muestro todos los proyectos que se han descargado
    let vectorProyectos = null
    if (response) {
        vectorProyectos = await response.json()
        vectorProyectos.data.sort((a, b) => {
            const nombreA = a.data.nombre.toLowerCase();
            const nombreB = b.data.nombre.toLowerCase();
            if (nombreA < nombreB) {
                return -1;
            }
            if (nombreA > nombreB) {
                return 1;
            }
            return 0;
        });
        callBackFn(vectorProyectos.data)
    }
}

Plantilla.imprime = function (vector) { // TDD hecho
    //console.log( vector ) // Para comprobar lo que hay en vector
    let msj = "";
    msj += Plantilla.cabeceraTable();
    vector.forEach(e => msj += Plantilla.cuerpoTr(e))
    msj += Plantilla.pieTable();

    // Borro toda la info de Article y la sustituyo por la que me interesa
    Frontend.Article.actualizar( "Listado de proyectos", msj )
}

Plantilla.cabeceraTable = function () { //TDD hecho 
    return `<table class="listado-proyectos">
        <thead>
        <th>Nombre</th><th>Fecha</th><th>Pais</th><th>Edad</th><th>Modalidad</th><th>Grupo</th><th>AniosJJOO</th>
        </thead>
        <tbody>
    `;
}

Plantilla.cuerpoTr = function (p) { //falta arreglarlo 
    const d = p.data
    const Nombre = d.nombre;
    const fecha = d.fechaNacimiento;
    const Pais = d.pais;
    const Edad=d.edad;
    const Modalidad=d.modalidad;
    const Grupo=d.grupo;
    const AniosJJOO=d.aniosJJOO;

    return `<tr title="${p.ref['@ref'].id}">
    <td>${Nombre}</td>
    <td>${fecha.dia}/${fecha.mes}/${fecha.año}</td>
    <td>${Pais}</td>
    <td>${Edad}</td>
    <td>${Modalidad}</td>
    <td>${Grupo}</td>
    <td>${AniosJJOO}</td>
    </tr>
    `;
}

Plantilla.personaComoFormulario = function (persona) {
    return Plantilla.plantillaFormularioPersona.actualiza( persona );
}

Plantilla.imprimeUnaPersona = function (persona) {
    // console.log(persona) // Para comprobar lo que hay en vector
    let msj = Plantilla.personaComoFormulario(persona);

    // Borro toda la info de Article y la sustituyo por la que me interesa
    Frontend.Article.actualizar("Mostrar a Marta Ruiz", msj)

    // Actualiza el objeto que guarda los datos mostrados
    Plantilla.almacenaDatos(persona)
}


Plantilla.recuperaUnaPersona = async function (idPersona, callBackFn) {
    try {
        const url = Frontend.API_GATEWAY + "/plantilla/getPorId/" + idPersona
        const response = await fetch(url);
            if (response) {
                const persona = await response.json()
                callBackFn(persona)
            }
    } catch (error) {
            alert("ErrorRecuperaUnaPersona: No se han podido acceder al API Gateway")
            console.error(error)
        }
}

Plantilla.mostrarP = function (idPersona) {
    this.recuperaUnaPersona(idPersona, this.imprimeUnaPersona);
}

Plantilla.form = {
    ID: "form-persona-id",
    NOMBRE: "form-persona-nombre",
    FECHA: "form-persona-fecha",
    PAIS: "form-persona-pais",
    EDAD: "form-persona-edad",
    MODALIDAD: "form-persona-modalidad",
    GRUPO: "form-persona-grupo",
    AniosJJOO: "form-persona-aniosjjoo"
}

Plantilla.plantillaTags = {
    "ID": "### ID ###",
    "NOMBRE": "### NOMBRE ###",
    "FECHA": "### FECHA ###",
    "PAIS": "### PAIS ###",
    "EDAD": "### EDAD ###",
    "MODALIDAD": "### MODALIDAD ###",
    "GRUPO": "### GRUPO ###",
    "AniosJJOO": "### AniosJJOO ###",
}

Plantilla.sustituyeTags = function (plantilla, persona) {
    return plantilla
        .replace(new RegExp(Plantilla.plantillaTags.ID, 'g'), persona.ref['@ref'].id)
        .replace(new RegExp(Plantilla.plantillaTags.NOMBRE, 'g'), persona.data.nombre)
        .replace(new RegExp(Plantilla.plantillaTags.FECHA, 'g'), persona.data.fecha)
        .replace(new RegExp(Plantilla.plantillaTags.PAIS, 'g'), persona.data.pais)
        .replace(new RegExp(Plantilla.plantillaTags.EDAD, 'g'), persona.data.edad)
        .replace(new RegExp(Plantilla.plantillaTags.MODALIDAD, 'g'), persona.data.modalidad)
        .replace(new RegExp(Plantilla.plantillaTags.GRUPO, 'g'), persona.data.grupo)
        .replace(new RegExp(Plantilla.plantillaTags.AniosJJOO, 'g'), persona.data.aniosJJOO)
}

Plantilla.plantillaFormularioPersona = {}

Plantilla.plantillaFormularioPersona.actualiza = function (persona) {
    return Plantilla.sustituyeTags(this.formulario, persona)
}


Plantilla.plantillaFormularioPersona.formulario = `
<form method='post' action=''>
    <table class="listado-proyectos">
        <thead>
            <th>Id</th>
            <th>Nombre</th>
            <th>Pais</th>
            <th></th>
            <th>Edad</th>
            <th></th>
            <th>Modalidad</th>
            <th></th>
            <th>Grupo</th>
            <th>AniosJJOO</th>
        </thead>
        <tbody>
            <tr title="${Plantilla.plantillaTags.ID}">
                <td><input type="text" class="form-persona-elemento" disabled id="form-persona-id"
                        value="${Plantilla.plantillaTags.ID}" 
                        name="id_persona"/></td>
                <td><input type="text" class="form-persona-elemento editable" disabled
                        id="form-persona-nombre" required value="${Plantilla.plantillaTags.NOMBRE}" 
                        name="nombre_persona"/></td>
                <td><input type="text" class="form-persona-elemento editable" disabled
                        id="form-persona-pais" required value="${Plantilla.plantillaTags.PAIS}" 
                        name="pais_persona"/></td>
                <td>
                <td><input type="text" class="form-persona-elemento editable" disabled
                        id="form-persona-edad" required value="${Plantilla.plantillaTags.EDAD}" 
                        name="edad_persona"/></td>
                <td>
                <td><input type="text" class="form-persona-elemento editable" disabled
                        id="form-persona-modalidad" required value="${Plantilla.plantillaTags.MODALIDAD}" 
                        name="modalidad_persona"/></td>
                <td>
                <td><input type="text" class="form-persona-elemento editable" disabled
                        id="form-persona-grupo" required value="${Plantilla.plantillaTags.GRUPO}" 
                        name="grupo_persona"/></td>
                <td><input type="text" class="form-persona-elemento editable" disabled
                        id="form-persona-aniosjjoo" required value="${Plantilla.plantillaTags.AniosJJOO}" 
                        name="aniosjjoo_persona"/></td>
            </tr>
        </tbody>
    </table>
</form>
`;


Plantilla.personaMostrada = null

Plantilla.almacenaDatos = function (persona) {
    Plantilla.personaMostrada = persona;
}






