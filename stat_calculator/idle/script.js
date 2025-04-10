// script.js
let coins = 100;
let autoClickers = 0;
let autoClickerCost = 10;

let autoClickers2 = 0;
let autoClicker2Cost = 50;

const coinDisplay = document.getElementById("coinCount");
const clickButton = document.getElementById("clickButton");
const buyAutoClickerButton = document.getElementById("buyAutoClicker");
const autoClickerCountDisplay = document.getElementById("autoClickerCount");
const autoClickerCostDisplay = document.getElementById("autoClickerCost");

const buyAutoClicker2Button = document.getElementById("buyAutoClicker2");
const autoClicker2CountDisplay = document.getElementById("autoClicker2Count");
const autoClicker2CostDisplay = document.getElementById("autoClicker2Cost");

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

buyAutoClicker2Button.addEventListener("click", () => {
  if (coins >= autoClicker2Cost) {
    coins -= autoClicker2Cost;
    autoClickers2++;
    autoClicker2Cost = Math.floor(autoClicker2Cost * 1.2);
    updateDisplay();
  }
});

function updateDisplay() {
  coinDisplay.textContent = coins;
  autoClickerCountDisplay.textContent = autoClickers;
  autoClickerCostDisplay.textContent = autoClickerCost;
  
  autoClicker2CountDisplay.textContent = autoClickers2;
  autoClicker2CostDisplay.textContent = autoClicker2Cost;
}

setInterval(() => {
  coins += autoClickers;
  autoClickers += autoClickers2;  // Auto-clicker 2 generates additional autoclickers
  updateDisplay();
}, 1000);
