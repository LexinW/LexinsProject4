var beginBtnEl = document.querySelector(".beginBtn");
var cardEl = document.querySelector(".card");

// Created the array to store the questions, the choices, and the answer.
var questions = [
  {
    question: "What is the first language we studied?",
    choices: ["HTML", "CSS", "JAVASCRIPT"],
    answer: "HTML",
  },
  {
    question: "What is the second language we studied?",
    choices: ["HTML", "CSS", "JAVASCRIPT"],
    answer: "CSS",
  },
  {
    question: "What is the third language we studied?",
    choices: ["HTML", "CSS", "JAVASCRIPT"],
    answer: "JAVASCRIPT",
  },
];

// Function to start the game, begin timer, and display the initial questions. Most of the javascript happens in this function.
function beginChallenge() {
  // Set initial timeLeft
  var timeLeft = 75;

  // Start timer
  var timer = setInterval(function () {
    timeLeft--;
    document.getElementById("time-left").textContent = timeLeft;

    if (timeLeft <= 0) {
      clearInterval(timer);
      timeLeft == 0;
      alert("Time's up!");
      displayScore();
      return;
    }
  }, 1000);

  // Display first question
  displayQuestion(0);

  function displayQuestion(questionIndex) {
    var currentQuestion = questions[questionIndex];
    var questionContainerEl = document.createElement("div");
    var questionTitleEl = document.createElement("h2");
    var choicesContainerEl = document.createElement("ul");

    questionTitleEl.textContent = currentQuestion.question;

    currentQuestion.choices.forEach(function (choice) {
      var choiceBtnEl = document.createElement("button");
      choiceBtnEl.className = "choiceBtn";
      choiceBtnEl.style.width = "100%";
      choiceBtnEl.style.height = "50px";
      choiceBtnEl.style.marginTop = "10px";
      choiceBtnEl.style.backgroundColor = "--light";
      choiceBtnEl.style.borderRadius = "4px";
      choiceBtnEl.style.border = "solid";
      choiceBtnEl.style.cursor = "pointer";
      choiceBtnEl.textContent = choice;
      choicesContainerEl.appendChild(choiceBtnEl);
    });

    questionContainerEl.appendChild(questionTitleEl);
    questionContainerEl.appendChild(choicesContainerEl);

    cardEl.textContent = "";
    cardEl.appendChild(questionContainerEl);

    // Add event listener to each choice button
    var choiceBtnEls = document.querySelectorAll(".choiceBtn");
    choiceBtnEls.forEach(function (choiceBtnEl) {
      choiceBtnEl.addEventListener("click", function () {
        if (this.textContent === currentQuestion.answer) {
          // Move to next question
          questionIndex++;
          if (questionIndex < questions.length) {
            displayQuestion(questionIndex);
          } else {
            alert("You answered all questions!");
            timeLeft = 1;
          }
          // Add points to score
          score += 10;
          scoreEl.textContent = score;
        } else {
          // Subtract time and move to next question
          timeLeft -= 5;
          alert("WRONG!!! -5 seconds!");
          document.getElementById("time-left").textContent = timeLeft;
          if (questionIndex < questions.length) {
            displayQuestion(questionIndex);
          } else {
            alert("You answered all questions!");
            timeLeft = 1;
          }
          // Subtract points from score
          score -= 2;
          scoreEl.textContent = score;
        }
      });  
    });
  }
  function displayScore() {

    cardEl.innerHTML = "";
    var score = correctAnswers * 10 - incorrectAnswers * 2;
    var scorecardEl = document.createElement("div");
    var scoreTitleEl = document.createElement("h2");
    var scoreEl = document.createElement("p");

    scorecardEl.classList.add("scorecard");
    scoreTitleEl.textContent = "Your Score";
    scorecardEl.appendChild(scoreTitleEl);
    scoreEl.textContent = "Correct Answers: " + correctAnswers + "\nIncorrect Answers: " + incorrectAnswers + "\nFinal Score: " + score;
    scorecardEl.appendChild(scoreEl);
    cardEl.appendChild(scorecardEl);
  }
}
beginBtnEl.addEventListener("click", function(){
  beginChallenge();
});
