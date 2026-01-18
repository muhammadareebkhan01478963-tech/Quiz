const questions = [
  {
    question: "Which is the largest animal in the world?",
    answers: [
      { text: "Shark", correct: false },
      { text: "Blue Whale", correct: true },
      { text: "Elephant", correct: false },
      { text: "Giraffe", correct: false },
    ],
  },
  {
    question: "Which is the smallest country in the world?",
    answers: [
      { text: "Vatican City", correct: true },
      { text: "Bhutan", correct: false },
      { text: "Nepal", correct: false },
      { text: "Sri Lanka", correct: false },
    ],
  },
  {
    question: "Which is the largest desert in the world?",
    answers: [
      { text: "Kalahari", correct: false },
      { text: "Gobi", correct: false },
      { text: "Sahara", correct: false },
      { text: "Antarctica", correct: true },
    ],
  },
  {
    question: "Which is the smallest continent in the world?",
    answers: [
      { text: "Asia", correct: false },
      { text: "Australia", correct: true },
      { text: "Arctic", correct: false },
      { text: "Africa", correct: false },
    ],
  },
  {
    question: "Kaunsa janwar duniya ka sabse tez daudne wala land animal hai?",
    answers: [
      { text: "Lion", correct: false },
      { text: "Cheetah", correct: true },
      { text: "Gazelle", correct: false },
      { text: "Horse", correct: false },
    ],
  },
  {
    question: "Kaunsa parinda raat ko dekhne ke liye mashhoor hai (nocturnal)?",
    answers: [
      { text: "Eagle", correct: false },
      { text: "Owl", correct: true },
      { text: "Sparrow", correct: false },
      { text: "Flamingo", correct: false },
    ],
  },
  {
    question: "Software kya hota hai?",
    answers: [
      { text: "Computer ka physical part", correct: false },
      { text: "Computer ke andar installed programs aur instructions", correct: true },
      { text: "Computer ka keyboard", correct: false },
      { text: "Electric supply system", correct: false },
    ],
  },
  {
    question: "Microsoft Word kis type ka software hai?",
    answers: [
      { text: "System Software", correct: false },
      { text: "Utility Software", correct: false },
      { text: "Application Software", correct: true },
      { text: "Programming Software", correct: false },
    ],
  },
  {
    question: "Operating System ka example kaunsa hai?",
    answers: [
      { text: "MS Word", correct: false },
      { text: "Windows", correct: true },
      { text: "Google", correct: false },
      { text: "Mouse", correct: false },
    ],
  },
  {
    question: "Antivirus ka kaam kya hai?",
    answers: [
      { text: "Virus banana", correct: false },
      { text: "Virus se bachana", correct: true },
      { text: "Files delete karna", correct: false },
      { text: "System format karna", correct: false },
    ],
  },
  {
    question: "Application Software ka example?",
    answers: [
      { text: "Chrome", correct: true },
      { text: "RAM", correct: false },
      { text: "CPU", correct: false },
      { text: "BIOS", correct: false },
    ],
  },
];

// ====== QUIZ LOGIC ======
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
  const currentQuestion = questions[currentQuestionIndex];
  const questionNo = currentQuestionIndex + 1;
  questionElement.innerHTML = `${questionNo}. ${currentQuestion.question}`;

  currentQuestion.answers.forEach((answer) => {
    const button = document.createElement("button");
    button.innerHTML = answer.text;
    button.classList.add("btn");
    answerButtons.appendChild(button);

    if (answer.correct) {
      button.dataset.correct = answer.correct;
    }


    button.addEventListener("click", (e) => selectAnswer(e));
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
  questionElement.innerHTML = `🎯 You scored <b>${score}</b> out of <b>${questions.length}</b>!`;
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
