document.querySelector('button').addEventListener('submit', (e) => {
  e.preventDefault();
})

let questions = [
  {
    question: "Which of the following is used to display data in the console?",
    options: ["console.log()", "print()", "alert()", "document.write()"],
    answer: "console.log()"
  },
  {
    question: "Which operator is used for strict equality comparison in JavaScript?",
    options: ["==", "===", "!=", "="],
    answer: "==="
  },
  {
    question: "How do you create a function in JavaScript?",
    options: ["function myFunction() {}", "def myFunction() {}", "create function myFunction() {}", "func myFunction() {}"],
    answer: "function myFunction() {}"
  },
  {
    question: "What will typeof 'Hello' return?",
    options: ["string", "number", "boolean", "object"],
    answer: "string"
  },
  {
    question: "Which loop is used to iterate over an array in JavaScript?",
    options: ["for", "while", "forEach()", "All of the above"],
    answer: "All of the above"
  }
];


let questionElement = document.querySelector(".question");
let optionsElement = document.querySelector(".options");
let nextButton = document.querySelector("#next-button");
nextButton.addEventListener('click', getQuestions);

let resultElement = document.querySelector("#result");
let restartButton = document.querySelector(".restart-btn");
restartButton.addEventListener('click', restartQuiz);

let currentQuestion = 0;
let score = 0;

function startQuiz() {
  document.querySelector(".result").style.display = "none";
  currentQuestion = 0;
  score = 0;
  getQuestions();
}

function getQuestions() {
  nextButton.style.display = "none";
  questionElement.textContent = `${currentQuestion+1}. ${questions[currentQuestion].question}`;
  optionsElement.innerHTML = "";
  questions[currentQuestion].options.forEach(option => {
    let button = document.createElement("button");
    button.textContent = option;
    button.addEventListener("click", checkAnswer);
    optionsElement.appendChild(button);
  });
}

function checkAnswer() {
  event.target.style.backgroundColor = "black";
  event.target.style.color = "white";
  let selectedOption = event.target.textContent;
  if (selectedOption === questions[currentQuestion].answer) {
    score++;
  }
  currentQuestion++;
  if (currentQuestion >= questions.length) {
    endQuiz();
  } else {
    nextButton.style.display = "block";
  }
}

function endQuiz() {
  questionElement.textContent = "Quiz finished!";
  optionsElement.innerHTML = "";
  nextButton.style.display = "none";
  document.querySelector(".result").style.display = "flex";
  resultElement.textContent = `Your final score is ${score} out of ${questions.length}.`
}

function restartQuiz() {
  startQuiz();
}

startQuiz();