import { DEBUG, CELL_STATES, FLOWER_TYPES, LEVELS } from './constants.js';

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
 * Draw board based on internal representation 
 */
function drawBoard() {
    for (let r = 0; r < ROWS; r++) {
        for (let c = 0; c < COLS; c++) {
            // we will have something like BOARD[r][c] = CELL_STATES.GRASS;
            const cell = document.getElementById(`${c}-${r}`);              
            cell.dataset.cellState = BOARD[r][c];
            // don't need to do recoloring logic if a card isn't there
            if (!cell.querySelector('.card')) {
                // styling logic can be applied here
                switch(BOARD[r][c]) {
                    case CELL_STATES.CORRUPT:
                        cell.style.backgroundColor = 'purple';
                        break;
                    case CELL_STATES.GRASS:
                        cell.style.backgroundColor = 'green';
                        break;
                    case CELL_STATES.ROCK:
                        cell.style.backgroundColor = 'gray';
                        break;
                    case CELL_STATES.FLOWER:
                        // this case shouldn't be reached if a card isn't there
                        if (DEBUG) {
                            console.log(`Unreachable cell type reached at (${r},${c}).`);
                        }
                        break;
                    default:
                        if (DEBUG) {
                            console.log('Unknown cell type in internal representation: ' + BOARD[r][c]);
                        }
                        break;       
                }
            }
        }
    }
    
}

/**
 * Loads a new level
 * 
 * @param {String} levelName: a string with the internal level name
 */
function loadLevel(levelName) {
    // let's get the object that represents the level
    const levelObj = LEVELS[levelName];
    const levelBoard = levelObj.LAYOUT;
    console.log(levelBoard);
    const levelCards = levelObj.CARDS;
    for (let r = 0; r < ROWS; r++) {
        for (let c = 0; c < COLS; c++) {
            // load in correct value for each cell
            switch (levelBoard[r][c]) {
            case 'C':
                BOARD[r][c] = CELL_STATES.CORRUPT;
                break;
            case 'G':
                BOARD[r][c] = CELL_STATES.GRASS;
                break;
            case 'R':
                BOARD[r][c] = CELL_STATES.ROCK;
                break;
            case 'F':
                if (DEBUG) {
                    console.log('Flowers should not be put in the level at the start.');
                }
                BOARD[r][c] = CELL_STATES.ROCK;
                break;
            default:
                if (DEBUG) {
                    console.log('Unknown cell type in level loaded: ' + levelBoard[r][c]);
                }
                break;
            }
        }
    }
    // update the board visuals
    drawBoard();
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
        break;
    case FLOWER_TYPES.CROSS:
        offsets = [[1,1], [1,-1], [-1,1], [-1,-1]];
        break;
    case FLOWER_TYPES.SQUARE:
        offsets = [[1,0], [-1,0], [0,1], [0,-1], [1,1], [1,-1], [-1,1], [-1,-1]];
        break;
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
        // nx is column, ny is row
        const cell = document.getElementById(`${nx}-${ny}`);
        if (!cell.querySelector('.card')) {
            BOARD[ny][nx] = CELL_STATES.GRASS;
            cell.dataset.cellState = CELL_STATES.GRASS;
            cell.style.backgroundColor = 'green';
        }
    };
}

export { ROWS, COLS, BOARD, changeBoard, loadLevel };