var count = 1;
let no_winner = true;
let win_info = 0;
let winning_pos = [
  [0, 1, 2],
  [0, 3, 6],
  [0, 4, 8],
  [3, 4, 5],
  [6, 7, 8],
  [6, 4, 2],
  [1, 4, 7],
  [2, 5, 8],
];
let data = {
  one: 0,
  two: 1,
  three: 2,
  four: 3,
  five: 4,
  six: 5,
  seven: 6,
  eight: 7,
  nine: 8,
  0: "one",
  1: "two",
  2: "three",
  3: "four",
  4: "five",
  5: "six",
  6: "seven",
  7: "eight",
  8: "nine",
};
function winner(arr) {
  for (let i = 0; i < arr.length; i++) {
    let val = data[arr[i]];
    let winClr = document.getElementsByClassName(val);
    for (let j = 0; j < winClr.length; j++) {
      winClr[j].style.backgroundColor = "green";
    }
  }
  let newGame = document.querySelector(".btn");
  newGame.classList.remove("hide");
  let overlay = document.querySelector(".overlay");
  overlay.classList.remove("main");
  no_winner = false;
  if (win_info === 1) {
    let win_team = document.querySelector(".info");
    win_team.textContent = "Player-X-Wins";
  } else {
    let win_team = document.querySelector(".info");
    win_team.textContent = "Player-Y-Wins";
  }
}
function checkWinner(arr) {
  for (let i = 0; i < winning_pos.length; i++) {
    let temp_arr = winning_pos[i];
    let num = 0;
    for (let j = 0; j < temp_arr.length; j++) {
      let val = temp_arr[j];
      if (arr[val] === true) {
        num++;
      }
    }
    if (num === 3) {
      return temp_arr;
    }
  }
  if (count === 9) {
    let newGame = document.querySelector(".btn");
    newGame.classList.remove("hide");
    count = 0;
  }
  return null;
}
const size = 9;
let xWin = [];
let yWin = [];
for (let i = 0; i < size; i++) {
  xWin.push(false);
  yWin.push(false);
}
const collection = new Set();
function for_zero(className) {
  let boxNo = document.querySelector("." + className);
  let validate = collection.has(className);
  let increase = false;
  if (!validate) {
    boxNo.textContent = "X";
    increase = true;
    let check = data[className];
    xWin[check] = true;
    let win = checkWinner(xWin);
    if (win !== null) {
      win_info = 1;
      winner(win);
    }
    if (win_info !== 1) {
      let swap_player = document.querySelector(".info");
      swap_player.textContent = "Current Player-Y";
    }
    count++;
  }
  collection.add(className);
  return increase;
}
function for_One(className) {
  let boxNo = document.querySelector("." + className);
  let validate = collection.has(className);
  let increase = false;
  if (!validate) {
    boxNo.textContent = "O";
    increase = true;
    let check = data[className];
    yWin[check] = true;
    let win = checkWinner(yWin);
    if (win !== null) {
      win_info = 2;
      winner(win);
    }
    if (win_info !== 2) {
      let swap_player = document.querySelector(".info");
      swap_player.textContent = "Current Player-X";
    }
    count++;
  }
  collection.add(className);
  return increase;
}
let num = 1;
const boxes = document.querySelectorAll(".box");
boxes.forEach((box) => {
  box.addEventListener("click", () => {
    const className = box.classList[0];
    let val1 = false;
    let val2 = false;
    if (num % 2 !== 0 && no_winner === true) {
      val1 = for_zero(className);
    } else if (num % 2 === 0 && no_winner === true) {
      val2 = for_One(className);
    }
    if (val1 === true || val2 === true) {
      num++;
    }
  });
});
let newStart = document.querySelector(".btn");
newStart.addEventListener("click", function () {
  let clearPanel = document.querySelectorAll(".box");
  for (let i = 0; i < clearPanel.length; i++) {
    clearPanel[i].textContent = "";
    clearPanel[i].style.backgroundColor = "rgba(0,0,0,0)";
  }
  collection.clear();
  for (let i = 0; i < xWin.length; i++) {
    xWin[i] = false;
    yWin[i] = false;
  }
  no_winner = true;
  num = 1;
  count = 1;
  win_info = 0;
  newStart.classList.add("hide");
  let swap_player = document.querySelector(".info");
  swap_player.textContent = "Current Player-X";
});
