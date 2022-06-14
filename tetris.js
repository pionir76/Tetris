import BLOCKS from "./blocks.js";

const MAP_W = 10;
const MAP_H = 20;
const gameBoard = document.querySelector(".game-board > ul");

initGame();

function initGame() {
  gameBoard.innerHTML = "";

  for (let i = 0; i < MAP_H; i++) {
    newBlockRow();
  }
  getNewBlock();
}

function newBlockRow() {
  const li = document.createElement("li");
  const ul = document.createElement("ul");

  for (let i = 0; i < MAP_W; i++) {
    const block = document.createElement("li");
    ul.appendChild(block);
  }

  li.prepend(ul);
  gameBoard.prepend(li);
}

function getNewBlock() {}
