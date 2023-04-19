## Práctica 3 Javier Martínez López
* **Nombre:**

  Javier Martínez López

* **Dirección de correo electrónico:**

  jml00059@red.ujaen.es

* **Tablero de Trello:**

    https://trello.com/b/YjYro0ci/pr%C3%A1ctica-3
    
* **HU realizadas:**

    He realizado 3 incrementos distribuidos de manera:
    
    *Incremento 1*
    
        HU1 -> Ver la información del autor/autora de la aplicación al pulsar en el botón “Acerca de”

        HU2 -> Ver un listado solo con los nombres de todos los jugadores/equipos

        HU4 -> Ver un listado con todos los datos de todos los jugadores/equipos

    *Incremento 2*

        HU3 -> Ver un listado solo con los nombres de todos los jugadores/equipos ordenados alfabéticamente

        HU6 -> Ver todos los datos de un determinado jugador/equipo

        HU12 -> Modificar el nombre de un jugador/equipo

    *Incremento 3*
    
        HU8 -> Ver un listado de todos los datos de jugadores/equipos cuyo nombre cumple con un criterio de búsqueda indicado por el usuario

        HU10 -> Ver un listado de todos los datos de jugadores/equipos que cumplen simultáneamente con varios criterios de búsqueda indicados por el usuario para algunos de sus campos. Se deberá poder buscar al menos por 3 campos distintos (además del nombre)

        HU13 -> Modificar varios de los datos a la vez de un jugador/equipo.   Se deberán poder modificar al menos 3 campos además del nombre

* **Tablero de Trello antes:**

    <img src='./img/Inicio_Trello.jpg'>  

* **Tablero de Trello después:**

    <img src='./img/final_trello.jpg'>  
    
* **Home de Fauna:**

    <img src='./img/home_fauna.jpg'>  

* **Pagina colección de Fauna:**

    <img src='./img/pagina_fauna.jpg'>  

* **Base de datos de Fauna:**

    <img src='./img/basedatos.jpg'>  

* **Datos de la base de datos de Fauna:**

    <img src='./img/datosb.jpg'>  

* **Documentos creados en la colección:**

    [Documentos creados en la coleccion](coleccion.json)

## Incremento 1
Como he mencionado anteriormente,el incremento 1 constará de:
* **HU1**
    <img src='./img/HU1 Trello.jpg'> 
    
    <img src='./img/HU1.jpg'> 

    En ms-plantilla -> callbacks.js he modificado:

    <img src='./img/HU1 codigo.jpg'> 

* **HU2**
    <img src='./img/HU2 Trello.jpg'> 
    
    <img src='./img/HU2.jpg'> 

    Primero,en el ms-plantilla.js implemento:
    <img src='./img/HU2 1.jpg'> 

    <img src='./img/HU2 11.jpg'> 

    <img src='./img/imprime.jpg'> 
    
    Y en ms-plantilla -> callbacks.js
    <img src='./img/HU2 111.jpg'> 

    Por último, en el index.html, declaro la etiqueta para llamar a la función:
    <img src='./img/HU2 2.jpg'> 

* **HU4**
    <img src='./img/HU4 Trello.jpg'>
    
    <img src='./img/HU4 bien.jpg'>

    Como antes, en el ms-plantilla implemento:
    <img src='./img/HU4 1.jpg'>

    <img src='./img/HU4 11.jpg'>

    <img src='./img/imprime.jpg'> 

    Por último, en el index.html, declaro la etiqueta para llamar a la función:
    <img src='./img/HU4 2.jpg'> 


## Incremento 2

Como he mencionado anteriormente, el incremento 2 constará de:
* **HU3**
    <img src='./img/HU3 Trello.jpg'> 

    <img src='./img/HU3 1.jpg'> 

    Como antes, en el ms-plantilla implemento:
    <img src='./img/HU3 111.jpg'> 

    <img src='./img/HU3 1111.jpg'> 

    <img src='./img/imprime.jpg'> 

    Por último, en el index.html, declaro la etiqueta para llamar a la función:
    <img src='./img/HU3 11.jpg'> 

