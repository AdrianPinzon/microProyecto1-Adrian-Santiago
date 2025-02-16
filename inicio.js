'use strict';
document.getElementById("maxScore").textContent = "Max: " + maxScore
let jugar = document.getElementById("jugar");
let nombre = document.getElementById("nombre");
let puntuaciones = document.getElementById("puntuaciones");

jugar.onclick = function() {
    if (nombre.value != "") {
        localStorage.setItem("jugadorActual", nombre.value);
        console.log(localStorage.getItem("jugadorActual"));
        const usuarioGuardado = localStorage.getItem(nombre.value);
        if (usuarioGuardado === null) {
            localStorage.setItem(nombre.value, 0)
            alert("nuevo usuario")
            window.location="./try.html"
        }
        else {
            window.location="./juego.html"    
        }
    }

}

puntuaciones.onclick = function () {
    window.location = "./record.html"
}
