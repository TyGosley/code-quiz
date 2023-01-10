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
let timeLeft =document.getElementById("timer");
let seconds =75;
let questionIndex = 0;
let totalScore = 0;
let questionCount =1;

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


// Write functions here
// When I click the start button, THEN a time starts.  Use setInterval here

function countDown() {
    let timerInterval = setInterval(function() {
        secondsLeft--;
        timeLeft.textContent = "Time left: " + secondsLeft + " s";

        if (secondsLeft <= 0) {
            clearInterval(timerInterval);
            timeLeft.textContent = "Time is up!";
            finish.textContent = "Time is up!";
            gameOver();
        } else (questionCount >=questionArray.length + 1) 
            clearInterval(timerInterval);
            gameOver();
        })
        
    } 1000;


// to start quiz click start button
function startQuiz() {
    welcomePage.style.display = "none";
    questionsPage.style.display = "block";
    questionIndex = 0;
    countDown();
    showQuestion(questionIndex);
}
// Is this labeled right?
function showQuestion(n) {
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
// WHY IS THIS NOT WORKING?
if (questionArray[questionIndex].answer == event.target.value) {
    resultLine.textContent = "Correct!!!";
    totalScore = totalScore + 10;
}else {
    secondsLeft = secondsLeft -10;
    resultLine.textContent = "Incorrect!!!" 
} 

if (questionIndex < questionArray.length -1) {
    showQuestion(questionIndex +1);
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
    // Slice the high score array to only show the top 3 scores 
    let topThree = highScores.slice(0,3);
    for (let i = 0; i < topThree.length; i++) {
        let item = topThree[i];
    // Show the score list on score board
    var li = document.createElement("li");
    li.textContent = item.user + " - " + item.score;
    li.setAttribute("data-index", i);
    userScore.appendChild(li);
    }
};

function sortScore () {
    let unsortedList = getScore();
    if (getScore === null) {
        return;
    } else {
        unsortedList.sort(function(a,b) {
            return b.score - a.score;

        })
        return unsortedList;
    }
};

// push new user score/initials to local storage
function addItem(n) {
    let addedList = getScore();
    addedList.push(n);
    localStorage.setItem("ScoreList", JSON.stringify(addedList));
};

function saveScore() {
    let scoreItem = {
        user: userInitials.value,
        scores: totalScore
    }
    addItem(scoreItem);
    renderScore();
}

/* Event listeners here*/
// startbuttonn to start the quiz
startButton.addEventListener("click", startQuiz);

//click any choices button, go to the next question
selectButtons.forEach(function(click) {

    click.addEventListener("click", checkAnswer);
});

//save information and go to next page
submitButton.addEventListener("click", function(event) {
    event.preventDefault();
    scores.style.display = "none";
    welcomePage.style.display = "none";
    highScorePage.style.display = "block";
    questionsPage.style.display ="none";
    saveScore();
});

// check highscore ranking list
finalScore.addEventListener("click", function(event) {
    event.preventDefault();
    scores.style.display = "none";
    welcomPage.style.display = "none";
    highScorePage.style.display = "block";
    questionsPage.style.display ="none";
    renderScore();
});

//go back to main page
backButton.addEventListener("click",function(event){
        event.preventDefault();
        scores.style.display = "none";
        welcomePage.style.display = "block";
        highScorePage.style.display = "none";
        questionsPage.style.display ="none";
        location.reload();
});

//clear local storage and clear page shows
clearButton.addEventListener("click",function(event) {
    event.preventDefault();
    localStorage.clear();
    renderScore();
});
