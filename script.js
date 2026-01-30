let questions = [];
let currentIndex = 0;

async function loadQuestions() {
  const res = await fetch("data/questions.json");
  questions = await res.json();
  showQuestion();
}

function showQuestion() {
  const q = questions[currentIndex];

  document.getElementById("question").textContent = q.question;

  const choicesDiv = document.getElementById("choices");
  choicesDiv.innerHTML = "";

  q.choices.forEach(choice => {
    const btn = document.createElement("button");
    btn.textContent = choice;
    btn.onclick = () => checkAnswer(choice);
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

  document.getElementById("next-btn").style.display = "inline-block";
}

document.getElementById("next-btn").onclick = () => {
  currentIndex++;
  if (currentIndex < questions.length) {
    document.getElementById("feedback").textContent = "";
    document.getElementById("next-btn").style.display = "none";
    showQuestion();
  } else {
    document.getElementById("game-container").innerHTML =
      "<h2>You have completed the trial, Tarnished.</h2>";
  }
};

loadQuestions();
