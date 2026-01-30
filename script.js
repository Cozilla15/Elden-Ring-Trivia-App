document.addEventListener("DOMContentLoaded", () => {

let questions = [];
let currentIndex = 0;
let score = 0;

// Load questions from JSON
async function loadQuestions() {
  const res = await fetch("data/questions.json");
  questions = await res.json();
}

// Start the game
function startGame() {
  document.getElementById("start-menu").style.display = "none";
  document.getElementById("game-container").style.display = "block";

  currentIndex = 0;
  score = 0;
  document.getElementById("score").textContent = score;

  showQuestion();
}

// Display a question
function showQuestion() {
  const q = questions[currentIndex];

  const questionEl = document.getElementById("question");
  const choicesDiv = document.getElementById("choices");
  const
