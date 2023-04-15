/**
 * @file ms-plantilla-spec.js
 * @description Fichero TDD para probar todo lo relacionado con MS Plantilla en el front-end
 * @author Víctor M. Rivas <vrivas@ujaen.es>
 * @date 03-feb-2023
 */

// SPECS para Jasmine

// Constantes para usar en las pruebas
const elementoTitulo = document.getElementById(Frontend.ID_SECCION_PRINCIPAL_TITULO)
const elementoContenido = document.getElementById(Frontend.ID_SECCION_PRINCIPAL_CONTENIDO)
const TITULO_HOME = "Plantilla Home"
const TITULO_ACERCA_DE = "Plantilla Acerca de"

const datosDescargadosPrueba = {
    mensaje: "Mensaje de prueba descargado",
    autor: "Prueba de autor",
    email: "Prueba de email",
    fecha: "00/00/0000"
}


// Función para esperar y dar tiempo a que responda el microservicio
function esperar(ms) {
    var inicio = new Date().getTime();
    var fin = 0;
    while ((fin - inicio) < ms) {
        fin = new Date().getTime();
    }
}



// SPECS a probar

describe("Plantilla.mostrarHome: ", function () {

    it("muestra datos nulos cuando le pasamos un valor nulo",
        function () {
            Plantilla.mostrarHome()
            expect(elementoTitulo.innerHTML).toBe(TITULO_HOME)
            expect(elementoContenido.innerHTML).toBe(Plantilla.datosDescargadosNulos.mensaje)
        })

    it("muestra datos nulos cuando le pasamos un valor que no es un objeto",
        function () {
            Plantilla.mostrarHome(23)
            expect(elementoTitulo.innerHTML).toBe(TITULO_HOME)
            expect(elementoContenido.innerHTML).toBe(Plantilla.datosDescargadosNulos.mensaje)
        })

    it("muestra datos nulos cuando le pasamos un objeto que no tiene campo mensaje",
        function () {
            // Objeto vacío
            Plantilla.mostrarHome({})
            expect(elementoTitulo.innerHTML).toBe(TITULO_HOME)
            expect(elementoContenido.innerHTML).toBe(Plantilla.datosDescargadosNulos.mensaje)

            // Objeto sin campo mensaje
            Plantilla.mostrarHome({ foo: "bar" })
            expect(elementoTitulo.innerHTML).toBe(TITULO_HOME)
            expect(elementoContenido.innerHTML).toBe(Plantilla.datosDescargadosNulos.mensaje)
        })

    it("muestra correctamente el título y el mensaje",
        function () {
            Plantilla.mostrarHome(datosDescargadosPrueba)
            expect(elementoTitulo.innerHTML).toBe(TITULO_HOME)
            expect(elementoContenido.innerHTML).toBe(datosDescargadosPrueba.mensaje)
        })
})


