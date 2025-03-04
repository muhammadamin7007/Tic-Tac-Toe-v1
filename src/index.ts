import { gameState, saveGameState, loadGameState } from "./db";
import { board, winnerText, movesList, resetButton } from "./elements";

// ✅ O‘yin yuklanganda localStorage'dan holatni yuklash
loadGameState();
renderBoard();

// 📌 🏆 G‘olibni tekshirish
function checkWinner(): void {
  const winningCombinations = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Horizontal
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Vertical
    [0, 4, 8], [2, 4, 6]             // Diagonal
  ];

  for (let [a, b, c] of winningCombinations) {
    if (gameState.board[a] && gameState.board[a] === gameState.board[b] && gameState.board[a] === gameState.board[c]) {
      winnerText.innerText = `🏆 G‘olib: ${gameState.board[a]}!`;
      return;
    }
    if (!gameState.board.includes(null)) {
      winnerText.textContent = "🤝 Durrang!";
  }
  }
}

// 📌 🎯 Bosilgan katakka X yoki O qo‘yish
function handleClick(index: number) {
  if (gameState.board[index] || winnerText.innerText) return; // Agar o‘yin tugagan bo‘lsa

  gameState.board[index] = gameState.xIsNext ? "X" : "O";
  gameState.xIsNext = !gameState.xIsNext;
  
  // ✅ Tarixga qo‘shish
  gameState.history = gameState.history.slice(0, gameState.stepNumber + 1);
  gameState.history.push([...gameState.board]);
  gameState.stepNumber++;

  saveGameState();
  renderBoard();
}

// 📌 📜 O‘yin doskasini qayta chizish
function renderBoard() {
  board.querySelectorAll(".cell").forEach((cell, index) => {
    cell.textContent = gameState.board[index];
    cell.addEventListener("click", () => handleClick(index));
  });

  checkWinner();
  updateHistoryButtons();
}

// 📌 🔄 Tarixdagi istalgan qadamga qaytish
function jumpToStep(step: number) {
  gameState.stepNumber = step;
  gameState.board = [...gameState.history[step]];
  gameState.xIsNext = step % 2 === 0;
  
  saveGameState();
  renderBoard();
}

// 📌 🔢 Tarixdagi barcha yurishlarni chiqarish
function updateHistoryButtons() {
  movesList.innerHTML = "";

  for (let i = 0; i < gameState.history.length; i++) {
    const button = document.createElement("button");
    button.innerText = `Go to move #${i}`;
    button.classList.add("history-btn");

    if (i === gameState.stepNumber) {
      button.disabled = true; // Joriy bosqichni o‘chirish
    }

    button.addEventListener("click", () => jumpToStep(i));
    movesList.appendChild(button);
  }
}

// 📌 🔄 O‘yinni qayta boshlash
resetButton.addEventListener("click", () => {
  gameState.board = Array(9).fill(null);
  gameState.history = [Array(9).fill(null)];
  gameState.stepNumber = 0;
  gameState.xIsNext = true;

  saveGameState();
  renderBoard();
});

// O‘yinni yuklash
renderBoard();
