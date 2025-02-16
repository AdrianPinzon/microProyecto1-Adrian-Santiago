"use strict";
// estas son las listas que se va a usar en el juego
var listaColoresBase = ["amarillo", "azul", "rojo", "verde"]; //de aqui es donde se agarran los colores al azar
var listaColoresJuego = ["amarillo", "azul", "rojo", "verde"]; //aqui es donde se van poniendo esos colores escojidos al azar
var listaAcertados = [];
let listaPuntuaciones = []
let listaPersonas = []
localStorage.removeItem("listaPersonas")
localStorage.removeItem("listaPuntuaciones")

 // esta lleva registro de los clicks que hace el jugador para comparar con la de arriba y determinar cuando pierde
let r = 0; // esto es una variable que uso en una funcion, no se por que la defini afuera
function desactivarBotones() {
  let botones = [azul, amarillo, verde, rojo];
  let displayBotones = [
    azulDisplay,
    amarilloDisplay,
    verdeDisplay,
    rojoDisplay,
  ];

  botones.forEach((btn) => (btn.style.display = "none"));
  displayBotones.forEach((btn) => (btn.style.display = "initial"));

  console.log("Botones desactivados");
}

function activarBotones() {
  let botones = [azul, amarillo, verde, rojo];
  let displayBotones = [
    azulDisplay,
    amarilloDisplay,
    verdeDisplay,
    rojoDisplay,
  ];

  displayBotones.forEach((btn) => (btn.style.display = "none"));
  botones.forEach((btn) => (btn.style.display = "initial"));

  console.log("Botones Activados");
}

/*function activarBotones() {
//  azulDisplay.style.display = "none";
//  azul.style.display = "initial";
//  rojoDisplay.style.display = "none";
  rojo.style.display = "initial";
  amarilloDisplay.style.display = "none";
  amarillo.style.display = "initial";
  verdeDisplay.style.display = "none";
  verde.style.display = "initial";
  console.log("Botones Activados");
  setTimeout(() => {
    //ESTOS SON LOS PUTOS TIMEOUTS QUE NO FUNCIONAN... Este y otros mas
    console.log("wait...");
  }, "1000");
}*/

function patronColores() {
  // Desactivar botones funcionales y activar los de animación
  desactivarBotones();

  // Agregar un nuevo color aleatorio a la secuencia
  let r = Math.floor(Math.random() * 4);
  listaColoresJuego.push(listaColoresBase[r]);

  console.log("Nueva secuencia:", listaColoresJuego);

  // Iterar sobre la lista con retraso progresivo para mostrar los colores secuencialmente
  listaColoresJuego.forEach((color, index) => {
    setTimeout(() => {
      console.log(color.toUpperCase());

      if (color === "azul") {
        pressAzul();
        playAzul();
      } else if (color === "rojo") {
        pressRojo();
        playRojo();
      } else if (color === "amarillo") {
        pressAmarillo();
        playAmarillo();
      } else {
        pressVerde();
        playVerde();
      }

      // Si es la última iteración, activar los botones funcionales después de un pequeño retraso
      if (index === listaColoresJuego.length - 1) {
        setTimeout(() => {
          activarBotones();
          listaAcertados = []; // Reiniciar lista de aciertos para que el jugador vuelva a ingresar la secuencia desde el inicio
        }, 1000);
      }
    }, index * 1000); // Se retrasa cada iteración en múltiplos de 1000ms (1 segundo)
  });
}

function jugar() {
  let currentIndex = listaAcertados.length - 1; // Última posición ingresada por el jugador

  if (listaAcertados[currentIndex] === listaColoresJuego[currentIndex]) {
    console.log("Correcto!");
    
    // Si el jugador completó toda la secuencia correctamente, se inicia una nueva ronda
    if (listaAcertados.length === listaColoresJuego.length) {
        currentScore.innerText = listaColoresJuego.length; 
      setTimeout(() => {
        patronColores(); // Iniciar nueva ronda
      }, 1500);
    }
  } else {
    console.log("Incorrecto! Juego terminado.");

    playError(); 
    let jugadorActual = localStorage.getItem("jugadorActual")
    let maxPuntuacion = localStorage.getItem(jugadorActual)

    if (listaColoresJuego.length > maxPuntuacion) {
        localStorage.setItem(jugadorActual, listaColoresJuego.length)
        let mensajeFinal = document.getElementById("mensajeFinal")
        mensajeFinal.innerText = "¡FELICITACIONES!";
        /*
        let persona = {
            "nombre": localStorage.getItem("jugadorActual"),
            "puntuacion": listaColoresJuego.length - 1
        }
        if (localStorage.getItem("listaPuntuaciones") === null) {
            console.log("perdimos")
            localStorage.setItem("listaPuntuaciones", JSON.stringify(listaPuntuaciones))
            
        }

        if (localStorage.getItem("listaPersonas") === null ) {

            localStorage.setItem("listaPersonas", JSON.stringify(listaPersonas))
            
        }
        let listaPe = JSON.parse(localStorage.getItem("listaPuntuaciones"));
        let listaPu = JSON.parse(localStorage.getItem("listaPuntuaciones"));


        
        if (listaPe.includes(localStorage.getItem("jugadorActual"))) {
            let i = listaPe.indexOf(localStorage.getItem("jugadorActual"));
            listaPu[i] = (listaColoresJuego.length - 1);
        } else {
            listaPu.push(listaColoresJuego.length - 1) 
            listaPe.push(localStorage.getItem("jugadorActual"));
        } 
        console.log(listaPe.length)
        console.log(listaPu.length)*/
    } 
    else {
        let mensajeFinal = document.getElementById("mensajeFinal")
        mensajeFinal.innerText = "¡Perdiste!";
    }
    mostrarGameOver(); // Mostrar pantalla de Game Over
  }
}

