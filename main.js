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

// questions and options and  answer and answer description
// array of objects
myApp = [
    {
        category: "Human Body",
        quizWrap: [
            {
                question: "Which organ belongs to the Digestive System:",
                options: ["Thymus", "Stomach", "Heart", "Trachea"],
                answer: 1,
            },
            {
                question: "Adults have fewer bones than babies do.",
                options: ["true", "false"],
                answer: 0,
                description: "Lots of bones start out as several fragments at birth,then fuse together into a single bone later in life"
            },
            {
                question: "Our human body has.........",
                options: ["206 bones", "210 bones", "306 bones", "706 bones"],
                answer: 0,
            },
            {
                question: "Your fingernails and hair keep growing after you die.",
                options: ["true", "false"],
                answer: 1,
                description: "They really don't"
            },
            {
                question: "One important function of bones is to produce.",
                options: ["tendons", "ligaments", "blood cells", "cartilage"],
                answer: 2,
            }
        ]
    },

    {
        category: "Internation - Current Affairs",
        quizWrap: [
            {
                question: "Which of the following has become the first country to make all forms of public transport free?",
                options: ["Monaco", "India", "Japan", "Singapore"],
                answer: 3,
            },
            {
                question: "Which country is to host Commonwealth shooting, archery events in 2022?",
                options: ["Australia", "India", "Brunei", "Cameroon"],
                answer: 3,
                description: 'India to host Commonwealth shooting, archery events at Chandigarh in January 2022'
            },
            {
                question: "26 The International Criminal Police Organisation (INTERPOL) has its headquarters at",
                options: ["Montreal", "Bonn", "Paris", "London"],
                answer: 2
            },
            {
                question: "30 Where is the headquarters of Botanical Survey of India located?",
                options: ["Kolkata", "Lucknow", "Ootacmund", "Darjeeling"],
                answer: 0
            }
        ]
    },

    {
        category: "Computer Awareness",
        quizWrap: [
            {
                question: "How many bytes are equal to one kilobyte?",
                options: ["1050", "1024", "1022", "1000"],
                answer: 1
            },
            {
                question: "Which of the following is not an input device?",
                options: ["answerboard", "Monitor", "Joystick", "Microphone"],
                answer: 1,
            },
            {
                question: "The most powerful computer is_________",
                options: ["super computer", "micro computer", "mini computer", "all of these"],
                answer: 0
            },
            {
                question: "Which of the following memories needs refresh ?",
                options: ["drom", "rom", "sram", "all of these"],
                answer: 0
            }
            ,
            {
                question: "Every computer connected to the Internet is identified by a unique four-part string, known as",
                options: ["IP address", "Host name", "Domain name", "None of the above"],
                answer: 0
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
                question: "Who was the first Test Centurion in India Cricket?",
                options: ["C.K. Naidu", "Lala Amarnath", "Vinu Mankad", "Mansur Ali Pataudi"],
                answer: 1
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








