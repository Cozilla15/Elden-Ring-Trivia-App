let questions = [];
let currentIndex = 0;

async function loadQuestions() {
  const res = await fetch("data/questions.json");
  questions = await res.json();
  showQuestion();
}

function showQuestion() {
  const q = questions[currentIndex];

  const questionEl = document.getElementById("question");
  const choicesDiv = document.getElementById("choices");
  const feedback = document.getElementById("feedback");

  questionEl.textContent = q.question;
  feedback.textContent = "";
  feedback.classList.remove("show");

  // Fade-in animation
  questionEl.classList.remove("fade-in");
  void questionEl.offsetWidth;
  questionEl.classList.add("fade-in");

  choicesDiv.innerHTML = "";

  q.choices.forEach(choice => {
    const btn = document.createElement("button");
    btn.textContent = choice;
    btn.onclick = () => checkAnswer(choice);
    btn.classList.add("fade-in");
    choicesDiv.appendChild(btn);
  });
}

function checkAnswer(choice) {
  const q = questions[currentIndex];
  const feedback = document.getElementById("feedback");

  if (choice === q.answer) {
    feedback.textContent = "Correct, Tarnished.";
    feedback.style.color = "#8fda7f";
  } else {
    feedback.textContent = `Incorrect. The truth is: ${q.answer}`;
    feedback.style.color = "#d46a6a";
  }

  feedback.classList.add("show");
  document.getElementById("next-btn").style.display = "inline-block";
}

document.getElementById("next-btn").onclick = () => {
  currentIndex++;
  if (currentIndex < questions.length) {
    document.getElementById("next-btn").style.display = "none";
    showQuestion();
  } else {
    document.getElementById("game-container").innerHTML =
      "<h2 class='fade-in'>You have completed the trial, Tarnished.</h2>";
  }
};

loadQuestions();