describe("Plantilla.mostrarAcercaDe: ", function () {
    it("muestra datos nulos cuando le pasamos un valor nulo",
        function () {
            Plantilla.mostrarAcercaDe()
            expect(elementoTitulo.innerHTML).toBe(TITULO_ACERCA_DE)
            expect(elementoContenido.innerHTML.search(Plantilla.datosDescargadosNulos.mensaje) >= 0).toBeTrue()
        })

    it("muestra datos nulos cuando le pasamos un valor que no es un objeto",
        function () {
            Plantilla.mostrarAcercaDe(23)
            expect(elementoTitulo.innerHTML).toBe(TITULO_ACERCA_DE)
            expect(elementoContenido.innerHTML.search(Plantilla.datosDescargadosNulos.mensaje) >= 0).toBeTrue()
        })

    it("muestra datos nulos cuando le pasamos un objeto que no tiene campo mensaje o autor o email o fecha ",
        function () {
            // Objeto vacío
            Plantilla.mostrarAcercaDe({})
            expect(elementoTitulo.innerHTML).toBe(TITULO_ACERCA_DE)
            expect(elementoContenido.innerHTML.search(Plantilla.datosDescargadosNulos.mensaje) >= 0).toBeTrue()

            // Objeto sin campo mensaje
            Plantilla.mostrarAcercaDe({ autor: "un autor", email: "un email", fecha: "una fecha" })
            expect(elementoTitulo.innerHTML).toBe(TITULO_ACERCA_DE)
            expect(elementoContenido.innerHTML.search(Plantilla.datosDescargadosNulos.mensaje) >= 0).toBeTrue()
            // Objeto sin campo autor
            Plantilla.mostrarAcercaDe({ mensaje: "un mensaje", email: "un email", fecha: "una fecha" })
            expect(elementoTitulo.innerHTML).toBe(TITULO_ACERCA_DE)
            expect(elementoContenido.innerHTML.search(Plantilla.datosDescargadosNulos.mensaje) >= 0).toBeTrue()
            // Objeto sin campo email
            Plantilla.mostrarAcercaDe({ mensaje: "un mensaje", autor: "un autor", fecha: "una fecha" })
            expect(elementoTitulo.innerHTML).toBe(TITULO_ACERCA_DE)
            expect(elementoContenido.innerHTML.search(Plantilla.datosDescargadosNulos.mensaje) >= 0).toBeTrue()
            // Objeto sin campo fecha
            Plantilla.mostrarAcercaDe({ mensaje: "un mensaje", autor: "un autor", email: "un email" })
            expect(elementoTitulo.innerHTML).toBe(TITULO_ACERCA_DE)
            expect(elementoContenido.innerHTML.search(Plantilla.datosDescargadosNulos.mensaje) >= 0).toBeTrue()
        })
    it("muestra correctamente el título y el mensaje conteniendo el autor, el email y la fecha",
        function () {
            Plantilla.mostrarAcercaDe(datosDescargadosPrueba)
            expect(elementoTitulo.innerHTML).toBe(TITULO_ACERCA_DE)

            // Comprobamos que al buscar el autor, el email y la fecha de prueba los encuentra dentro del contenido del article
            expect(elementoContenido.innerHTML.search(datosDescargadosPrueba.autor) >= 0).toBeTrue()
            expect(elementoContenido.innerHTML.search(datosDescargadosPrueba.email) >= 0).toBeTrue()
            expect(elementoContenido.innerHTML.search(datosDescargadosPrueba.fecha) >= 0).toBeTrue()
        })
})


