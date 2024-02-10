export function generateSudoku(difficulty: number): number[] {
  const emptyBoard = Array(81).fill(0);

  // Helper function to shuffle an array
  function shuffleArray(array: number[]): void {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      //@ts-ignore
      [array[i], array[j]] = [array[j], array[i]];
    }
  }

  // Fill the first row of the board with shuffled numbers 1 through 9
  const firstRow = Array.from({ length: 9 }, (_, i) => i + 1);
  shuffleArray(firstRow);
  for (let i = 0; i < 9; i++) {
    emptyBoard[i] = firstRow[i];
  }

  // Helper function to check if a number is valid to be placed in a cell
  function isValid(
    board: number[],
    row: number,
    col: number,
    num: number
  ): boolean {
    // Check row
    for (let i = 0; i < 9; i++) {
      if (board[row * 9 + i] === num) {
        return false;
      }
    }
    // Check column
    for (let i = 0; i < 9; i++) {
      if (board[i * 9 + col] === num) {
        return false;
      }
    }
    // Check 3x3 grid
    const startRow = Math.floor(row / 3) * 3;
    const startCol = Math.floor(col / 3) * 3;
    for (let i = startRow; i < startRow + 3; i++) {
      for (let j = startCol; j < startCol + 3; j++) {
        if (board[i * 9 + j] === num) {
          return false;
        }
      }
    }
    return true;
  }

  // Helper function to solve the Sudoku
  function solve(board: number[]): boolean {
    for (let i = 0; i < 81; i++) {
      if (board[i] === 0) {
        for (let num = 1; num <= 9; num++) {
          if (isValid(board, Math.floor(i / 9), i % 9, num)) {
            board[i] = num;
            if (solve(board)) {
              return true;
            }
            board[i] = 0;
          }
        }
        return false;
      }
    }
    return true;
  }

  // Helper function to remove numbers based on difficulty
  function removeNumbers(board: number[], difficulty: number): void {
    const numToRemove = difficulty === 1 ? 25 : difficulty === 2 ? 35 : 45;
    let count = 0;
    while (count < numToRemove) {
      const index = Math.floor(Math.random() * 81);
      if (board[index] !== 0) {
        board[index] = 0;
        count++;
      }
    }
  }

  // Create a solved Sudoku
  solve(emptyBoard);

  // Remove numbers based on difficulty
  removeNumbers(emptyBoard, difficulty);

  return emptyBoard;
}

export function solveSudoku(puzzle: number[]): number[] | null {
  // Helper function to check if a number is valid to be placed in a cell
  function isValid(
    board: number[],
    row: number,
    col: number,
    num: number
  ): boolean {
    // Check row
    for (let i = 0; i < 9; i++) {
      if (board[row * 9 + i] === num && i !== col) {
        return false;
      }
    }
    // Check column
    for (let i = 0; i < 9; i++) {
      if (board[i * 9 + col] === num && i !== row) {
        return false;
      }
    }
    // Check 3x3 grid
    const startRow = Math.floor(row / 3) * 3;
    const startCol = Math.floor(col / 3) * 3;
    for (let i = startRow; i < startRow + 3; i++) {
      for (let j = startCol; j < startCol + 3; j++) {
        if (board[i * 9 + j] === num && (i !== row || j !== col)) {
          return false;
        }
      }
    }
    return true;
  }

  // Helper function to solve the Sudoku
  function solve(board: number[]): boolean {
    for (let i = 0; i < 81; i++) {
      const row = Math.floor(i / 9);
      const col = i % 9;
      if (board[i] === 0) {
        for (let num = 1; num <= 9; num++) {
          if (isValid(board, row, col, num)) {
            board[i] = num;
            if (solve(board)) {
              return true;
            }
            board[i] = 0;
          }
        }
        return false;
      }
    }
    return true;
  }

  const solution = puzzle.slice(); // Copy puzzle array
  if (solve(solution)) {
    return solution;
  }
  return null; // If no solution found
}

console.log(generateSudoku(1));
// console.log(generateSudoku(2));
// console.log(generateSudoku(3));
