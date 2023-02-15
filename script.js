document.getElementById("letra-input").style.display = "none";
document.getElementById("boton-checar-palabra").style.display = "none";

// Definimos una lista de palabras
let listaDePalabras = ["CONEJO", "PERRO", "GATO", "CABALLO", "ELEFANTE", "GALLINA", "JIRAFA", "CAPIBARA", "COCODRILO", "HIPOPOTAMO", "PATO"];

// Seleccionamos una palabra aleatoria de la lista
let palabraSeleccionada = listaDePalabras[Math.floor(Math.random() * listaDePalabras.length)];

// Creamos una lista para almacenar las letras correctas
let letrasCorrectas = [];
for (let i = 0; i < palabraSeleccionada
.length; i++) {
    letrasCorrectas[i] = "_";
}

let intentosDisponibles = 7;

// Creamos una lista para almacenar las letras incorrectas
let letrasIncorrectas = [];

// Comprobamos si la letra ingresada se encuentra en la palabra seleccionada
function checarLetra(letra) {
    let letraEnPalabra = false;
    for (let i = 0; i < palabraSeleccionada.length; i++) {
        if (palabraSeleccionada[i] === letra) {
            letraEnPalabra = true;
            letrasCorrectas[i] = letra;
        }
    }
    if (!letraEnPalabra) {
        if (letrasIncorrectas.includes(letra)) {
            document.getElementById("alerta").innerHTML = "Ya habías ingresado la letra " + letra + ". Intenta con otra.";
            return;
        }
        letrasIncorrectas.push(letra);
        intentosDisponibles--;
        document.getElementById("alerta").innerHTML = "Fallaste! Vamos! Aún tienes " + intentosDisponibles + " oportunidades!";
    } else {
        document.getElementById("alerta").innerHTML = "Excelente! Acertaste!";
    }
}
//Dibujamos en canvas la base de la horca
var pantalla = document.querySelector("canvas");
var pincel = pantalla.getContext("2d");
pincel.clearRect(0, 0, 400, 400);
pincel.fillRect(50, 350, 300, 40);
pincel.fillRect(150, 50, 20, 300);
pincel.fillRect(150, 50, 200, 20);


// Comprobamos si el juego ha sido ganado o perdido
function checkGameStatus() {
    if (letrasCorrectas.join("") === palabraSeleccionada
) {
        document.getElementById("alerta").innerHTML = "Felicidades! Salvaste al monito!"
        document.getElementById("boton-checar-palabra").style.display = "none";
        document.getElementById("letra-input").style.display = "none";
        document.getElementById("boton-start-game").style.display = "inline-block";
        document.getElementById("palabra-input").style.display = "inline-block";
        document.getElementById("boton-agregar-palabra").style.display = "inline-block";
        document.getElementById("instrucciones").style.display = "inline-block";
    } else if (intentosDisponibles <= 0) {
        document.getElementById("alerta").innerHTML = "Has Perdido :( La palabra era: " + palabraSeleccionada + " Has ahorcado al monito ;(";
        document.getElementById("boton-checar-palabra").style.display = "none";
        document.getElementById("letra-input").style.display = "none";
        document.getElementById("boton-start-game").style.display = "inline-block";
        document.getElementById("palabra-input").style.display = "inline-block";
        document.getElementById("boton-agregar-palabra").style.display = "inline-block";
        document.getElementById("instrucciones").style.display = "inline-block";
    }
}

// Agrega una palabra a la lista
function agregarPalabra(palabra) {
    listaDePalabras.push(palabra.toUpperCase());
}

// Iniciamos el juego al hacer clic en el botón "Iniciar juego"
document.getElementById("boton-start-game").addEventListener("click", function () {
    console.log("Juego iniciado");
    pincel.clearRect(0, 0, canvas.width, canvas.height);
    pincel.clearRect(0, 0, 400, 400);
    pincel.fillRect(50, 350, 300, 40);
    pincel.fillRect(150, 50, 20, 300);
    pincel.fillRect(150, 50, 200, 20);
    document.getElementById("alerta").innerHTML = "Has iniciado el Juego, éxito!"
    intentosDisponibles = 7;
    document.getElementById("titulo").style.display = "none";
    document.getElementById("letra-input").style.display = "inline-block";
    document.getElementById("boton-checar-palabra").style.display = "inline-block";
    document.getElementById("instrucciones").style.display = "none";
    document.getElementById("boton-start-game").style.display = "none";
    document.getElementById("palabra-input").style.display = "none";
    document.getElementById("boton-agregar-palabra").style.display = "none";
    // Inicializamos la palabra seleccionada y las listas de letras correctas e incorrectas
    palabraSeleccionada = listaDePalabras[Math.floor(Math.random() * listaDePalabras.length)];
    console.log("Palabra seleccionada: " + palabraSeleccionada
    );
    dibujoCanvas();
    letrasCorrectas = [];
    for (let i = 0; i < palabraSeleccionada
    .length; i++) {
        letrasCorrectas[i] = "_";
    }
    letrasIncorrectas = [];
    const incorrecto = document.querySelector('#letras-incorrectas');
    incorrecto.innerHTML = letrasIncorrectas;
    console.log("Letras incorrectas " + incorrecto);

    
    // const intentos = document.querySelector('#intentos');

    // Mostramos la palabra con guiones en la pantalla
    document.getElementById("palabra").innerHTML = letrasCorrectas.join(" ");

});

