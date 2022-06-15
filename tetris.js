const BLOCKS = {
  tree: [
    [
      [2, 1],
      [0, 1],
      [1, 0],
      [1, 1],
    ],
    [
      [0, 1],
      [1, 2],
      [1, 0],
      [1, 1],
    ],
    [
      [0, 1],
      [1, 1],
      [2, 1],
      [1, 2],
    ],
    [
      [1, 0],
      [1, 1],
      [1, 2],
      [2, 1],
    ],
  ],

  square: [
    [
      [0, 0],
      [0, 1],
      [1, 0],
      [1, 1],
    ],
    [
      [0, 0],
      [0, 1],
      [1, 0],
      [1, 1],
    ],
    [
      [0, 0],
      [0, 1],
      [1, 0],
      [1, 1],
    ],
    [
      [0, 0],
      [0, 1],
      [1, 0],
      [1, 1],
    ],
  ],

  bar: [
    [
      [0, 0],
      [0, 1],
      [0, 2],
      [0, 3],
    ],
    [
      [0, 1],
      [1, 1],
      [2, 1],
      [3, 1],
    ],
    [
      [0, 0],
      [0, 1],
      [0, 2],
      [0, 3],
    ],
    [
      [0, 1],
      [1, 1],
      [2, 1],
      [3, 1],
    ],
  ],

  lbar1: [
    [
      [1, 0],
      [1, 1],
      [1, 2],
      [0, 2],
    ],
    [
      [0, 0],
      [1, 0],
      [2, 0],
      [2, 1],
    ],
    [
      [1, 0],
      [0, 0],
      [0, 1],
      [0, 2],
    ],
    [
      [0, 0],
      [0, 1],
      [1, 1],
      [2, 1],
    ],
  ],

  lbar2: [
    [
      [0, 0],
      [0, 1],
      [0, 2],
      [1, 2],
    ],
    [
      [0, 1],
      [1, 1],
      [2, 1],
      [2, 0],
    ],
    [
      [0, 0],
      [1, 0],
      [1, 1],
      [1, 2],
    ],
    [
      [0, 0],
      [1, 0],
      [2, 0],
      [0, 1],
    ],
  ],

  zbar1: [
    [
      [1, 0],
      [0, 1],
      [1, 1],
      [0, 2],
    ],
    [
      [0, 0],
      [1, 0],
      [1, 1],
      [2, 1],
    ],
    [
      [1, 0],
      [0, 1],
      [1, 1],
      [0, 2],
    ],
    [
      [0, 0],
      [1, 0],
      [1, 1],
      [2, 1],
    ],
  ],

  zbar2: [
    [
      [0, 0],
      [0, 1],
      [1, 1],
      [1, 2],
    ],
    [
      [0, 1],
      [1, 1],
      [1, 0],
      [2, 0],
    ],
    [
      [0, 0],
      [0, 1],
      [1, 1],
      [1, 2],
    ],
    [
      [0, 1],
      [1, 1],
      [1, 0],
      [2, 0],
    ],
  ],
};

const MAP_W = 10;
const MAP_H = 20;
const gameBoard = document.querySelector(".game-board > ul");

let movingBlock = {
  type: "tree",
  dir: 0,
  x: 0,
  y: 0,
};

initGame();

function initGame() {
  gameBoard.innerHTML = "";

  for (let i = 0; i < MAP_H; i++) {
    newBlockRow();
  }
  genNewBlock();
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

function genNewBlock() {
  const blk = Object.entries(BLOCKS);
  const idx = Math.floor(Math.random() * blk.length);

  movingBlock.type = blk[idx][0];
  movingBlock.dir = 0;
  movingBlock.x = 4;
  movingBlock.y = 0;

  updateGameBoard();

  dropInterval = setInterval(() => {
    dropBlock();
  }, 1000);
}

function dropBlock() {
  const { type, dir, x, y } = movingBlock;
  const blks = BLOCKS[type][dir];

  let bStack = false;

  for (let i = 0; i < blks.length; i++) {
    const col = blks[i][0] + x;
    const row = blks[i][1] + y + 1;

    if (row >= MAP_H) {
      bStack = true;
      break;
    }

    const node = gameBoard.childNodes[row].childNodes[0].childNodes[col];
    if (node.classList.contains("stacked")) {
      bStack = true;
      break;
    }
  }

  if (bStack) {
    const movingBlk = document.querySelectorAll(".moving");
    movingBlk.forEach((b) => {
      b.classList.remove("moving");
      b.classList.add("stacked");
    });

    clearInterval(dropInterval);
    genNewBlock();
    return;
  }

  movingBlock.y++;
  updateGameBoard();
}

function updateGameBoard() {
  const { type, dir, x, y } = movingBlock;

  const oldBlk = document.querySelectorAll(".moving");
  oldBlk.forEach((b) => b.classList.remove(type, "moving"));

  const blk = BLOCKS[type][dir];

  blk.forEach((b) => {
    let col = b[0] + x;
    let row = b[1] + y;

    const node = gameBoard.childNodes[row].childNodes[0].childNodes[col];
    node.classList.add(type, "moving");
  });
}

function isMoveAble(amound){
    
}

function moveBlock(xDir){

}

document.addEventListener("keydown", (event) => {
  console.log("event", event);
  switch (event.code) {
    case "ArrowLeft":
      moveBlock(-1)''
      break;

    case "ArrowRight":
    moveBlock(1);  
    break;

    default:
      break;
  }
});
