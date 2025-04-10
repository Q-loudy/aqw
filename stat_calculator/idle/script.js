// script.js
let coins = 0;
let autoClickers = 0;
let autoClickerCost = 10;

const coinDisplay = document.getElementById("coinCount");
const clickButton = document.getElementById("clickButton");
const buyAutoClickerButton = document.getElementById("buyAutoClicker");
const autoClickerCountDisplay = document.getElementById("autoClickerCount");
const autoClickerCostDisplay = document.getElementById("autoClickerCost");

clickButton.addEventListener("click", () => {
  coins++;
  updateDisplay();
});

buyAutoClickerButton.addEventListener("click", () => {
  if (coins >= autoClickerCost) {
    coins -= autoClickerCost;
    autoClickers++;
    autoClickerCost = Math.floor(autoClickerCost * 1.1);
    updateDisplay();
  }
});

function updateDisplay() {
  coinDisplay.textContent = coins;
  autoClickerCountDisplay.textContent = autoClickers;
  autoClickerCostDisplay.textContent = autoClickerCost;
}

setInterval(() => {
  coins += autoClickers;
  updateDisplay();
}, 1000);