// Agregamos una palabra al hacer clic en el botón "Agregar palabra"
document.getElementById("boton-agregar-palabra").addEventListener("click", function () {
    let palabra = document.getElementById("palabra-input").value;
    if (palabra == "") {
        document.getElementById("alerta").innerHTML = "Para agregar una palabra nueva es Necesario que escribas una palabra!"
    }
    else {
        agregarPalabra(palabra);
        document.getElementById("alerta").innerHTML = "Se ha agregado la palabra: " + palabra;
        console.log("Se ha agregado: " + document.getElementById("palabra-input").value);
        console.log("Las palabras disponibles ahora son: " + listaDePalabras);
        document.getElementById("palabra-input").value = "";
    }
});

// Verificamos la letra ingresada al hacer clic en el botón "Verificar"
document.getElementById("boton-checar-palabra").addEventListener("click", function () {
    let letra = document.getElementById("letra-input").value.toUpperCase();
    if (letra == "") {
        document.getElementById("alerta").innerHTML = "Introduce una letra"
    }
    else {
        checarLetra(letra);
        dibujoCanvas();
        checkGameStatus();

        // Mostramos la palabra con guiones y letras correctas en la pantalla
        document.getElementById("palabra").innerHTML = letrasCorrectas.join(" ");

        // Mostramos las letras incorrectas en la pantalla
        document.getElementById("letras-incorrectas").innerHTML = "Letras incorrectas introducidas: " + letrasIncorrectas.join(" + ");
        console.log("Letras incorrectas introducidas: " + letrasIncorrectas.join(" "));

        // Mostramos el número de intentos restantes en la pantalla
        document.getElementById("intentos").innerHTML = "Intentos Restantes: " + intentosDisponibles;

        // Limpiamos el input
        document.getElementById("letra-input").value = "";
    }
});

function dibujoCanvas() {
    if (intentosDisponibles < 7) {
        // Dibujamos el lazo
        pincel.beginPath();
        pincel.moveTo(250, 70);
        pincel.lineTo(250, 150);
        pincel.lineWidth = 3;
        pincel.stroke();
    }

    if (intentosDisponibles < 6) {
        // Dibujamos la Cabeza
        pincel.fillStyle = "black";
        pincel.beginPath();
        pincel.arc(250, 125, 25, 0, 2 * Math.PI);
        pincel.fill();
    }
    if (intentosDisponibles < 5) {
        // Dibujamos la Mano Izquierda
        pincel.beginPath();
        pincel.moveTo(250, 150);
        pincel.lineTo(235, 180);
        pincel.lineWidth = 3;
        pincel.stroke();
    }
    if (intentosDisponibles < 4) {
        // Dibujamos la Mano Derecha
        pincel.beginPath();
        pincel.moveTo(250, 150);
        pincel.lineTo(265, 180);
        pincel.lineWidth = 3;
        pincel.stroke();
    }
    if (intentosDisponibles < 3) {
        // Dibujamos el Tronco
        pincel.beginPath();
        pincel.moveTo(250, 150);
        pincel.lineTo(250, 225);
        pincel.lineWidth = 3;
        pincel.stroke();
    }
    if (intentosDisponibles < 2) {
        // Dibujamos la Pierna Izquierda
        pincel.beginPath();
        pincel.moveTo(250, 225);
        pincel.lineTo(225, 280);
        pincel.lineWidth = 3;
        pincel.stroke();
    }
    if (intentosDisponibles < 1) {
        // Dibujamos la Pierna Derecha
        pincel.beginPath();
        pincel.moveTo(250, 225);
        pincel.lineTo(275, 280);
        pincel.lineWidth = 3;
        pincel.stroke();
    }
};