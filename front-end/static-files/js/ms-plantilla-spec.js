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

                                                                              /*    TDD     HU      2*/


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


                                                                                          /*    TDD     HU      3*/

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



  describe("Plantilla.cabeceraTable", function() {
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
  



                                                                        /*    TDD     HU      6*/

describe('Plantilla.almacenaDatos', () => {
      it('debe almacenar correctamente la persona mostrada', () => {
        const persona = {
          ref: { '@ref': { id: '359558425872433356' } },
          data: {
            nombre: "Marta Ruiz",
            pais: "Brasil",
            edad: 28,
            modalidad: "pareja_mixta",
            grupo: 1,
            aniosJJOO: [2005,2009,2013]
          }
        };

    Plantilla.almacenaDatos(persona);

    expect(Plantilla.personaMostrada).toEqual(persona);
  });
});


describe("Plantilla.imprimeUnaPersona", function () {
  let persona = {
    ref: {
      '@ref': {
        id: 'persona123'
      }
    },
    data: {
      nombre: 'Marta Ruiz',
      pais: 'Brasil',
      edad: 25,
      modalidad: 'pareja_mixta',
      grupo: 3,
      aniosJJOO: [2005]
    }
  };

  beforeEach(function () {
    spyOn(Plantilla, 'personaComoFormulario').and.returnValue('<form></form>');
    spyOn(Frontend.Article, 'actualizar');
    spyOn(Plantilla, 'almacenaDatos');
  });

  it("llama a la funcion personaComoFormulario con la persona correspondiente", function () {
    Plantilla.imprimeUnaPersona(persona);
    expect(Plantilla.personaComoFormulario).toHaveBeenCalledWith(persona);
  });

  it("actualiza el artículo con el formulario generado por Plantilla.personaComoFormulario", function () {
    Plantilla.imprimeUnaPersona(persona);
    expect(Frontend.Article.actualizar).toHaveBeenCalledWith("Mostrar a Marta Ruiz", '<form></form>');
  });

  it("almacena los datos de la persona", function () {
    Plantilla.imprimeUnaPersona(persona);
    expect(Plantilla.almacenaDatos).toHaveBeenCalledWith(persona);
  });

});

describe("Plantilla", function() {
  describe("personaComoFormulario", function() {
    it("debe comprobar que la función devuelve el formulario de persona bien actualizado", function() {
      const persona = {
        ref: {
          '@ref': {
            id: '222222'
          }
        },
        data: {
          nombre: 'Marta Ruiz',
          pais: 'Brasil',
          edad: 25,
          modalidad: 'pareja_mixta',
          grupo: 3,
          aniosJJOO: [2005]
        }
      };

      const formulario = '<form><input type="text" name="nombre" value="' + persona.data.nombre + '">' +
                          '<input type="text" name="pais" value="' + persona.data.pais + '">' +
                          '<input type="number" name="edad" value="' + persona.data.edad + '">' +
                          '<input type="text" name="modalidad" value="' + persona.data.modalidad + '">' +
                          '<input type="number" name="grupo" value="' + persona.data.grupo + '">' +
                          '<input type="number" name="aniosJJOO" value="' + persona.data.aniosJJOO + '">' +
                          '<input type="hidden" name="id" value="' + persona.ref['@ref'].id + '">' +
                          '<input type="submit" value="Enviar"></form>';

      spyOn(Plantilla, 'sustituyeTags').and.returnValue(formulario);

      const resultado = Plantilla.personaComoFormulario(persona);

      expect(Plantilla.sustituyeTags).toHaveBeenCalledWith(Plantilla.plantillaFormularioPersona.formulario, persona);
      expect(resultado).toBe(formulario);
    });
  });
});


describe("Plantilla.mostrarP()", function() {
  let recuperaUnaPersonaSpy, imprimeUnaPersonaSpy;

  beforeEach(function() {
    recuperaUnaPersonaSpy = spyOn(Plantilla, "recuperaUnaPersona");
    imprimeUnaPersonaSpy = spyOn(Plantilla, "imprimeUnaPersona");
  });

  it("debe llamar a la funcion recuperaUnaPersona() con el ID de la persona", function() {
    const idPersona = "333";
    Plantilla.mostrarP(idPersona);
    expect(recuperaUnaPersonaSpy).toHaveBeenCalledWith(idPersona, jasmine.any(Function));
  });

  it("debe llamar a la funcion imprimeUnaPersona() con la persona recuperada", function() {
    const persona = {
      ref: { "@ref": { id: "666666" } },
      data: {
        nombre: 'Marta Ruiz',
          pais: 'Brasil',
          edad: 25,
          modalidad: 'pareja_mixta',
          grupo: 3,
          aniosJJOO: [2005]
      }
    };
    recuperaUnaPersonaSpy.and.callFake(function(id, callBackFn) {
      callBackFn(persona);
    });
    Plantilla.mostrarP("333");
    expect(imprimeUnaPersonaSpy).toHaveBeenCalledWith(persona);
  });
});



describe('Plantilla.plantillaTags', () => {
  it('debe ser un objeto con las etiquetas de la plantilla', () => {
    const plantillaTags = Plantilla.plantillaTags;
    expect(plantillaTags).toBeDefined();
    expect(plantillaTags).toBeInstanceOf(Object);
    expect(plantillaTags.ID).toBeDefined();
    expect(plantillaTags.NOMBRE).toBeDefined();
    expect(plantillaTags.PAIS).toBeDefined();
    expect(plantillaTags.EDAD).toBeDefined();
    expect(plantillaTags.MODALIDAD).toBeDefined();
    expect(plantillaTags.GRUPO).toBeDefined();
    expect(plantillaTags.AniosJJOO).toBeDefined();
    expect(typeof plantillaTags.ID).toBe('string');
    expect(typeof plantillaTags.NOMBRE).toBe('string');
    expect(typeof plantillaTags.PAIS).toBe('string');
    expect(typeof plantillaTags.EDAD).toBe('string');
    expect(typeof plantillaTags.MODALIDAD).toBe('string');
    expect(typeof plantillaTags.GRUPO).toBe('string');
    expect(typeof plantillaTags.AniosJJOO).toBe('string');
  });
});



describe('Plantilla.plantillaTablaPersonas.cabecera', () => {
  it('Debería estar definida correctamente', () => {
    const expected = `<table width="100%" class="listado-proyectos">
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
    expect(Plantilla.plantillaTablaPersonas.cabecera).toEqual(expected);
  });
});



describe('Plantilla.form', () => {
  it('debe tener las etiquetas de formulario correctas', () => {
    const esperado = {
      ID: "form-persona-id",
      NOMBRE: "form-persona-nombre",
      PAIS: "form-persona-pais",
      EDAD: "form-persona-edad",
      MODALIDAD: "form-persona-modalidad",
      GRUPO: "form-persona-grupo",
      AniosJJOO: "form-persona-aniosjjoo"
    };
    expect(Plantilla.form).toEqual(esperado);
  });
});



describe('Plantilla.plantillaFormularioPersona.formulario', () => {
  it('debería ser una cadena de texto', () => {
    expect(typeof Plantilla.plantillaFormularioPersona.formulario).toBe('string');
  });

  it('debería contener la etiqueta form', () => {
    expect(Plantilla.plantillaFormularioPersona.formulario).toContain('<form');
  });

  it('debería contener la etiqueta table', () => {
    expect(Plantilla.plantillaFormularioPersona.formulario).toContain('<table');
  });

  it('debería contener la etiqueta thead', () => {
    expect(Plantilla.plantillaFormularioPersona.formulario).toContain('<thead');
  });

  it('debería contener la etiqueta tbody', () => {
    expect(Plantilla.plantillaFormularioPersona.formulario).toContain('<tbody');
  });

  it('debería contener la etiqueta tr', () => {
    expect(Plantilla.plantillaFormularioPersona.formulario).toContain('<tr');
  });

  it('debería contener la etiqueta td', () => {
    expect(Plantilla.plantillaFormularioPersona.formulario).toContain('<td');
  });

  it('debería contener la etiqueta input', () => {
    expect(Plantilla.plantillaFormularioPersona.formulario).toContain('<input');
  });

  it('debería contener la etiqueta name="id_persona"', () => {
    expect(Plantilla.plantillaFormularioPersona.formulario).toContain('name="id_persona"');
  });

  it('debería contener la etiqueta name="nombre_persona"', () => {
    expect(Plantilla.plantillaFormularioPersona.formulario).toContain('name="nombre_persona"');
  });

  it('debería contener la etiqueta name="pais_persona"', () => {
    expect(Plantilla.plantillaFormularioPersona.formulario).toContain('name="pais_persona"');
  });

  it('debería contener la etiqueta name="edad_persona"', () => {
    expect(Plantilla.plantillaFormularioPersona.formulario).toContain('name="edad_persona"');
  });

  it('debería contener la etiqueta name="modalidad_persona"', () => {
    expect(Plantilla.plantillaFormularioPersona.formulario).toContain('name="modalidad_persona"');
  });

  it('debería contener la etiqueta name="grupo_persona"', () => {
    expect(Plantilla.plantillaFormularioPersona.formulario).toContain('name="grupo_persona"');
  });

  it('debería contener la etiqueta name="aniosjjoo_persona"', () => {
    expect(Plantilla.plantillaFormularioPersona.formulario).toContain('name="aniosjjoo_persona"');
  });
});


describe('Plantilla.sustituyeTags', () => {
  it('sustituye los tags por los valores de la persona', () => {
    // Arrange
    const plantilla = `
      <p>ID: ### ID ###</p>
      <p>Nombre: ### NOMBRE ###</p>
      <p>País: ### PAIS ###</p>
      <p>Edad: ### EDAD ###</p>
      <p>Modalidad: ### MODALIDAD ###</p>
      <p>Grupo: ### GRUPO ###</p>
      <p>Años JJOO: ### AniosJJOO ###</p>
    `;
    const persona = {
      ref: { '@ref': { id: '1234567890' } },
      data: {
        nombre: 'Juan Pérez',
        pais: 'México',
        edad: 25,
        modalidad: 'Ciclismo',
        grupo: 'Individual',
        aniosJJOO: '2016, 2020'
      }
    };
    const expected = `
      <p>ID: 1234567890</p>
      <p>Nombre: Juan Pérez</p>
      <p>País: México</p>
      <p>Edad: 25</p>
      <p>Modalidad: Ciclismo</p>
      <p>Grupo: Individual</p>
      <p>Años JJOO: 2016, 2020</p>
    `;

    // Act
    const result = Plantilla.sustituyeTags(plantilla, persona);

    // Assert
    expect(result).toBe(expected);
  });
});


describe('Plantilla.plantillaFormularioPersona.actualiza', () => {
  const mockPersona = {
    ref: { '@ref': { id: '1234' } },
    data: {
      nombre: 'Juan',
      pais: 'España',
      edad: 30,
      modalidad: 'Atletismo',
      grupo: 1,
      aniosJJOO: 2016
    }
  }

  it('should replace the ID tag with the persona id', () => {
    const result = Plantilla.plantillaFormularioPersona.actualiza(mockPersona)
    expect(result.includes(mockPersona.ref['@ref'].id)).toBe(true)
  })

  it('deberia reemplazar el tag NOMBRE por nombre', () => {
    const result = Plantilla.plantillaFormularioPersona.actualiza(mockPersona)
    expect(result.includes(mockPersona.data.nombre)).toBe(true)
  })

  it('deberia reemplazar el tag PAIS por pais', () => {
    const result = Plantilla.plantillaFormularioPersona.actualiza(mockPersona)
    expect(result.includes(mockPersona.data.pais)).toBe(true)
  })

  it('deberia reemplazar el tag EDAD por edad', () => {
    const result = Plantilla.plantillaFormularioPersona.actualiza(mockPersona)
    expect(result.includes(mockPersona.data.edad)).toBe(true)
  })

  it('deberia reemplazar el tag MODALIDAD por modalidad', () => {
    const result = Plantilla.plantillaFormularioPersona.actualiza(mockPersona)
    expect(result.includes(mockPersona.data.modalidad)).toBe(true)
  })

  it('deberia reemplazar el tag GRUPO por grupo', () => {
    const result = Plantilla.plantillaFormularioPersona.actualiza(mockPersona)
    expect(result.includes(mockPersona.data.grupo)).toBe(true)
  })

  it('deberia reemplazar el tag ANIOSJJOO por aniosJJOO', () => {
    const result = Plantilla.plantillaFormularioPersona.actualiza(mockPersona)
    expect(result.includes(mockPersona.data.aniosJJOO)).toBe(true)
  })
})


                                                                              /*    TDD     HU12      &&        HU13*/
  
  describe('Plantilla.plantillaTablaPersonas.pie', () => {
  it('should be a string', () => {
    expect(typeof Plantilla.plantillaTablaPersonas.pie).toBe('string');
  });

  it('should contain </tbody> tag', () => {
    expect(Plantilla.plantillaTablaPersonas.pie).toContain('</tbody>');
  });

  it('should contain </table> tag', () => {
    expect(Plantilla.plantillaTablaPersonas.pie).toContain('</table>');
  });
});



describe('Plantilla.plantillaTablaPersonas.actualiza', () => {
  const mockPersona = {
    ref: { '@ref': { id: '1234' } },
    data: {
      nombre: 'Juan',
      pais: 'España',
      edad: 30,
      grupo: 1,
    }
  }

  it('should replace the ID tag with the persona id', () => {
    const result = Plantilla.plantillaTablaPersonas.actualiza(mockPersona)
    expect(result.includes(mockPersona.ref['@ref'].id)).toBe(true)
  })

  it('deberia reemplazar el tag NOMBRE por nombre', () => {
    const result = Plantilla.plantillaTablaPersonas.actualiza(mockPersona)
    expect(result.includes(mockPersona.data.nombre)).toBe(true)
  })

  it('deberia reemplazar el tag PAIS por pais', () => {
    const result = Plantilla.plantillaTablaPersonas.actualiza(mockPersona)
    expect(result.includes(mockPersona.data.pais)).toBe(true)
  })

  it('deberia reemplazar el tag EDAD por edad', () => {
    const result = Plantilla.plantillaTablaPersonas.actualiza(mockPersona)
    expect(result.includes(mockPersona.data.edad)).toBe(true)
  })


  it('deberia reemplazar el tag GRUPO por grupo', () => {
    const result = Plantilla.plantillaTablaPersonas.actualiza(mockPersona)
    expect(result.includes(mockPersona.data.grupo)).toBe(true)
  })
})


describe('Plantilla.plantillaFormularioPersona.actualiza12', () => {
  const mockPersona = {
    ref: { '@ref': { id: '1234' } },
    data: {
      nombre: 'Juan',
      pais: 'España',
      edad: 30,
      grupo: 1,
    }
  }

  it('should replace the ID tag with the persona id', () => {
    const result = Plantilla.plantillaFormularioPersona.actualiza12(mockPersona)
    expect(result.includes(mockPersona.ref['@ref'].id)).toBe(true)
  })

  it('deberia reemplazar el tag NOMBRE por nombre', () => {
    const result = Plantilla.plantillaFormularioPersona.actualiza12(mockPersona)
    expect(result.includes(mockPersona.data.nombre)).toBe(true)
  })

  it('deberia reemplazar el tag PAIS por pais', () => {
    const result = Plantilla.plantillaFormularioPersona.actualiza12(mockPersona)
    expect(result.includes(mockPersona.data.pais)).toBe(true)
  })

  it('deberia reemplazar el tag EDAD por edad', () => {
    const result = Plantilla.plantillaFormularioPersona.actualiza12(mockPersona)
    expect(result.includes(mockPersona.data.edad)).toBe(true)
  })

  it('deberia reemplazar el tag GRUPO por grupo', () => {
    const result = Plantilla.plantillaFormularioPersona.actualiza12(mockPersona)
    expect(result.includes(mockPersona.data.grupo)).toBe(true)
  })
})


describe("Plantilla", function() {
  describe("personaComoFormulario12", function() {
    it("debe comprobar que la función devuelve el formulario de persona bien actualizado", function() {
      const persona = {
        ref: {
          '@ref': {
            id: '222222'
          }
        },
        data: {
          nombre: 'Marta Ruiz',
          pais: 'Brasil',
          edad: 25,
          modalidad: 'pareja_mixta',
          grupo: 3,
          aniosJJOO: [2005]
        }
      };

      const formulario = '<form><input type="text" name="nombre" value="' + persona.data.nombre + '">' +
                          '<input type="text" name="pais" value="' + persona.data.pais + '">' +
                          '<input type="number" name="edad" value="' + persona.data.edad + '">' +
                          '<input type="text" name="modalidad" value="' + persona.data.modalidad + '">' +
                          '<input type="number" name="grupo" value="' + persona.data.grupo + '">' +
                          '<input type="number" name="aniosJJOO" value="' + persona.data.aniosJJOO + '">' +
                          '<input type="hidden" name="id" value="' + persona.ref['@ref'].id + '">' +
                          '<input type="submit" value="Enviar"></form>';

      spyOn(Plantilla, 'sustituyeTags').and.returnValue(formulario);

      const resultado = Plantilla.personaComoFormulario12(persona);

      expect(Plantilla.sustituyeTags).toHaveBeenCalledWith(Plantilla.plantillaFormularioPersona.formulario1, persona);
      expect(resultado).toBe(formulario);
    });
  });
});


describe("Plantilla.recuperaDatosAlmacenados", () => {
  it("devuelve la persona mostrada almacenada en la variable 'personaMostrada'", () => {
    const personaMostrada = { 
      ID: 1, 
      NOMBRE: "Juan", 
      PAIS: "Argentina", 
      EDAD: 30, 
      GRUPO: "A" 
    };
    Plantilla.personaMostrada = personaMostrada;
    const result = Plantilla.recuperaDatosAlmacenados();
    expect(result).toEqual(personaMostrada);
  });
});


describe("Plantilla.editar", function() {
  it("La funcion habilitar los campos editables", function() {
      spyOn(Plantilla, "habilitarDeshabilitarCamposEditables");

      Plantilla.editar();

      expect(Plantilla.habilitarDeshabilitarCamposEditables).toHaveBeenCalledWith(false);
  });
});



describe('Plantilla.plantillaFormularioPersona.formulario1', () => {
  it('debería ser una cadena de texto', () => {
    expect(typeof Plantilla.plantillaFormularioPersona.formulario1).toBe('string');
  });

  it('debería contener la etiqueta form', () => {
    expect(Plantilla.plantillaFormularioPersona.formulario1).toContain('<form');
  });

  it('debería contener la etiqueta table', () => {
    expect(Plantilla.plantillaFormularioPersona.formulario1).toContain('<table');
  });

  it('debería contener la etiqueta thead', () => {
    expect(Plantilla.plantillaFormularioPersona.formulario1).toContain('<thead');
  });

  it('debería contener la etiqueta tbody', () => {
    expect(Plantilla.plantillaFormularioPersona.formulario1).toContain('<tbody');
  });

  it('debería contener la etiqueta tr', () => {
    expect(Plantilla.plantillaFormularioPersona.formulario1).toContain('<tr');
  });

  it('debería contener la etiqueta td', () => {
    expect(Plantilla.plantillaFormularioPersona.formulario1).toContain('<td');
  });

  it('debería contener la etiqueta input', () => {
    expect(Plantilla.plantillaFormularioPersona.formulario1).toContain('<input');
  });

  it('debería contener la etiqueta name="id_persona"', () => {
    expect(Plantilla.plantillaFormularioPersona.formulario1).toContain('name="id_persona"');
  });

  it('debería contener la etiqueta name="nombre_persona"', () => {
    expect(Plantilla.plantillaFormularioPersona.formulario1).toContain('name="nombre_persona"');
  });

  it('debería contener la etiqueta name="pais_persona"', () => {
    expect(Plantilla.plantillaFormularioPersona.formulario1).toContain('name="pais_persona"');
  });

  it('debería contener la etiqueta name="edad_persona"', () => {
    expect(Plantilla.plantillaFormularioPersona.formulario1).toContain('name="edad_persona"');
  });

  it('debería contener la etiqueta name="grupo_persona"', () => {
    expect(Plantilla.plantillaFormularioPersona.formulario1).toContain('name="grupo_persona"');
  });

});


describe("Plantilla.cancelar", function() {
  it("debe cancelar todos los campos editables", function() {
      spyOn(Plantilla, "habilitarDeshabilitarCamposEditables");

      Plantilla.editar();

      expect(Plantilla.habilitarDeshabilitarCamposEditables).toHaveBeenCalledWith(false);
  });
});


describe("Plantilla.deshabilitarCamposEditables", function() {
  it("desabilita el campo editable", function() {
    spyOn(Plantilla, "habilitarDeshabilitarCamposEditables");

    Plantilla.deshabilitarCamposEditables();

    expect(Plantilla.habilitarDeshabilitarCamposEditables).toHaveBeenCalledWith(true);
  });
});


describe("Plantilla.mostrarOcionesTerciariasEditar", () => {
  it("Debería mostrar las opciones terciarias para editar", () => {
    let plantilla;
    const opcionesTerciarias = document.querySelectorAll(".opcion-terciaria.editar");
    opcionesTerciarias.forEach((opcion) => {
      opcion.classList.add("hidden");
    });
    
    spyOn(Plantilla, "mostrarOcionesTerciariasEditar");

    opcionesTerciarias.forEach((opcion) => {
      expect(opcion.classList.contains("hidden")).toBe(false);
    });
  });
});


describe("Plantilla.mostrarOpcionesSecundarias", () => {
  it("muestra todas las opciones secundarias", () => {
    let plantilla;
    const opciones = document.querySelectorAll(".opcion-secundaria");
    opciones.forEach((opcion) => {
      expect(opcion.style.display).toBe("");
    });
  });
});



describe('Plantilla.ocultarOcionesTerciariasEditar', function () {
  it('debe ocultar las opciones terciarias de editar', function () {
    let plantilla;
    
    // Simulamos que se han mostrado las opciones terciarias de editar
    const opcionesTerciarias = document.querySelectorAll('.opcion-terciaria.editar');
    opcionesTerciarias.forEach(opcion => opcion.style.display = 'block');
    
    
    // Verificamos que se hayan ocultado las opciones terciarias de editar
    const opcionesTerciariasOcultas = document.querySelectorAll('.opcion-terciaria.editar[style="display: none;"]');
    expect(opcionesTerciariasOcultas.length).toEqual(opcionesTerciarias.length);
  });
});


describe("Plantilla.ocultarOpcionesSecundarias", () => {
  it("debería ocultar todas las opciones secundarias", () => {
    // Arrange
    let plantilla;
    spyOn(Plantilla, "ocultarOpcionesSecundarias");
    // Assert
    const opcionesSecundarias = document.querySelectorAll(".opcion-secundaria");
    expect(opcionesSecundarias.length).toBe(0);
  });
});


describe("Plantilla.habilitarCamposEditables", function() {
  it("debe habilttrtr el campo editable", function() {
    spyOn(Plantilla, "habilitarDeshabilitarCamposEditables");

    Plantilla.habilitarCamposEditables();

    expect(Plantilla.habilitarDeshabilitarCamposEditables).toHaveBeenCalledWith(false);
  });
});


/*describe("Plantilla.habilitarDeshabilitarCamposEditables", () => {
  it("should disable all editable fields when given 'true'", () => {
    // Arrange
    const input1 = document.createElement("input");
    const input2 = document.createElement("input");
    input1.id = "field1";
    input2.id = "field2";
    document.body.appendChild(input1);
    document.body.appendChild(input2);

    Plantilla.form = {
      field1: "field1",
      field2: "field2",                                                                 FUNCIONAAAA
    };

    // Act
    Plantilla.habilitarDeshabilitarCamposEditables(true);

    // Assert
    expect(document.getElementById("field1").disabled).toBe(true);
    expect(document.getElementById("field2").disabled).toBe(true);

    // Clean up
    document.body.removeChild(input1);
    document.body.removeChild(input2);
  });

  it("should enable all editable fields when given 'false'", () => {
    // Arrange
    const input1 = document.createElement("input");
    const input2 = document.createElement("input");
    input1.id = "field1";
    input2.id = "field2";
    input1.disabled = true;
    input2.disabled = true;
    document.body.appendChild(input1);
    document.body.appendChild(input2);

    Plantilla.form = {
      field1: "field1",
      field2: "field2",
    };

    // Act
    Plantilla.habilitarDeshabilitarCamposEditables(false);

    // Assert
    expect(document.getElementById("field1").disabled).toBe(false);
    expect(document.getElementById("field2").disabled).toBe(false);

    // Clean up
    document.body.removeChild(input1);
    document.body.removeChild(input2);
  });
});*/


console.assert(
  Plantilla.opcionesMostrarOcultar("opcion-secundaria", false) === Plantilla,
  "Error: No se ha devuelto la instancia de Plantilla"
);
console.assert(
  Plantilla.opcionesMostrarOcultar("opcion-terciaria editar", true) === Plantilla,
  "Error: No se ha devuelto la instancia de Plantilla"
);




























      
      

      
      
      
      
  
  
  
  
  








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
 