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

Plantilla.listar = function () { //no TDD -> funcion async
    this.recupera(this.imprime);
}


Plantilla.listarAlfb = function () { //no TDD -> funcion async
    (this.recuperaAlf(this.imprimee));
}

Plantilla.listarPersona = function () { //no TDD -> funcion async
    this.recupera(this.imprimee);
}

Plantilla.pieTable = function () { //hecho el TDD
    return "</tbody></table>";
}

Plantilla.imprime = function (vector) { //hecho el TDD
    let msj = "";
    msj += Plantilla.cabeceraTable();
    vector.forEach(e => msj += Plantilla.cuerpoTr(e))
    msj += Plantilla.pieTable();

    // Borro toda la info de Article y la sustituyo por la que me interesa
    Frontend.Article.actualizar( "Listado de proyectos", msj )
}

Plantilla.imprimee = function (vector) { //hecho el TDD
    let msj = "";
    msj += Plantilla.cabeceraTablee();
    vector.forEach(e => msj += Plantilla.cuerpoTrr(e))
    msj += Plantilla.pieTable();

    // Borro toda la info de Article y la sustituyo por la que me interesa
    Frontend.Article.actualizar( "Listado de proyectos", msj )
}


Plantilla.recupera = async function (callBackFn) { //no TDD -> funcion async
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

Plantilla.recuperaAlf = async function (callBackFn) { //no TDD -> funcion async
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

Plantilla.cabeceraTable = function () {  //hecho el TDD
    return `<table class="listado-proyectos">
        <thead>
        <th>Nombre</th><th>Fecha</th><th>Pais</th><th>Edad</th><th>Modalidad</th><th>Grupo</th><th>AniosJJOO</th>
        </thead>
        <tbody>
    `;
}

Plantilla.cabeceraTablee = function () { //hecho el TDD
    return `<table class="listado-proyectos">
        <thead>
        <th>Nombre de los participantes</th>
        </thead>
        <tbody>
    `;
}

Plantilla.cuerpoTr = function (p) { //FALTA POR HACER, ERROR
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

Plantilla.cuerpoTrr = function (p) { //hecho el TDD
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


// Hasta aqui lo nuevo

Plantilla.form = { //hecho el TDD
    ID: "form-persona-id",
    NOMBRE: "form-persona-nombre",
    PAIS: "form-persona-pais",
    EDAD: "form-persona-edad",
    MODALIDAD: "form-persona-modalidad",
    GRUPO: "form-persona-grupo",
    AniosJJOO: "form-persona-aniosjjoo"
}

/// Objeto para almacenar los datos de la persona que se está mostrando
Plantilla.personaMostrada = null


Plantilla.plantillaTags = { //hecho el TDD
    "ID": "### ID ###",
    "NOMBRE": "### NOMBRE ###",
    "PAIS": "### PAIS ###",
    "EDAD": "### EDAD ###",
    "MODALIDAD": "### MODALIDAD ###",
    "GRUPO": "### GRUPO ###",
    "AniosJJOO": "### AniosJJOO ###",
}

Plantilla.plantillaFormularioPersona = {}

//hecho el TDD
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
`; //hecho el TDD

//HECHO el TDD
Plantilla.plantillaFormularioPersona.formulario1 = `
<form method='post' action=''>
    <table width="100%" class="listado-proyectos">
        <thead>
            <th width="20%">Id</th>
            <th width="20%">Nombre</th>
            <th width="20%">Pais</th>
            <th/th>
            <th width="10%">Edad</th>
            <th/th>
            <th width="20%">Grupo</th>
            <th width="40%">Acciones</th>
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
                        id="form-persona-grupo" required value="${Plantilla.plantillaTags.GRUPO}"
                        name="grupo_persona"/></td>
                <td>
                    <div><a href="javascript:Plantilla.editar()" class="opcion-secundaria mostrar">Editar</a></div>
                    <div><a href="javascript:Plantilla.guardar()" class="opcion-terciaria editar ocultar">Guardar</a></div>
                    <div><a href="javascript:Plantilla.cancelar()" class="opcion-terciaria editar ocultar">Cancelar</a></div>
                </td>
            </tr>
        </tbody>
    </table>
</form>
`;
//hecho el TDD


/// Plantilla para poner los datos de varias personas dentro de una tabla
Plantilla.plantillaTablaPersonas = {}

Plantilla.listarParaForm= function (search){ //no se hace TDD porque es asyncPo
    this.recuperaBuscar(this.imprime,search);
}


//hecho el TDD
Plantilla.plantillaTablaPersonas.cabecera = `<table width="100%" class="listado-proyectos">
                    <thead>
                        <th width="20%">Id</th>
                        <th width="20%">Nombre</th>
                        <th width="20%">Pais</th>
                        <th width="20%">Edad</th>
                        <th width="20%">Grupo</th>
                        <th width="10%">Acciones</th>
                    </thead>
                    <tbody>
    `;

Plantilla.recuperaUnaPersona = async function (idPersona, callBackFn) { //no se hace TDD porque es asyncPo
    try {
        const url = Frontend.API_GATEWAY + "/plantilla/getPorId/" + idPersona
        console.log("url: ",url);
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

Plantilla.mostrar = function (idPersona) { //no se hace TDD porque es asyncPo
    this.recuperaUnaPersona(idPersona, this.imprimeUnaPersona12);
}

//TDD SIN HACER
Plantilla.plantillaTablaPersonas.cuerpo = `
    <tr title="${Plantilla.plantillaTags.ID}">
        <td>${Plantilla.plantillaTags.ID}</td>
        <td>${Plantilla.plantillaTags.NOMBRE}</td>
        <td>${Plantilla.plantillaTags.PAIS}</td>
        <td>${Plantilla.plantillaTags.EDAD}</td>
        <td>${Plantilla.plantillaTags.GRUPO}</td>
        <td>
                    <div><a href="javascript:Plantilla.mostrar('${Plantilla.plantillaTags.ID}')" class="opcion-secundaria mostrar">Mostrar</a></div>
        </td>
    </tr>
    `;

//hecho el TDD
Plantilla.plantillaTablaPersonas.pie = `        </tbody>
             </table>
             `;


Plantilla.sustituyeTags = function (plantilla, persona) {   //hecho el TDD
    return plantilla
    .replace(new RegExp(Plantilla.plantillaTags.ID, 'g'), persona.ref['@ref'].id)
    .replace(new RegExp(Plantilla.plantillaTags.NOMBRE, 'g'), persona.data.nombre)
    .replace(new RegExp(Plantilla.plantillaTags.PAIS, 'g'), persona.data.pais)
    .replace(new RegExp(Plantilla.plantillaTags.EDAD, 'g'), persona.data.edad)
    .replace(new RegExp(Plantilla.plantillaTags.MODALIDAD, 'g'), persona.data.modalidad)
    .replace(new RegExp(Plantilla.plantillaTags.GRUPO, 'g'), persona.data.grupo)
    .replace(new RegExp(Plantilla.plantillaTags.AniosJJOO, 'g'), persona.data.aniosJJOO)
}


Plantilla.plantillaTablaPersonas.actualiza = function (persona) {  //hecho el TDD
    return Plantilla.sustituyeTags(this.cuerpo, persona)
}


Plantilla.plantillaFormularioPersona.actualiza = function (persona) { //hecho el TDD
    return Plantilla.sustituyeTags(this.formulario, persona)
}

Plantilla.plantillaFormularioPersona.actualiza12 = function (persona) { //hecho el TDD
    return Plantilla.sustituyeTags(this.formulario1, persona)
}

Plantilla.mostrarP = function (idPersona) { // hecho el TDD, pero no se deberia de hacer porque es asincrona
    this.recuperaUnaPersona(idPersona, this.imprimeUnaPersona);
}


Plantilla.personaComoTabla = function (persona) { // SIN HACER EL TDD
    return Plantilla.plantillaTablaPersonas.cabecera
        + Plantilla.plantillaTablaPersonas.actualiza(persona)
        + Plantilla.plantillaTablaPersonas.pie;
}


Plantilla.personaComoFormulario = function (persona) {          //hecho el TDD
    return Plantilla.plantillaFormularioPersona.actualiza( persona );
}

Plantilla.personaComoFormulario12 = function (persona) {        //hecho el TDD
    return Plantilla.plantillaFormularioPersona.actualiza12( persona );
}



Plantilla.imprimeMuchasPersonas = function (vector) { //sin hacer el TDD
    let msj = Plantilla.plantillaTablaPersonas.cabecera
    vector.forEach(e => msj += Plantilla.plantillaTablaPersonas.actualiza(e))
    msj += Plantilla.plantillaTablaPersonas.pie

    
    Frontend.Article.actualizarBoton("Listado de proyectos", msj)
}


Plantilla.imprimeUnaPersona = function (persona) {          // hecho el TDD
    let msj = Plantilla.personaComoFormulario(persona);

    Frontend.Article.actualizar("Mostrar a Marta Ruiz", msj)

    Plantilla.almacenaDatos(persona)
}

Plantilla.imprimeUnaPersona12 = function (persona) {        // hecho el TDD
    let msj = Plantilla.personaComoFormulario12(persona);

    Frontend.Article.actualizar("Mostrar participante", msj)

    Plantilla.almacenaDatos(persona)
}


Plantilla.almacenaDatos = function (persona) {              // hecho el TDD
    Plantilla.personaMostrada = persona;
}



Plantilla.recuperaDatosAlmacenados = function () {         // hecho el TDD 
    return this.personaMostrada;
}


Plantilla.listar2 = function () {     //no se hace TDD, es async                      
    Plantilla.recupera(Plantilla.imprimeMuchasPersonas);
}



Plantilla.habilitarDeshabilitarCamposEditables = function (deshabilitando) {       //TDD hecho
    deshabilitando = (typeof deshabilitando === "undefined" || deshabilitando === null) ? true : deshabilitando
    for (let campo in Plantilla.form) {
        document.getElementById(Plantilla.form[campo]).disabled = deshabilitando
    }
    return this
}



Plantilla.deshabilitarCamposEditables = function () {    //TDD hecho
    Plantilla.habilitarDeshabilitarCamposEditables(true)
    return this
}


                                                                                        
Plantilla.habilitarCamposEditables = function () {      //TDD hecho
    Plantilla.habilitarDeshabilitarCamposEditables(false)
    return this
}



Plantilla.opcionesMostrarOcultar = function (classname, mostrando) {     //TDD hecho
    let opciones = document.getElementsByClassName(classname)
    let claseQuitar = mostrando ? Frontend.CLASS_OCULTAR : Frontend.CLASS_MOSTRAR
    let claseAniadir = !mostrando ? Frontend.CLASS_OCULTAR : Frontend.CLASS_MOSTRAR

    for (let i = 0; i < opciones.length; ++i) {
        Frontend.quitarClase(opciones[i], claseQuitar)
            .aniadirClase(opciones[i], claseAniadir)
    }
    return this
}


Plantilla.ocultarOpcionesSecundarias = function () {    //TDD hecho
    this.opcionesMostrarOcultar("opcion-secundaria", false)
    return this
}



Plantilla.mostrarOpcionesSecundarias = function () { //TDD hecho
    this.opcionesMostrarOcultar("opcion-secundaria", true)
    return this
}



Plantilla.mostrarOcionesTerciariasEditar = function () {  //TDD hecho
    this.opcionesMostrarOcultar("opcion-terciaria editar", true)
    return this
}



Plantilla.ocultarOcionesTerciariasEditar = function () {  //TDD hecho
    this.opcionesMostrarOcultar("opcion-terciaria editar", false)
    return this
}



Plantilla.editar = function () {    //TDD hecho
    this.ocultarOpcionesSecundarias()
    this.mostrarOcionesTerciariasEditar()
    this.habilitarCamposEditables()
}


Plantilla.cancelar = function () {    //TDD hecho
    this.imprimeUnaPersona12(this.recuperaDatosAlmacenados())
    this.deshabilitarCamposEditables()
    this.ocultarOcionesTerciariasEditar()
    this.mostrarOpcionesSecundarias()
}

Plantilla.listarBuscar= function (search){      //no se hace TDD, es async
    this.recuperaBuscar(this.imprime,search);
    
}

Plantilla.listarBuscar2= function (search){     //no se hace TDD, es async
    this.recuperaBuscar2(this.imprime,search);
}

Plantilla.recuperaBuscar = async function (callBackFn,nombre) {     //no se hace TDD, es async
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
        const filtro=vectorPersonas.data.filter(persona => persona.data.nombre === nombre)
        callBackFn(filtro)
    }
}

Plantilla.recuperaBuscar2 = async function (callBackFn,nombre) {    //no se hace TDD, es async
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
        const filtro=vectorPersonas.data.filter(persona => persona.data.nombre === nombre)
        callBackFn(filtro)
    }
}


Plantilla.guardar = async function () {     //no se hace TDD, es async
    try {
        let url = Frontend.API_GATEWAY + "/plantilla/setTodo/"
        let id_persona = document.getElementById("form-persona-id").value
        const response = await fetch(url, {
            method: 'POST', // *GET, POST, PUT, DELETE, etc.
            mode: 'no-cors', // no-cors, cors, *same-origin
            cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
            credentials: 'omit', // include, *same-origin, omit
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
            redirect: 'follow', // manual, *follow, error
            referrer: 'no-referrer', // no-referrer, *client
            body: JSON.stringify({
                "id_persona": id_persona,
                "nombre_persona": document.getElementById("form-persona-nombre").value,
                "pais_persona": document.getElementById("form-persona-pais").value,
                "edad_persona": document.getElementById("form-persona-edad").value,
                "grupo_persona": document.getElementById("form-persona-grupo").value,
            }), // body data type must match "Content-Type" header
        })
        /*
        Error: No procesa bien la respuesta devuelta
        if (response) {
            const persona = await response.json()
            alert(persona)
        }
        */
        Plantilla.mostrar(id_persona)
    } catch (error) {
        alert("ErrorGuardar: No se han podido acceder al API Gateway " + error)
        //console.error(error)
    }
}


Plantilla.historia10 = function(term1, term2, term3, term4) {
    this.recuperahistoria10(this.imprime, term1, term2, term3, term4);
}

Plantilla.recuperahistoria10 = async function(callBackFn, nombre, edad, pais, grupo) {
    let response = null;
    try {
        const url = Frontend.API_GATEWAY + "/plantilla/getTodas";
        response = await fetch(url);
    } catch (error) {
        alert("Error: No se pudo acceder al API Gateway. Intente de nuevo más tarde.");
        console.error(error);
    }
    
    let vectorPersonas = null;
    if (response) {
        vectorPersonas = await response.json();
        const filtro = vectorPersonas.data.filter(persona => 
            persona.data.nombre.includes(nombre) && 
            persona.data.edad.includes(edad) && 
            persona.data.pais.includes(pais) && 
            persona.data.grupo.includes(grupo));
        callBackFn(filtro);
    }
}
















