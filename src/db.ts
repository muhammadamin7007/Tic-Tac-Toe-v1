export const gameState = {
    board: Array(9).fill(null), // 3x3 doska uchun 9 element
    history: [Array(9).fill(null)], // Har bir yurish tarixi
    stepNumber: 0, // Hozirgi qadam
    xIsNext: true, // X yoki O yurishi
  };
  
  // O‘yin holatini localStorage-ga saqlash
  export function saveGameState() {
    localStorage.setItem("ticTacToeGame", JSON.stringify(gameState));
  }
  
  // LocalStorage'dan yuklash
  export function loadGameState() {
    const savedState = localStorage.getItem("ticTacToeGame");
    if (savedState) {
      Object.assign(gameState, JSON.parse(savedState));
    }
  }
  