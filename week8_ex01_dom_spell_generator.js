const generateBtn = document.getElementById("generate-btn");
const spellResult = document.getElementById("spell-result");
const resetBtn = document.getElementById("reset-btn");

const ingredients = ["Dragon Scale", "Phoenix Feather", "Unicorn Horn"];

let countdownInterval;

function generateSpell() {
  generateBtn.disabled = true;

  let countdownNumber = 3;
  spellResult.textContent = countdownNumber;

  countdownInterval = setInterval(() => {
    countdownNumber--;

    if (countdownNumber === 0) {
      clearInterval(countdownInterval);

      const randomIndex = Math.floor(Math.random() * ingredients.length);
      const selectedIngredient = ingredients[randomIndex];
      spellResult.textContent = `Cast Spell: ${selectedIngredient}`;

      const r = Math.floor(Math.random() * 256);
      const g = Math.floor(Math.random() * 256);
      const b = Math.floor(Math.random() * 256);
      const randomColor = `rgb(${r}, ${g}, ${b})`;

      spellResult.style.backgroundColor = randomColor;

      generateBtn.disabled = false;
    } else {
      spellResult.textContent = countdownNumber;
    }
  }, 1000);
}

function resetSpell() {
  clearInterval(countdownInterval);
  spellResult.textContent = "";
  spellResult.style.backgroundColor = "";
  generateBtn.disabled = false;
}

generateBtn.addEventListener("click", generateSpell);
resetBtn.addEventListener("click", resetSpell);
