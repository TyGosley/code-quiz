// Define variables

let welcomeInstructions = document.querySelector("#instructions");
let startButton = document.querySelector("#start-button");
let welcomePage = document.querySelector("welcome-page");

let questionsPage = document.querySelector("#questions-page");
let askQuestion = document.querySelector("#ask-question");

let selectButtons = document.querySelectorAll(".selection-button");
let answerButton1 = document.querySelectorAll("#answer-button1");
let answerButton2 = document.querySelectorAll("#answer-button2");
let answerButton3 = document.querySelectorAll("#answer-button3");
let answerButton4 = document.querySelectorAll("#answer-button4");

let resultLine = document.querySelector("result-line");
let scores = document.querySelector("submit-page");
let finalScore = document.querySelector("final-score");
let userInitials = document.querySelector("initials");

let submitButton = document.querySelector("#submit-button");
let highScorePage = document.querySelector("#highscore-page");
let userScore = document.querySelector("#user-score");
let viewHighScores = document.querySelector("#view-highscores");
let finish = document.querySelector("#finish");

let backButton = document.querySelector("#back-button");
let clearButton = document.querySelector("#clear-button");

// Create & define questions here
// Placeholder questions
let questionArray = [
    {
        question: "Question 1 : Are you awesome?",
        choices: ["a. yes", "b. no", "c. hell yes", "d. Barney Stinson Awesome"],
        answer: "d"
    },
    {
        question: "Question 1 : Are you awesome?",
        choices: ["a. yes", "b. no", "c. hell yes", "d. Barney Stinson Awesome"],
        answer: "d"
    },
    {
        question: "Question 1 : Are you awesome?",
        choices: ["a. yes", "b. no", "c. hell yes", "d. Barney Stinson Awesome"],
        answer: "d"
    },
    {
        question: "Question 1 : Are you awesome?",
        choices: ["a. yes", "b. no", "c. hell yes", "d. Barney Stinson Awesome"],
        answer: "d"
    },
    {
        question: "Question 1 : Are you awesome?",
        choices: ["a. yes", "b. no", "c. hell yes", "d. Barney Stinson Awesome"],
        answer: "d"
    },
    {
        question: "Question 1 : Are you awesome?",
        choices: ["a. yes", "b. no", "c. hell yes", "d. Barney Stinson Awesome"],
        answer: "d"
    },
    {
        question: "Question 1 : Are you awesome?",
        choices: ["a. yes", "b. no", "c. hell yes", "d. Barney Stinson Awesome"],
        answer: "d"
    },
    {
        question: "Question 1 : Are you awesome?",
        choices: ["a. yes", "b. no", "c. hell yes", "d. Barney Stinson Awesome"],
        answer: "d"
    },
];

let timeLeft =document.getElementById("timer");
let seconds =75;
let questionNumber = 0;
let totalScore = 0;
let questionCount =1;

// Write functions here
// When I click the start button, THEN a time starts.  Use setInterval here

function countDown() {
    let timerInterval = setInterval(function() {
        secondsLeft--;
        timeLeft.textContent = "Time left: " + secondsLeft + " s";

        if (secondsLeft <= 0) {
            clearInterval(timerInterval);
            timeLeft.textContent = "Time\'s up!";
            finish.textContent = "Time\'s up!";
            gameOver();
        } else (questionCount >=questionArray.length + 1) { 
            clearInterval(timerInterval);
            gameOver();
        }
        
    }, 1000);
}

// to start quiz click start button
function startQuiz() {
    welcomePage.style.display = "none";
    questionsPage.style.display = "block";
    questionNumber = 0;
    countDown();
    showQuestion(questionNumber);
}

function showQuestion (n) {
    askQuestion.textContent = questionArray[n].question;
    answerButton1.textContent = questionArray.choices[0];
    answerButton2.textContent = questionArray.choices[1];
    answerButton3.textContent = questionArray.choices[2];
    answerButton4.textContent = questionArray.choices[3];
    questionNumber = n;
}

function checkAnswer(event) {
    event.preventDefault();
    resultLine.style.display = "block";
    setTimeout(function () {
        resultLine.style.display = "none";
    }, 1000);
}

if (questionArray[questionNumber].answer === event.target.value) {
    result-resultLine.te = "Correct!!!";
    totalScore = totalScore + 1;
}else {
    secondsLeft = secondsLeft -10;
    resultLine.textContent = "Incorrect!!!" 
} 

if (questionNumber < questionArray.length -1) {
    showQuestion(questionNumber +1);
} else {
    gameOver();
}
questionCount++;

function gameOver() {
    questionsPage.style.display ="none";
    scores.style.display = "block";
    console.log(scores);
    finalScore.textContent = "Your final score is :" + totalScore;
    timeLeft.style.display = "none";

};

// local storage for current score and initials
function showScore() {
    let currentList = localStorage.getItem("scoreList");
    if (currentList !== null ){
        freshList = JSON.parse(currentList);
        return freshList;
    } else {
        freshList = [];
    }
    return freshList;
};

function renderScore () {
    userScore.innerHTML = "";
    userScore.style.display ="block";
    let highScores = sort();   
    // Slice the high score array to only show the top five high scores. 
    var topThree = highScores.slice(0,3);
    for (var i = 0; i < topThree.length; i++) {
        var item = topThree[i];
    // Show the score list on score board
    var li = document.createElement("li");
    li.textContent = item.user + " - " + item.score;
    li.setAttribute("data-index", i);
    userScore.appendChild(li);
    }
};