describe("Plantilla.imprime", function () {
    it("Debe mostrar una tabla con los datos de las personas de la plantilla",
        function () {
            const vector = [
                {
                    ref: { "@ref": { id: "ref persona 1" } },
                    data: { 
                        nombre: { nombre: "Marta Ruiz"},
                    }
                },
                {
                    ref: { "@ref": { id: "ref persona 2" } },
                    data: { 
                        nombre: { nombre: "Antonio Juan"},
                       
                }
                }
            ];
  
            const expectedMsj = Plantilla.cabeceraTablee() + Plantilla.cuerpoTrr(vector[0]) + Plantilla.cuerpoTrr(vector[1]) + Plantilla.pieTable();
            spyOn(Frontend.Article, 'actualizar');
            Plantilla.imprimee(vector);
            expect(Frontend.Article.actualizar).toHaveBeenCalledWith('Listado de proyectos', expectedMsj);
        });
  });


  describe("Plantilla.pieTable ", function () {
    it("Debe devolver el codigo del pie de tabla",
        function () {
            expect(Plantilla.pieTable()).toBe("</tbody></table>");
        });
  });


  describe("Plantilla.cabeceraTablee", function() {
    it('existe la función cabeceraTablee', () => {
      expect(Plantilla.cabeceraTablee).toBeDefined();
    });
  
    it('devuelve una cadena de texto', () => {
      const resultado = Plantilla.cabeceraTablee();
      expect(typeof resultado).toBe('string');
    });
  
    it('devuelve una tabla con la clase "listado-proyectos"', () => {
      const resultado = Plantilla.cabeceraTablee();
      expect(resultado).toContain('<table class="listado-proyectos"');
    });
  
    it('devuelve una tabla con la etiqueta "thead"', () => {
      const resultado = Plantilla.cabeceraTablee();
      expect(resultado).toContain('<thead>');
    });
  
    it('devuelve una tabla', () => {
      const resultado = Plantilla.cabeceraTablee();
      expect(resultado).toContain('<th>Nombre de los participantes</th>');
    });
  });


  describe("Plantilla.cuerpoTrr", function() {
    it('devuelve una fila de tabla HTML con el título correcto', () => {
      const proyecto = { ref: { '@ref': { id: '359558425872433356' } }, data: { nombre: 'Marta Ruiz' } };
      const resultado = Plantilla.cuerpoTrr(proyecto);
      expect(resultado).toContain('<td>Marta Ruiz</td>');
    });
  });

  /*describe("Plantilla.listarPersona", () => {
    it('debería llamar a las funciones recupera e imprimee', () => {
      const recuperaSpy = jest.spyOn(Plantilla.recupera, 'recupera');
      const imprimeeSpy = jest.spyOn(Plantilla.imprimee, 'imprimee');
  
      Plantilla.listarPersona();        No me funciona porque tengo que instalar node app.js para que me pueda coger el método jest y 
                                        el metodo require. No me fiaba de instalarlo por si no me funcionaba la aplicacion
  
      expect(recuperaSpy).toHaveBeenCalled();
      expect(imprimeeSpy).toHaveBeenCalled();
    });
  });*/ 

  /*    TDD     HU      4*/

  describe("Plantilla.imprime todos los participantes", function(){
    it("debe mostrar una tabla con todos los datos de los participantes",
    function () {
        const vector = [
          {
            ref: { "@ref": { id: "ref persona 1" } },
            data: { 
              nombre: "Marta Ruiz",
              fechaNacimiento: { dia: 6, mes: 6, año: 1995 },
              pais: "Brasil",
              edad: 28,
              modalidad: "pareja_mixta",
              grupo: 1,
              aniosJJOO: [2005,2009,2013],
            }
          },
          {
            ref: { "@ref": { id: "ref persona 2" } },
            data: { 
                nombre: "Antonio Juan",
                fechaNacimiento: { dia: 5, mes: 6, año: 1999 },
                pais: "Portugal",
                edad: 27,
                modalidad: "pareja_masculina",
                grupo: 1,
                aniosJJOO: [2013,2017],
            }
          }
      ];
        const expectedMsj = Plantilla.cabeceraTable() + Plantilla.cuerpoTr(vector[0]) + Plantilla.cuerpoTr(vector[1]) + Plantilla.pieTable();
        spyOn(Frontend.Article, 'actualizar');
        Plantilla.imprime(vector);
        expect(Frontend.Article.actualizar).toHaveBeenCalledWith('Listado de proyectos', expectedMsj);
    })
  });
  

  /*describe("Plantilla.cabeceraTable", function(){
    it("devuelve una cadena de texto que representa la cabecera de una tabla", 
    function() {
      // Arrange
      const expected = `<table class="listado-proyectos">
      <thead>
      <th>Nombre</th><th>Fecha</th><th>Pais</th><th>Edad</th><th>Modalidad</th><th>Grupo</th><th>AniosJJOO</th>
      </thead>
      <tbody>
      `;
  
      // Act
      const result = Plantilla.cabeceraTable();
  
      // Assert
      expect(result).toEqual(expected);
    });
  });*/

  describe("Plantilla.cabeceraTablee", function() {
    it('existe la función cabeceraTable', () => {
      expect(Plantilla.cabeceraTable).toBeDefined();
    });
  
    it('devuelve una cadena de texto', () => {
      const resultado = Plantilla.cabeceraTable();
      expect(typeof resultado).toBe('string');
    });
  
    it('devuelve una tabla con la clase "listado-proyectos"', () => {
      const resultado = Plantilla.cabeceraTable();
      expect(resultado).toContain('<table class="listado-proyectos"');
    });
  
    it('devuelve una tabla con la etiqueta "thead"', () => {
      const resultado = Plantilla.cabeceraTable();
      expect(resultado).toContain('<thead>');
    });
  
    it('devuelve una tabla', () => {
      const resultado = Plantilla.cabeceraTable();
      expect(resultado).toContain('<th>Nombre</th>');
    });

    it('devuelve una tabla', () => {
        const resultado = Plantilla.cabeceraTable();
        expect(resultado).toContain('<th>Fecha</th>');
    });

    it('devuelve una tabla', () => {
        const resultado = Plantilla.cabeceraTable();
        expect(resultado).toContain('<th>Pais</th>');
    });  

    it('devuelve una tabla', () => {
        const resultado = Plantilla.cabeceraTable();
        expect(resultado).toContain('<th>Edad</th>');
    });

    it('devuelve una tabla', () => {
        const resultado = Plantilla.cabeceraTable();
        expect(resultado).toContain('<th>Modalidad</th>');
    });
      
    it('devuelve una tabla', () => {
        const resultado = Plantilla.cabeceraTable();
        expect(resultado).toContain('<th>Grupo</th>');
    });
    
    it('devuelve una tabla', () => {
        const resultado = Plantilla.cabeceraTable();
        expect(resultado).toContain('<th>AniosJJOO</th>');
    });  

  });
  

  /*describe("Plantilla.cuerpoTr", function () {
    const p = {
        ref: { "@ref": { id: "359558425872433356" } },
        data: {
            nombre: "Marta Ruiz",
            fechaNacimiento: { dia: 6, mes: 6, año: 1995 },
            pais: "Brasil",
            edad: 28,
            modalidad: "pareja_mixta",
            grupo: 1,
            aniosJJOO: [2005,2009,2013]
        }
    }
    it("debe devolver una cadena que contenga todos los datos de la plantilla",
        function () {
            expect(Plantilla.cuerpoTr(p)).toBe(`<tr title="${p.ref['@ref'].id}">
            <td>${p.data.nombre}</td>
            <td>${p.data.fechaNacimiento.dia}/${p.data.fechaNacimiento.mes}/${p.data.fechaNacimiento.año}</td>
            <td>${p.data.pais}</td>
            <td>${p.data.edad}</td>
            <td>${p.data.modalidad}</td>
            <td>${p.data.grupo}</td>
            <td>${p.data.aniosJJOO}</td></tr>`);
        });
});*/

