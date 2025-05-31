import { DEBUG, CELL_STATES, FLOWER_TYPES } from './constants.js';

const ROWS = 4, COLS = 6;

//initalizes the 2d array board to be null
// TODO: use level loading to initialize the board - Arul
const BOARD = [];
for (let i = 0; i < ROWS; i++) {
    BOARD[i] = [];
    for (let j = 0; j < COLS; j++) {
        BOARD[i][j] = null;
    }
}

/**
 * Applies the effect of a played card on the board at position given by cell
 * using the given type.
 * 
 * @param {String} cell: a string with representation 'x-y'
 * @param {String} type: a character representing the type of card 
 */
function changeBoard(cell, type) {
    const [x, y] = cell.id.split('-').map(Number);

    let offsets = [];
    // switch statement for readability
    switch(type) {
    case FLOWER_TYPES.PLUS:
        offsets = [[1,0], [-1,0], [0,1], [0,-1]];
    case FLOWER_TYPES.CROSS:
        offsets = [[1,1], [1,-1], [-1,1], [-1,-1]];
    case FLOWER_TYPES.SQUARE:
        offsets = [[1,0], [-1,0], [0,1], [0,-1], [1,1], [1,-1], [-1,1], [-1,-1]];
    default:
        if(DEBUG) {
            console.log('Unsupported Flower Type Used: ' + type);
        }       
    }

    for (let [dx,dy] of offsets) {
        //calculate the new position for x and y
        const nx = x + dx, ny = y + dy;

        //if the new position is out of bounds, continue
        if (nx < 0 || nx >= COLS || ny < 0 || ny >= ROWS) {
            continue;
        }

        //target new position and change color
        const cell = document.getElementById(`${nx}-${ny}`);
        if (!cell.querySelector('.card')) {
            BOARD[ny][nx] = CELL_STATES.CLEAR;
            cell.dataset.cellState = CELL_STATES.CLEAR;
            cell.style.backgroundColor = 'green';
        }
    };
}

export { ROWS, COLS, BOARD, changeBoard };