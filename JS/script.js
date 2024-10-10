const containerElement = document.querySelector(".container");
const boxesElement = document.querySelectorAll(".box");
const resetBtnElement = document.getElementById("reset-btn");
const messageContainerElement = document.querySelector(".message-container");
const paragraphElement = document.querySelector(".message-container > p");
const newGamebtnElement = document.getElementById("new-game-btn");

let turnO = true;

const winPatterns = [
  [0, 1, 2],
  [0, 3, 6],
  [0, 4, 8],
  [1, 4, 7],
  [2, 5, 8],
  [2, 4, 6],
  [3, 4, 5],
  [6, 7, 8],
];

let count = 0;
boxesElement.forEach((box) => {
  box.addEventListener("click", () => {
    if (turnO) {
      box.innerText = "O";
      box.style.color = "rgb(255,20,80)";
      turnO = false;
    } else {
      box.innerText = "X";
      box.style.color = "darkred";
      turnO = true;
    }

    count++;
    box.disabled = true;
    checkWinner();
  });
});

const disableBoxes = () => {
  for (const box of boxesElement) {
    box.disabled = true;
  }
};

const showWinner = (winner, count) => {
  setTimeout(() => {
    paragraphElement.innerText = `Congratulations! Winner is ${winner}`;
    messageContainerElement.classList.remove("hide");
    containerElement.classList.add("hide");
  }, 1000);
  disableBoxes();
};

const checkWinner = () => {
  for (const pattern of winPatterns) {
    const post1Val = boxesElement[pattern[0]].innerText;
    const post2Val = boxesElement[pattern[1]].innerText;
    const post3Val = boxesElement[pattern[2]].innerText;

    if (post1Val != "" && post2Val != "" && post3Val != "") {
      if (post1Val === post2Val && post2Val === post3Val) {
        for (let i = 0; i < 3; i++) {
          boxesElement[pattern[i]].style.color = "green";
        }
        showWinner(post1Val);
        count--;
      }
    }
  }
  if(count === 9)
  {
    setTimeout(() => {
      paragraphElement.innerText = `Draw! Try again`;
      messageContainerElement.classList.remove("hide");
      containerElement.classList.add("hide");
    },1000);
  }
};

const resetGame = () => {
  for (const box of boxesElement) {
    box.innerText = "";
    box.disabled = false;
    count = 0 ;
  }
};

resetBtnElement.addEventListener("click", () => {
  resetGame();
});

newGamebtnElement.addEventListener("click", () => {
  resetGame();
  messageContainerElement.classList.add("hide");
  containerElement.classList.remove("hide");
});
