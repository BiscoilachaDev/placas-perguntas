const cardCount = document.getElementById("cardCount");
const answersContainer = document.getElementById("answersContainer");

let seconds = 180;
let timerStarted = false;
let realQuestion = "";

/* ========================= */
/* GERAR CAMPOS DAS PLACAS */
/* ========================= */

function generateFields(){

    let quantity =
        parseInt(cardCount.value) || 1;

    quantity =
        Math.max(
            1,
            Math.min(10, quantity)
        );

    cardCount.value = quantity;

    answersContainer.innerHTML = "";

    for(let i = 1; i <= quantity; i++){

        const label =
            document.createElement("label");

        label.textContent =
            `Placa ${i}`;

        const input =
            document.createElement("input");

        input.className = "answer";

        input.placeholder =
            `Texto da placa ${i}`;

        answersContainer.appendChild(label);
        answersContainer.appendChild(input);

    }

}

generateFields();

/* ========================= */
/* TIMER */
/* ========================= */

function updateTimer(){

    const min =
        Math.floor(seconds / 60);

    const sec =
        String(seconds % 60)
        .padStart(2, "0");

    document.getElementById("timer").textContent =
        `${min}:${sec}`;

}

/* ========================= */
/* CRIAR QUIZ */
/* ========================= */

function startGame(){

    timerStarted = false;

    const questionNumber =
        document.getElementById("questionNumber").value;

    realQuestion =
        document.getElementById("questionInput").value;

    document.getElementById("questionTag").textContent =
        "#" +
        String(questionNumber)
        .padStart(2, "0");

    document.getElementById("question").textContent = "";

    const minutes =
        Number(
            document.getElementById("minutesInput").value
        ) || 3;

    seconds = minutes * 60;

    updateTimer();

    const cardsContainer =
        document.getElementById("cards");

    cardsContainer.innerHTML = "";

    const answers =
        [...document.querySelectorAll(".answer")]
        .map(input => input.value.trim());

    answers.forEach((answer, index) => {

        const card =
            document.createElement("div");

        card.className = "card";

        if(
            answers.length % 2 === 1 &&
            index === answers.length - 1
        ){
            card.classList.add("last-card");
        }

        card.innerHTML = `
            <div class="card-inner">

                <div class="front">
                    ???
                </div>

                <div class="back">
                    ${answer || "(vazio)"}
                </div>

            </div>
        `;

        card.addEventListener("click", () => {

            card.classList.toggle("flipped");

        });

        cardsContainer.appendChild(card);

    });

    document.getElementById("setup").style.display =
        "none";

    document.getElementById("game").style.display =
        "block";

    document.getElementById("startTimerBtn").style.display =
        "block";

}

/* ========================= */
/* INICIAR TIMER */
/* ========================= */

document
.getElementById("startTimerBtn")
.addEventListener("click", () => {

    if(timerStarted) return;

    timerStarted = true;

    document.getElementById("question").textContent =
        realQuestion;

    document.getElementById("startTimerBtn").style.display =
        "none";

    const interval =
        setInterval(() => {

            if(seconds <= 0){

                clearInterval(interval);

                return;

            }

            seconds--;

            updateTimer();

        }, 1000);

});

/* ========================= */
/* BOTÕES + E - */
/* ========================= */

document
.querySelectorAll(".number-control")
.forEach(control => {

    const input =
        control.querySelector("input");

    const minus =
        control.querySelector(".minus");

    const plus =
        control.querySelector(".plus");

    minus.addEventListener("click", () => {

        let value =
            Number(input.value);

        if(input.id === "questionNumber"){

            value = Math.max(
                1,
                value - 1
            );

        }

        else if(input.id === "minutesInput"){

            value = Math.max(
                1,
                value - 1
            );

        }

        else if(input.id === "cardCount"){

            value = Math.max(
                1,
                value - 1
            );

            cardCount.value = value;

            generateFields();

        }

        input.value = value;

    });

    plus.addEventListener("click", () => {

        let value =
            Number(input.value);

        if(input.id === "questionNumber"){

            value++;

        }

        else if(input.id === "minutesInput"){

            value = Math.min(
                60,
                value + 1
            );

        }

        else if(input.id === "cardCount"){

            value = Math.min(
                10,
                value + 1
            );

            cardCount.value = value;

            generateFields();

        }

        input.value = value;

    });

});