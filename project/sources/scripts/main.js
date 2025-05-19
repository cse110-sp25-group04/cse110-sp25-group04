const COLS = 7;
const ROWS = 7;

let board = [];

// Generate an empty board (ROWSxCOLS) and then render it
function generateBoard() {
    board = Array.from({ length: ROWS }, () => Array(COLS).fill(null));
    renderBoard();
}

/**
 * Render the current board array into the #grid-container
 * Each cell has a <div> with a class "grid-cell"
 * id "x-y"
 * content of board[y][x] or empty if null
 */
function renderBoard() {
    const container = document.getElementById('grid-container');
    container.innerHTML = '';

    for (let y = 0; y < ROWS; y++) {
        for (let x = 0; x < COLS; x++) {
            const cell = document.createElement('div');
            cell.className = 'grid-cell';
            cell.id = `${x}-${y}`;
            if (board[y][x] !== null) {
                cell.textContent = board[y][x];
            } else {
                cell.textContent = '';
            }
            container.appendChild(cell);
        }
    }
}

/**
 * Intializes board and attaches listeners to new, save, and load buttons 
 * Generates inital empty board
 */
function init() {
    document.getElementById('new-board').addEventListener('click', generateBoard);

    document.getElementById('save-board').addEventListener('click', function() {
        localStorage.setItem('boardState', JSON.stringify(board));
        alert('Board saved!');
    });

    document.getElementById('load-board').addEventListener('click', function() {
        const saved = localStorage.getItem('boardState');
        if (!saved) {
            alert('No saved board found.');
            return;
        }
        board = JSON.parse(saved);
        renderBoard();
    });
    
    generateBoard();
}

document.addEventListener('DOMContentLoaded', init);