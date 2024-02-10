"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.solveSudoku = exports.generateSudoku = void 0;
function generateSudoku(difficulty) {
    var emptyBoard = Array(81).fill(0);
    // Helper function to check if a number is valid to be placed in a cell
    function isValid(board, row, col, num) {
        // Check row
        for (var i = 0; i < 9; i++) {
            if (board[row * 9 + i] === num) {
                return false;
            }
        }
        // Check column
        for (var i = 0; i < 9; i++) {
            if (board[i * 9 + col] === num) {
                return false;
            }
        }
        // Check 3x3 grid
        var startRow = Math.floor(row / 3) * 3;
        var startCol = Math.floor(col / 3) * 3;
        for (var i = startRow; i < startRow + 3; i++) {
            for (var j = startCol; j < startCol + 3; j++) {
                if (board[i * 9 + j] === num) {
                    return false;
                }
            }
        }
        return true;
    }
    // Helper function to solve the Sudoku
    function solve(board) {
        for (var i = 0; i < 81; i++) {
            if (board[i] === 0) {
                for (var num = 1; num <= 9; num++) {
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
    function removeNumbers(board, difficulty) {
        var numToRemove = difficulty === 1 ? 25 : difficulty === 2 ? 35 : 45;
        var count = 0;
        while (count < numToRemove) {
            var index = Math.floor(Math.random() * 81);
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
exports.generateSudoku = generateSudoku;
function solveSudoku(puzzle) {
    // Helper function to check if a number is valid to be placed in a cell
    function isValid(board, row, col, num) {
        // Check row
        for (var i = 0; i < 9; i++) {
            if (board[row * 9 + i] === num && i !== col) {
                return false;
            }
        }
        // Check column
        for (var i = 0; i < 9; i++) {
            if (board[i * 9 + col] === num && i !== row) {
                return false;
            }
        }
        // Check 3x3 grid
        var startRow = Math.floor(row / 3) * 3;
        var startCol = Math.floor(col / 3) * 3;
        for (var i = startRow; i < startRow + 3; i++) {
            for (var j = startCol; j < startCol + 3; j++) {
                if (board[i * 9 + j] === num && (i !== row || j !== col)) {
                    return false;
                }
            }
        }
        return true;
    }
    // Helper function to solve the Sudoku
    function solve(board) {
        for (var i = 0; i < 81; i++) {
            var row = Math.floor(i / 9);
            var col = i % 9;
            if (board[i] === 0) {
                for (var num = 1; num <= 9; num++) {
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
    var solution = puzzle.slice(); // Copy puzzle array
    if (solve(solution)) {
        return solution;
    }
    return null; // If no solution found
}
exports.solveSudoku = solveSudoku;
console.log(generateSudoku(1));
console.log(solveSudoku(generateSudoku(1)).join(""));
