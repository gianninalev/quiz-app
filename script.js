const questions = [
  {
    question: "How many people have walked the moon?",
    answers: [
      { text: "Seven", correct: false },
      { text: "three", correct: false },
      { text: "Sixteen", correct: false },
      { text: "Twelve", correct: true },
    ],
  },
  {
    question: "In which language does <em>konnichiwa</em> mean <em>hello</em>?",
    answers: [
      { text: "Korean", correct: false },
      { text: "Japanese", correct: true },
      { text: "Chinese", correct: false },
      { text: "Vietnamese", correct: false },
    ],
  },

  {
    question: "How many timezones are there in Russia?",
    answers: [
      { text: "11", correct: true },
      { text: "10", correct: false },
      { text: "9", correct: false },
      { text: "16", correct: false },
    ],
  },

  {
    question: "Which country is Tasmania a part of?",
    answers: [
      { text: "Malaysia", correct: false },
      { text: "New Zealand", correct: false },
      { text: "Mozambique", correct: false },
      { text: "Australia", correct: true },
    ],
  },

  {
    question: "What is the perfect score in bowling?",
    answers: [
      { text: "200", correct: false },
      { text: "300", correct: true },
      { text: "400", correct: false },
      { text: "350", correct: false },
    ],
  },

  {
    question: "What year was Shrek 1 released?",
    answers: [
      { text: "2000", correct: false },
      { text: "2003", correct: false },
      { text: "2001", correct: true },
      { text: "2002", correct: false },
    ],
  },

  {
    question: "What is the world's best-selling stout beer?",
    answers: [
      { text: "Murphy's", correct: false },
      { text: "New Holland Dragon's", correct: false },
      { text: "Left Hand", correct: false },
      { text: "Guinness", correct: true },
    ],
  },

  {
    question: "What year was Cinderella Disney movie released?",
    answers: [
      { text: "1960", correct: false },
      { text: "1950", correct: true },
      { text: "1965", correct: false },
      { text: "1972", correct: false },
    ],
  },

  {
    question: "Which fruit has the richest source of antioxidants?",
    answers: [
      { text: "Strawberry", correct: false },
      { text: "Mango", correct: true },
      { text: "Blueberry", correct: true },
      { text: "Grapes", correct: false },
    ],
  },

  {
    question: "In which country of South America is Yauyos province located?",
    answers: [
      { text: "Peru", correct: true },
      { text: "Ecuador", correct: false },
      { text: "Bolivia", correct: false },
      { text: "Brazil", correct: false },
    ],
  },
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  nextButton.innerHTML = "Next";
  showQuestion();
}

function showQuestion() {
  resetState();
  let currentQuestion = questions[currentQuestionIndex];
  let questionNo = currentQuestionIndex + 1;
  questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

  currentQuestion.answers.forEach((answer) => {
    const button = document.createElement("button");
    button.innerHTML = answer.text;
    button.classList.add("btn");
    answerButtons.appendChild(button);
    if (answer.correct) {
      button.dataset.correct = answer.correct;
    }
    button.addEventListener("click", selectAnswer);
  });
}

function resetState() {
  nextButton.style.display = "none";
  while (answerButtons.firstChild) {
    answerButtons.removeChild(answerButtons.firstChild);
  }
}

function selectAnswer(e) {
  const selectedBtn = e.target;
  const isCorrect = selectedBtn.dataset.correct === "true";
  if (isCorrect) {
    selectedBtn.classList.add("correct");
    score++;
  } else {
    selectedBtn.classList.add("incorrect");
  }
  Array.from(answerButtons.children).forEach((button) => {
    if (button.dataset.correct === "true") {
      button.classList.add("correct");
    }
    button.disabled = true;
  });
  nextButton.style.display = "block";
}

function showScore() {
  resetState();
  questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
  nextButton.innerHTML = "Play Again";
  nextButton.style.display = "block";
}

function handleNextButton() {
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    showQuestion();
  } else {
    showScore();
  }
}

nextButton.addEventListener("click", () => {
  if (currentQuestionIndex < questions.length) {
    handleNextButton();
  } else {
    startQuiz();
  }
});

startQuiz();
