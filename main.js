const questionText = document.querySelector(".question-text");
const optionBox = document.querySelector(".option-box");
const currentQuestionNum = document.querySelector(".current-question-num");
const answerDescription = document.querySelector(".answer-description");
const nextQuestionBtn = document.querySelector(".next-question-btn");
const correctAnswers = document.querySelector(".correct-answers");
const seeResultBtn = document.querySelector(".see-result-btn");
const remainingTime = document.querySelector(".remaining-time");
const timeUpText = document.querySelector(".time-up-text");
const quizHomeBox = document.querySelector(".quiz-home-box");
const quizBox = document.querySelector(".quiz-box");
const quizOverBox = document.querySelector(".quiz-over-box");
const startAgainQuizBtn = document.querySelector(".start-again-quiz-btn");
const goHomeBtn = document.querySelector(".go-home-btn");
const categoryBox = document.querySelector(".category-box");
const categoryText = document.querySelector(".category-text");
// const startQuizBtn=document.querySelector(".start-quiz-btn");
let attempt = 0;
let questionIndex = 0;
let score = 0;
let number = 0;
let myArray = [];
let interval;
let categoryIndex;

// questions and options and  answer.
// array of objects
myApp = [
    {
        category: " About Bangladesh",
        quizWrap: [
            {
                question: "In what year Bangladesh became Independent?",
                options: ["1971", "1872", "1953", "1657"],
                answer: 0,
            },
            {
                question: "What is the capital city in Bangladesh?",
                options: ["Dhaka", "Bogra", "chittagong", "Rajshahi"],
                answer: 0,

            },
            {
                question: "what is the national flower of Bangladesh?",
                options: ["rose", "water lily", "tulip", "sun flower"],
                answer: 1,
            },
            {
                question: "what is the main reigion practiced in Bangladesh?",
                options: ["Hindu", "Islam", "Buddism", "Christianism"],
                answer: 1,

            },
            {
                question: "In which continent is Bangladesh located?",
                options: ["Africa", "Asia", "North America", "South America"],
                answer: 1,
            }
        ]
    },

    {
        category: "Sports in Bangladesh",
        quizWrap: [
            {
                question: "whats the national sports in Bangladesh?",
                options: ["Kabadi", "Badminton", "Cricket", "Basketball"],
                answer: 0,
            },
            {
                question: "Whats the most popular sports in Bangladesh?",
                options: ["Badminton", "Cricket", "vollyBall", "BasketBall"],
                answer: 1,

            },
            {
                question: "How many nations participate in the 2014 kabaddi world cup?",
                options: ["12", "10", "11", "17"],
                answer: 2,
            },
            {
                question: "In cricket how many players play in each team ?",
                options: ["11", "9", "21", "20"],
                answer: 0,
            }
        ]
    },

    {
        category: "About Pennsylvania",
        quizWrap: [
            {
                question: "Whats the capital city of Pennsylvania?",
                options: ["Philadelphia", "Pittsburg", "Harrisburg", "Doylestown"],
                answer: 2,
            },
            {
                question: "What is the nickname of pennsylvania?",
                options: ["Garden state", "Empire state", "keystone state", "sunshine state"],
                answer: 2,
            },
            {
                question: "What is Pennsylvania's population in 2019?",
                options: ["12 milliom", "20 million", "5 million", "200k"],
                answer: 0,
            },
            {
                question: "Who is the Governor of pennsylvania ?",
                options: ["Tom Wolf", "Tony", "Anthony B", "Josh .H"],
                answer: 0,
            }
            ,
            {
                question: "Whats the median Household income?",
                options: ["30k", "80k", "60k", "100k"],
                answer: 2,
            }
        ]
    },

    {
        category: "Sports",
        quizWrap: [
            {
                question: "When was the first Common Wealth Games held?",
                options: ["1930", "1934", "1938", "1948"],
                answer: 0
            },
            {
                question: "In which sports is the participant called pugilist?",
                options: ["Sprinter", "Boxing", "Wrestling", "Javelin"],
                answer: 1,
            },
            {
                question: "In which game the term ‘Putting’ is used?",
                options: ["Chess", "Hocanswer", "Golf", "Billiards"],
                answer: 2
            },
            {
                question: "Which team is Tom Brady on?",
                options: ["Jaguars", "Texans", "patriots", "Falcons"],
                answer: 0
            },
            {
                question: "10 The number of players in each side in Water Polo is",
                options: ["6", "8", "9", "7"],
                answer: 3
            }
        ]
    }

]


function createCategory() {
    // console.log(myApp[1].category);
    for (let i = 0; i < myApp.length; i++) {
        const categoryList = document.createElement("div");
        categoryList.innerHTML = myApp[i].category;
        categoryList.setAttribute("data-id", i);
        categoryList.setAttribute("onclick", "selectCategory(this)");
        categoryBox.appendChild(categoryList)
    }
}

function selectCategory(ele) {
    categoryIndex = ele.getAttribute("data-id");
    // console.log(categoryIndex)
    categoryText.innerHTML = myApp[categoryIndex].category;
    quizHomeBox.classList.remove("show");
    quizBox.classList.add("show");
    nextQuestion();
}

function load() {
    number++;
    questionText.innerHTML = myApp[categoryIndex].quizWrap[questionIndex].question;
    createOptions();
    scoreBoard();
    currentQuestionNum.innerHTML = number + " / " + myApp[categoryIndex].quizWrap.length;
}