function mostrarGameOver() {
    let finalJuego = document.getElementById("finalJuego");
    let finalScore = document.getElementById("finalScore");
    let overlay = document.getElementById("overlay");
  
    
    finalScore.innerText = "Puntaje: " + (listaColoresJuego.length - 1);
    finalJuego.style.display = "block";
    overlay.style.display = "initial" // Mostrar pantalla de finalización
  
    // Reiniciar juego
    listaColoresJuego = [];
    listaAcertados = [];
  }

//estas son funciones de sonido
function playAzul() {
  var sound = document.getElementById("azulSonido");
  sound.play();
}
function playVerde() {
  var sound = document.getElementById("verdeSonido");
  sound.play();
}
function playRojo() {
  var sound = document.getElementById("rojoSonido");
  sound.play();
}
function playAmarillo() {
  var sound = document.getElementById("amarilloSonido");
  sound.play();
}
function playError() {
    var sound = document.getElementById("error");
    sound.play();
  }
  
  //aquí me traigo a todos los botones del html
  
  var azul = document.getElementById("azul");
  var azulDisplay = document.getElementById("azulDisplay");
  var azulNeonDisplay = document.getElementById("azulNeonDisplay");
  var verde = document.getElementById("verde");
  var verdeDisplay = document.getElementById("verdeDisplay");
  var verdeNeonDisplay = document.getElementById("verdeNeonDisplay");
  var rojo = document.getElementById("rojo");
  var rojoDisplay = document.getElementById("rojoDisplay");
  var rojoNeonDisplay = document.getElementById("rojoNeonDisplay");
  var amarillo = document.getElementById("amarillo");
  var amarilloDisplay = document.getElementById("amarilloDisplay");
  var amarilloNeonDisplay = document.getElementById("amarilloNeonDisplay");
  var menu = document.getElementById("menu");
  var record = document.getElementById("record")
  var volverJugar = document.getElementById("volverJugar")
  let currentScore = document.getElementById('currentScore')
  var go = document.getElementById("comenzar");
  
  // aqui coloco el estado inicial de los botones, que al principio no pueden estar los interactivos
  
  azul.style.display = "none";
  azulNeonDisplay.style.display = "none";
  amarillo.style.display = "none";
  amarilloNeonDisplay.style.display = "none";
  verde.style.display = "none";
  verdeNeonDisplay.style.display = "none";
  rojo.style.display = "none";
  rojoNeonDisplay.style.display = "none";
  
  //estas son las funciones que imitan el click y aqui sí me funcionan los timeouts no se por qué
  
  function pressAzul() {
    azulDisplay.style.display = "none";
    azulNeonDisplay.style.display = "initial";
    setTimeout(() => {
      azulDisplay.style.display = "initial";
      azulNeonDisplay.style.display = "none";
    }, "400");
  }
  
  function pressRojo() {
    rojoDisplay.style.display = "none";
    rojoNeonDisplay.style.display = "initial";
    setTimeout(() => {
      rojoDisplay.style.display = "initial";
      rojoNeonDisplay.style.display = "none";
    }, "400");
  }
  
  function pressAmarillo() {
    amarilloDisplay.style.display = "none";
    amarilloNeonDisplay.style.display = "initial";
    setTimeout(() => {
      amarilloDisplay.style.display = "initial";
      amarilloNeonDisplay.style.display = "none";
    }, "400");
  }
  
  function pressVerde() {
    verdeDisplay.style.display = "none";
    verdeNeonDisplay.style.display = "initial";
    setTimeout(() => {
      verdeDisplay.style.display = "initial";
      verdeNeonDisplay.style.display = "none";
    }, "400");
  }
  
  // Y en esta parte hago las acciones de cuando se presionan los botones
  
 
  
  azul.onclick = function () {
    listaAcertados.push("azul");
    playAzul();
    jugar(); // Verificar si la secuencia es correcta
  };
  
  verde.onclick = function () {
    listaAcertados.push("verde");
    playVerde();
    jugar();
  };
  
  amarillo.onclick = function () {
    listaAcertados.push("amarillo");
    playAmarillo();
    jugar();
  };
  
  rojo.onclick = function () {
    listaAcertados.push("rojo");
    playRojo();
    jugar();
  };
  
  go.onclick = function () {
    currentScore.innerText = 0
    listaColoresJuego = []; // Reiniciar lista de colores
    listaAcertados = []; // Reiniciar lista de aciertos
    patronColores(); // Comenzar el juego
  };
  
  menu.onclick = function () {
    window.location = "./index.html"
  }

  record.onclick = function () {
    window.location = "./record.html"
  }

  volverJugar.onclick = function () {
    let finalScore = document.getElementById("finalScore");
    let overlay = document.getElementById("overlay");
  
    
    
    finalJuego.style.display = "none";
    overlay.style.display = "none" // Mostrar pantalla de finalización
  
    // Reiniciar juego
    desactivarBotones()
    listaColoresJuego = [];
    listaAcertados = [];
    currentScore.innerText = 0;
  }

  var finalJuego = document.getElementById("finalJuego");
  finalJuego.style.display = "none";
  console.log(listaColoresJuego[0] + listaColoresJuego[1]);
