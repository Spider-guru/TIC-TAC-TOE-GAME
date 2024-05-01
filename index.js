"use strict";
//variables declaration:
let click = "x";
let cells = document.querySelectorAll(".cell");
let map = ["", "", "", "", "", "", "", "", ""];
let remMoveDisp = document.querySelector(".remMoves");
let numOfMoves = 9;
remMoveDisp.textContent = `${numOfMoves}`;
let gamePanel = document.querySelector(".gameInfo");
let gameStart = true;
let info = {
  winMsg(a) {
    return `${a} is the winnner`;
  },
  tieMsg() {
    return `It's a tie`;
  },
};
let message = document.querySelector(".message");
let restartBtn = document.querySelector(".rStartBtn");
//function declaration:

let restartProcess = () => {
  gamePanel.style.display = "none";
  numOfMoves = 9;
  remMoveDisp.textContent = `${numOfMoves}`;
  cells.forEach((item) => item.classList.remove("x"));
  cells.forEach((item) => item.classList.remove("o"));
  map = ["", "", "", "", "", "", "", "", ""];
  gameStart = true;
  click = 'x'
};

let updateOtherData = () => {
  numOfMoves--;
  remMoveDisp.textContent = `${numOfMoves}`;
};

let indicateCellClicked = (cell, param) => {
  cell.classList.add(param);
};

let setClick = (val) => {
  click = val;
};

let setMap = (index, param) => {
  map[index] = param;
};

let hasXWon = () => {
  let condition =
    (map[0] == "x" && map[1] == "x" && map[2] == "x") ||
    (map[3] == "x" && map[4] == "x" && map[5] == "x") ||
    (map[6] == "x" && map[7] == "x" && map[8] == "x") ||
    (map[0] == "x" && map[3] == "x" && map[6] == "x") ||
    (map[1] == "x" && map[4] == "x" && map[7] == "x") ||
    (map[2] == "x" && map[5] == "x" && map[8] == "x") ||
    (map[0] == "x" && map[4] == "x" && map[8] == "x") ||
    (map[2] == "x" && map[4] == "x" && map[6] == "x");

  if (condition) {
    return true;
  } else {
    return false;
  }
};

let hasOWon = () => {
  let condition =
    (map[0] == "o" && map[1] == "o" && map[2] == "o") ||
    (map[3] == "o" && map[4] == "o" && map[5] == "o") ||
    (map[6] == "o" && map[7] == "o" && map[8] == "o") ||
    (map[0] == "o" && map[3] == "o" && map[6] == "o") ||
    (map[1] == "o" && map[4] == "o" && map[7] == "o") ||
    (map[2] == "o" && map[5] == "o" && map[8] == "o") ||
    (map[0] == "o" && map[4] == "o" && map[8] == "o") ||
    (map[2] == "o" && map[4] == "o" && map[6] == "o");

  if (condition) {
    return true;
  } else {
    return false;
  }
};

let checkWinner = () => {

  updateOtherData();

  if (hasXWon()) {
    message.textContent = `${info.winMsg("X")}`;
    gameStart = false;
    gamePanel.style.display = "flex";
  }
  if (hasOWon()) {
    console.log("winner is o");
    message.textContent = `${info.winMsg("O")}`;
    gameStart = false;
    gamePanel.style.display = "flex";
  }
  if (numOfMoves == 0 && gameStart == true) {
    message.textContent = `${info.tieMsg()}`;
    gameStart = false
    gamePanel.style.display = "flex";
    console.log('tie', gameStart)
  }

};

let checkIfClickedAlready = (cell) => {
  let condition =
    cell.classList.contains("x") ||
    cell.classList.contains("o");

  if (condition) {
    return true;
  } else {
    return false;
  }
};

let handleClick = (item, index) => {
  if (checkIfClickedAlready(item)) {
    console.log("clicked already");
  } else {
    if (click == "x") {
      setClick("o");
      indicateCellClicked(item, "x");
      setMap(index, "x");
    } else if (click == "o") {
      setClick("x");
      indicateCellClicked(item, "o");
      setMap(index, "o");
    }
    checkWinner();
  }
};


//event listeners declaration
cells.forEach((item, index) => {
  item.addEventListener("click", () => handleClick(item, index));
});

restartBtn.addEventListener("click", () => restartProcess());
