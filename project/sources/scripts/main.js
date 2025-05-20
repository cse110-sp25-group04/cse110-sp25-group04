const COLS = 7;
const ROWS = 7;

/**
 * CHANGES: PLACE GLOBAL VARIABLES IN AN INIT() FUNCTION
 */
let board = [];

/**
 * CHANGES: EXTRACT HELPER FUNCTIONS TO ANOTHER .js FILE
 */
/**
 * CHANGES: DOCUMENTATION MUST BE DONE WITH JSDOC SYNTAX
 */
// Generate an empty board (ROWSxCOLS) and then render it
// Each cell contains either 'grass', 'rock', or 'corrupt' tile 
// and will be generated randomly with approximately the same probabilities
function generateBoard() {
    const states = ['green', 'purple', 'orange'];
    
    /**
     * NO ARROW FUNCTIONS!
     * 
     * The spacing between { legnth: ROWS } must be 0
     */
    board = Array.from({ length: ROWS }, () => //Array(COLS).fill(null));
        Array.from({ length: COLS }, () => 
            states[Math.floor(Math.random() * states.length)]
        )
    );
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

    /** 
     * extract into a halper function and pass in ROWS and COLS
     */
    for (let y = 0; y < ROWS; y++) {
        for (let x = 0; x < COLS; x++) {
            const cell = document.createElement('div');
            cell.className = 'grid-cell';
            cell.id = `${x}-${y}`;
            if (board[y][x] !== null) {
                cell.textContent = board[y][x];
                cell.style.backgroundColor = board[y][x];
            } else {
                cell.textContent = '';
                cell.style.backgroundColor = '';
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
    /**
     * Place globals here and pass them around to the functions 
     * to not corrupt the DOM
     */
    
    document.getElementById('new-board').addEventListener('click', generateBoard);

    document.getElementById('save-board').addEventListener('click', function () {
        localStorage.setItem('boardState', JSON.stringify(board));
        alert('Board saved!');
    });

    document.getElementById('load-board').addEventListener('click', function () {
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