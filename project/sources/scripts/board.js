import { ROWS, COLS, DEBUG, CELL_STATES, FLOWER_TYPES, LEVELS } from './constants.js';


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
 * Remove/reset existing cards on board
 */
function clearBoard() {
    // HACK: just set innerhtml because i am lazy =)
    let gridCells = document.getElementById('grid-container').children;
    for (let i = 0; i < gridCells.length; i++) {
        gridCells[i].innerHTML = '';
        gridCells[i].classList.remove('has-card');
    }

}

/**
 * Remove/reset existing cards in hand
 */
function clearCards() {
    // HACK: just set innerhtml because i am lazy =)
    let handContainer = document.getElementById('hand-container');
    handContainer.innerHTML = 
    `<div class="hand-cell"></div>
    <div class="hand-cell"></div>
    <div class="hand-cell"></div>
    <div class="hand-cell"></div>
    <div class="hand-cell"></div>
    <div class="hand-cell"></div>`;

}

/**
 * Loads a new level
 * 
 * @param {number} levelNumber: a number representing the level to be loaded
 */
function loadLevel(levelNumber) {
    // let's get the object that represents the level
    const levelObj = LEVELS[levelNumber];
    const levelBoard = levelObj.LAYOUT;
    console.log(levelBoard);
    const levelCards = levelObj.CARDS;
    
    // update internal representation
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
    clearBoard();
    drawBoard();
    
    // remove existing cards
    clearCards();
    
    // load the cards (format: cardname=PLUS)
    for (let cardname of levelCards) {
        if(FLOWER_TYPES[cardname]) {
            createCard(FLOWER_TYPES[cardname]);
        }
        else {
            createCard(cardname);
        }
    }
}
/**
 * Creates a card in hand with a given string as the cardname
 * This cardname will determine the type of card and what actions it can do.
 * 
 * @param {String} cardname: a string with the new card's name 
 */
function createCard(text) {
    let handCells = document.querySelectorAll('#hand-container .hand-cell');
    if (DEBUG) {
        console.log('CREATING CARDS');
    }
    const card = document.createElement('div');
    card.classList.add('card');
    card.textContent = text;
    card.dataset.type = text;

    //finds first empty hand cell to add card to
    for (let h of handCells) {
        if (h.classList.contains('has-card')) {
            if (DEBUG) {
                console.log('EXIT');
            }
            continue;
        }
        h.appendChild(card);
        h.classList.add('has-card');
        if (DEBUG) {
            console.log('CARD ADDED');
        }
        break;
    }
    return card;
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
    case FLOWER_TYPES.KNIGHT:
        offsets = [[2,1], [1,2], [-2,1], [1,-2], [2,-1], [-1,2], [-2,-1], [-1,-2]];
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
        if (!cell.querySelector('.card') && BOARD[ny][nx] == CELL_STATES.CORRUPT) {
            BOARD[ny][nx] = CELL_STATES.GRASS;
            cell.dataset.cellState = CELL_STATES.GRASS;
        }
    };
    drawBoard();
}



export { BOARD, changeBoard, loadLevel, clearBoard };