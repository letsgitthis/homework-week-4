var startQuiz = document.getElementById("start");
var player = document.getElementById("player");
var questioncard = document.getElementById("question");
var gameOver = document.getElementById("gameover");


var currentQuestion = 0;
var timer = 60;
var scoreboard = 0;
var points = 0;

// start quiz and timer
startQuiz.addEventListener("click", function () {
  startTimer();
  document.getElementById("points").innerHTML = points + " " + "points";
  start.parentNode.removeChild(start);
  displayQuestion();
});

var createTimer;

function startTimer() {
    createTimer = setInterval(function () {
        timer--;
        if (timer === 0) {
      clearInterval(createTimer);
      completeQuiz();
    }
    document.getElementById("timer").innerHTML = timer + " " + "seconds";
  }, 1000);
}
// question
function displayQuestion() {
  document.getElementById("points").innerHTML = points;
  if (currentQuestion < questions.length) {
    document.getElementById("question").innerHTML =
    questions[currentQuestion].question;
    
    for (var i = 0; i < questions[currentQuestion].answers.length; i++) {
        var button = document.createElement("button");
        button.innerText = questions[currentQuestion].answers[i];
        button.value = i;
        button.addEventListener("click", function (event) {
            if (event.target.value == questions[currentQuestion].correctAnswer) {
                points += 1;
                document.getElementById("answers").innerHTML = "";
                currentQuestion++;
                displayQuestion();
            } else {
              timer -= 5;
              alert("Wrong, but try again.");
            }
            
            if (currentQuestion === questions.length) {
                clearInterval(createTimer);
                completeQuiz();
            }
        });
        document.getElementById("answers").append(button);
    }
}
}

// localStorage scoreboard
function completeQuiz() {
    questioncard.setAttribute("class", "hide");
    questioncard.remove();
    gameOver.removeAttribute("class", "hide");
    player.removeAttribute("class", "hide");
    var button = document.createElement("button");
    button.innerText = "Save Score";
    button.addEventListener("click", function (event) {
    var score = JSON.parse(localStorage.getItem("score")) || [];
    score.push({
      player: document.getElementById("player").value,
      points: points,
    });
    localStorage.setItem("score", JSON.stringify(score));
        
    player.setAttribute("class", "hide");
    document.getElementById("score").setAttribute("class", "hide");
        
    for (var i = 0; i < score.length; i++) {
      var li = document.createElement("h2");
      li.innerHTML = score[i].player + " " + score[i].points;
      document.getElementById("scoresList").append(li);
    }
  });
  document.getElementById("score").append(button);
} 

// quiz question list
var questions = [
  {
    question: "Is it possible to nest functions in Javascript?",
    answers: ["True","False"],
    correctAnswer: 0,
  },
  {
    question: "Scripting language are?",
    answers: ["Assembly Level programming language", "High Level Programming language", "Machine level programming language", "Entry Level programming language"],
    correctAnswer: 1,
  },
  {
    question: "Choose the client-side JavaScript object:",
    answers: ["Database","Cursor", "Client", "FileUpLoad"],
    correctAnswer: 3,
  },
  {
    question: "Are Java and Javascript the same thing?",
    answers: ["Yes","No"],
    correctAnswer: 1,
  },
  {
    question: "BONUS ROUND",
    answers: ["Free point to keep going!"],
    correctAnswer: 0,
  },
  {
    question: "What... is your name?",
    answers: ['John','Jose','Smith', 'Sir Lancelot of Camelot!'],
    correctAnswer: 3, 
  },
  {
    question: 'What... is your quest?',
    answers: ['To seek the Holy Grail!', 'To grade this quiz', 'To give this student an A', 'To watch Monty Python on Netflix later'],
    correctAnswer: 0,
  },
  {
      question: 'What... is your favorite color?',
      answers: ['Blue!', 'Green', 'Red', 'What am I, 5?'],
      correctAnswer: 0,
  },
  {
      question: 'What... is the airspeed velocity of an unladen Swallow?',
      answers: ['What?', 'African or European?'],
      correctAnswer: 1,
  }
];