* **HU6**
    <img src='./img/HU6 Trello.jpg'> 

    <img src='./img/HU6 1.jpg'> 

    Como antes, en el ms-plantilla implemento:
    <img src='./img/HU6 11.jpg'>

    <img src='./img/HU6 111.jpg'>

    <img src='./img/imprime.jpg'> 

    Por último, en el index.html, declaro la etiqueta para llamar a la función:
    <img src='./img/HU6 2.jpg'>

* **HU12**
    <img src='./img/HU12.jpg'>

    <img src='./img/HU12 cod1.jpg'>

    <img src='./img/HU12 cod2.jpg'>

    Modifico el nombre de Manuel José Duran por otro.
    
    El país si lo modifico, no se guarda. No lo tengo implementado en guardar(), que a su vez llamará al callbacks.setTodo para modificar sólo el nombre. Posteriormente sí lo añadiré para poder modificar más campos

    <img src='./img/HU12 cod3.jpg'>

    <img src='./img/HU12 cod4.jpg'>

    Vemos como se cambia en fauna
    <img src='./img/HU12 fauna.jpg'>

    En el ms-plantilla he implementado las funciones de recupera, listar2 e imprime.
    <img src='./img/imprimeMuchasPersonas.jpg'>

    <img src='./img/HU12 actualiza.jpg'>

    Formulario donde se encuentra la tabla y la funcionalidad de mostar y editar
    <img src='./img/HU13 3.jpg'>

    Comentados el resto para que modifique sólo el nombre
    <img src='./img/HU12 sustituye.jpg'>

    <img src='./img/HU12 guardar.jpg'>

    En el callbacks implemento:
    <img src='./img/HU12 set.jpg'>

    Por último, en el index:
    <img src='./img/HU12 index.jpg'>


## Incremento 3

Como he mencionado antes, el incremento 3 constará de:
* **HU8**
    <img src='./img/HU8 Trello.jpg'>

    <img src='./img/HU8 1 antes.jpg'>

    Introduzco un nombre del listado de participantes y pincho en buscar
    <img src='./img/HU8 1 antes 1.jpg'>

    <img src='./img/HU8 1.jpg'>

    Como antes, en el ms-plantilla implemento:
    <img src='./img/HU8 cod 1.jpg'>

    <img src='./img/HU8 cod 2.jpg'>

    Y en el index el formulario que llame a ambas funciones:
    <img src='./img/HU8 index.jpg'>

* **HU10**
    <img src='./img/HU10 Trello.jpg'>

    Introducimos un nombre,edad,pais y grupo de un jugador y le damos a buscar
    <img src='./img/HU10 1.jpg'>

    Como antes, en el ms-plantilla implemento:
    <img src='./img/HU10 11.jpg'>

    Y en el index, el formulario que llama a ambas funciones:
    <img src='./img/HU10 2.jpg'>

* **HU13**
    <img src='./img/HU13.jpg'>

    <img src='./img/HU12 cod1.jpg'>

    <img src='./img/HU13 1.jpg'>

    Modificaremos el nombre por otro y el país lo cambiaremos a Austria y la edad a 27
    <img src='./img/HU13 11.jpg'>

    <img src='./img/HU13 111.jpg'>

    Como podemos ver, se guarda en fauna cuando muestro el listado de todos los participantes
    <img src='./img/HU13 2.jpg'>

     En el ms-plantilla he implementado las funciones de recupera, listar2 e imprime.
    <img src='./img/imprimeMuchasPersonas.jpg'>

    <img src='./img/HU12 actualiza.jpg'>

    <img src='./img/HU13 sust.jpg'>

    Formulario donde se encuentra la tabla y la funcionalidad de mostar y editar
    <img src='./img/HU13 3.jpg'>

    En el callbacks.js para moder modificar los campos nombre,pais,edad,grupo
    <img src='./img/HU13 4.jpg'>

    Lo mismo para guardarlos
    <img src='./img/HU13 5.jpg'>