function createOptions() {
    optionBox.innerHTML = "";
    let animationDelay = 0.2;
    for (let i = 0; i < myApp[categoryIndex].quizWrap[questionIndex].options.length; i++) {
        const option = document.createElement("div");
        option.innerHTML = myApp[categoryIndex].quizWrap[questionIndex].options[i];
        option.classList.add("option");
        option.id = i;
        option.style.animationDelay = animationDelay + "s";
        animationDelay = animationDelay + 0.2;
        option.setAttribute("onclick", "check(this)");
        optionBox.appendChild(option);
    }
}

function generateRandomQuestion() {
    const randomNumber = Math.floor(Math.random() * myApp[categoryIndex].quizWrap.length);
    let hitDuplicate = 0;
    if (myArray.length == 0) {
        questionIndex = randomNumber;
    }
    else {
        for (let i = 0; i < myArray.length; i++) {
            if (randomNumber == myArray[i]) {
                // if duplicate found
                hitDuplicate = 1;
            }
        }
        if (hitDuplicate == 1) {
            generateRandomQuestion();
            return;
        }
        else {
            questionIndex = randomNumber;
        }
    }

    myArray.push(randomNumber);
    console.log(myArray)
    load();
}

function check(ele) {
    const id = ele.id;
    if (id == myApp[categoryIndex].quizWrap[questionIndex].answer) {
        ele.classList.add("correct");
        score++;
        scoreBoard();
    }
    else {
        ele.classList.add("wrong");
        // show correct option when clicked answer is wrong
        for (let i = 0; i < optionBox.children.length; i++) {
            if (optionBox.children[i].id == myApp[categoryIndex].quizWrap[questionIndex].answer) {
                optionBox.children[i].classList.add("show-correct");
            }
        }
    }
    attempt++;
    disableOptions()
    showAnswerDescription();
    showNextQuestionBtn();
    stopTimer();

    if (number == myApp[categoryIndex].quizWrap.length) {
        quizOver();
    }
}

function timeIsUp() {
    showTimeUpText();
    // when time is up show correct answer
    for (let i = 0; i < optionBox.children.length; i++) {
        if (optionBox.children[i].id == myApp[categoryIndex].quizWrap[questionIndex].answer) {
            optionBox.children[i].classList.add("show-correct");
        }
    }

    disableOptions()
    showAnswerDescription();
    showNextQuestionBtn();
}

function startTimer() {
    let timeLimit = 15;
    remainingTime.innerHTML = timeLimit;
    remainingTime.classList.remove("less-time");
    interval = setInterval(() => {
        timeLimit--;
        if (timeLimit < 10) {
            timeLimit = "0" + timeLimit;
        }
        if (timeLimit < 6) {
            remainingTime.classList.add("less-time");
        }
        remainingTime.innerHTML = timeLimit;
        if (timeLimit == 0) {
            clearInterval(interval);
            timeIsUp();
        }
    }, 1000)
}

function stopTimer() {
    clearInterval(interval);
}

function disableOptions() {
    for (let i = 0; i < optionBox.children.length; i++) {
        // optionBox.children[i].classList.add("already-answered");
        optionBox.children[i].removeAttribute("onclick");
    }
}

function showAnswerDescription() {
    if (typeof myApp[categoryIndex].quizWrap[questionIndex].description !== 'undefined') {
        answerDescription.classList.add("show");
        answerDescription.innerHTML = myApp[categoryIndex].quizWrap[questionIndex].description;
    }
}
function hideAnswerDescription() {
    answerDescription.classList.remove("show");
    answerDescription.innerHTML = "";
}
function showNextQuestionBtn() {
    nextQuestionBtn.classList.add("show");
}
function hideNextQuestionBtn() {
    nextQuestionBtn.classList.remove("show");
}
function showTimeUpText() {
    timeUpText.classList.add("show");
}
function hideTimeUpText() {
    timeUpText.classList.remove("show");

}
function scoreBoard() {
    correctAnswers.innerHTML = score;
}

nextQuestionBtn.addEventListener("click", nextQuestion);

function nextQuestion() {
    generateRandomQuestion();
    hideNextQuestionBtn();
    hideAnswerDescription();
    hideTimeUpText();
    startTimer();
}

function quizResult() {
    document.querySelector(".total-questions").innerHTML = myApp[categoryIndex].quizWrap.length;
    document.querySelector(".total-attemp").innerHTML = attempt;
    document.querySelector(".total-correct").innerHTML = score;
    document.querySelector(".total-wrong").innerHTML = attempt - score;
    const percentage = (score / myApp[categoryIndex].quizWrap.length) * 100;
    document.querySelector(".percentage").innerHTML = percentage.toFixed(2) + "%";
}
function resetQuiz() {
    attempt = 0;
    // questionIndex=0;
    score = 0;
    number = 0;
    myArray = [];
}

function quizOver() {
    nextQuestionBtn.classList.remove("show");
    seeResultBtn.classList.add("show");
}

seeResultBtn.addEventListener("click", () => {

    quizBox.classList.remove("show");
    seeResultBtn.classList.remove("show");
    quizOverBox.classList.add("show");
    quizResult();
})

startAgainQuizBtn.addEventListener("click", () => {
    quizBox.classList.add("show");
    quizOverBox.classList.remove("show");
    resetQuiz();
    nextQuestion();
})

goHomeBtn.addEventListener("click", () => {
    quizOverBox.classList.remove("show");
    quizHomeBox.classList.add("show");
    resetQuiz();
})

// startQuizBtn.addEventListener("click",()=>{
// 	 quizHomeBox.classList.remove("show");
// 	quizBox.classList.add("show");
//    nextQuestion();
// })

window.onload = () => {
    createCategory();
}








