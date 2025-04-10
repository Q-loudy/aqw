// script.js
let coins = 100;
let autoClickers = 0;
let autoClickerCost = 10;

let autoClickers2 = 0;
let autoClicker2Cost = 100;

let autoClickers3 = 0;
let autoClicker3Cost = 1000;

const coinDisplay = document.getElementById("coinCount");
const clickButton = document.getElementById("clickButton");
const buyAutoClickerButton = document.getElementById("buyAutoClicker");
const autoClickerCountDisplay = document.getElementById("autoClickerCount");
const autoClickerCostDisplay = document.getElementById("autoClickerCost");

const buyAutoClicker2Button = document.getElementById("buyAutoClicker2");
const autoClicker2CountDisplay = document.getElementById("autoClicker2Count");
const autoClicker2CostDisplay = document.getElementById("autoClicker2Cost");

const buyAutoClicker3Button = document.getElementById("buyAutoClicker3");
const autoClicker3CountDisplay = document.getElementById("autoClicker3Count");
const autoClicker3CostDisplay = document.getElementById("autoClicker3Cost");

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

buyAutoClicker3Button.addEventListener("click", () => {
  if (coins >= autoClicker3Cost) {
    coins -= autoClicker3Cost;
    autoClickers3++;
    autoClicker3Cost = Math.floor(autoClicker3Cost * 1.3);
    updateDisplay();
  }
});

function updateDisplay() {
  coinDisplay.textContent = coins;
  autoClickerCountDisplay.textContent = autoClickers;
  autoClickerCostDisplay.textContent = autoClickerCost;
  
  autoClicker2CountDisplay.textContent = autoClickers2;
  autoClicker2CostDisplay.textContent = autoClicker2Cost;
  
  autoClicker3CountDisplay.textContent = autoClickers3;
  autoClicker3CostDisplay.textContent = autoClicker3Cost;
}

setInterval(() => {
  coins += autoClickers;
  autoClickers += autoClickers2;
  autoClickers2 += autoClickers3;  
  updateDisplay();
}, 500);