describe("Plantilla.cuerpoTr", function() { // EN ESTA FUNCION ES DONDE ME DA ERROR
    it("debe devolver un string con los datos de un jugador", () => { 
      const proyecto = {
        data: {
          nombre: "Marta Ruiz",
          fechaNacimiento: { dia: 1, mes: 1, año: 2000 },
          pais: "Brasil",
          edad: 28,
          modalidad: "pareja_mixta",
          grupo: 1,
          aniosJJOO: [2005, 2009, 2013]
        },
        ref: { "@ref": { id: "359558425872433356" } },
      };
  
      const expectedOutput = `<tr title="359558425872433356">
        <td>Marta Ruiz</td>
        <td>1/1/2000</td>
        <td>Brasil</td>
        <td>28</td>
        <td>pareja_mixta</td>
        <td>1</td>
        <td>2005,2009,2013</td>
      </tr>`;
  
      const result = Plantilla.cuerpoTr(proyecto);
      
      expect(result).toBe(expectedOutput);
    });
  });
  
  
  
  








/*
IMPORTANTE
==========

Las pruebas TDD que se encargan de probar las conexiones con el microservicio desde el cliente son difíciles de probar 
dado que requieren solucionar temas de sincronización. 
Esto afecta a los métodos:
 - Plantilla.descargarRuta
 - Plantilla.procesarAcercaDe
 - Plantilla.procesarHome

 Las soluciones propuestas en distintos sitios web no han producido el resultado esperado, 
 por tanto: para esta práctica, se pueden dejar SIN HACER.

 */
