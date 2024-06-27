// Inicialización de variables
let uncoverCards = 0;
let card1 = null;
let card2 = null;
let firstResult = null;
let secondResult = null;
let moves = 0;
let succes = 0;
let timer = false;
let timerValue = 30;
let initialTimer = 30;
let timeReverse = null;

let winAudio = new Audio('./sounds/win.wav');
let loseAudio = new Audio('./sounds/lose.wav');
let clickAudio = new Audio('./sounds/click.wav');
let rightAudio = new Audio('./sounds/right.wav');
let wrongAudio = new Audio('./sounds/wrong.wav');

// Apuntando a documento HTML
let showMoves = document.getElementById('moves');
let showSucces = document.getElementById('succes');
let showTime = document.getElementById('time-left');

// Generación de numeros aleatorios
let numbers = [1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8];
numbers = numbers.sort(() => Math.random() - 0.5);
console.log(numbers);

// Función principal
function uncover(id) {
    if (!timer) {
        timeCounter();
        timer = true;
    }

    uncoverCards++;

    if (uncoverCards === 1) {
        // Mostrar primer numero
        card1 = document.getElementById(`btn-${id}`);
        firstResult = numbers[id];
        card1.innerHTML = `<img src="images/${firstResult}.png" alt="Image ${firstResult}">`;
        clickAudio.play();
        // Deshabilitar el primer botón
        card1.disabled = true;
    } else if (uncoverCards === 2) {
        // Mostrar segundo numero
        card2 = document.getElementById(`btn-${id}`);
        secondResult = numbers[id];
        card2.innerHTML = `<img src="images/${secondResult}.png" alt="Image ${secondResult}">`;
        // Deshabilitar el segundo botón
        card2.disabled = true;

        // Incrementar movimientos
        moves++;
        showMoves.innerHTML = `Movimientos: ${moves}`;

        // Verificar si las cartas coinciden
        if (firstResult === secondResult) {
            // Encerar contador de tarjetas destapadas
            uncoverCards = 0;
            // Aumentar aciertos
            succes++;
            showSucces.innerHTML = `Aciertos: ${succes}`;
            rightAudio.play();      

            if (succes === 8) {
                clearInterval(timeReverse);
                showSucces.innerHTML = `Aciertos: ${succes} 🏆`;
                showTime.innerHTML = `Genial! Solo demoraste ${initialTimer - timerValue} segundos`;
                showMoves.innerHTML = `Movimientos: ${moves} 👌`;
                winAudio.play();
            }
        } else {
            // Mostrar momentáneamente valores y volver a tapar
            setTimeout(() => {
                card1.innerHTML = '';
                card2.innerHTML = '';
                card1.disabled = false;
                card2.disabled = false;
                uncoverCards = 0;
                wrongAudio.play();
            }, 800);
        }
    }
}

// Funciones secundarias
// Temporizador
function timeCounter() {
    timeReverse = setInterval(() => {
        timerValue--;
        showTime.innerHTML = `Tiempo: ${timerValue} segundos`;
        if (timerValue === 0) {
            clearInterval(timeReverse);
            cardBlock();
        }
    }, 1000);
}

function cardBlock() {
    for (let i = 0; i <= 16; i++) {
        let cardBlock = document.getElementById(`btn-${i}`);
        cardBlock.innerHTML = `<img src="images/${numbers[i]}.png" alt="Image ${numbers[i]}">`;
        cardBlock.disabled = true;
        loseAudio.play();
    }
}