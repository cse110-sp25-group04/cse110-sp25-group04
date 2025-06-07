import { ROWS, COLS, DEBUG, CELL_STATES, FLOWER_TYPES, LEVELS } from './constants.js';

/**
 * 2D array matching ROWSxCOLS, intializes as NULL 
 */
const BOARD = [];
for (let i = 0; i < ROWS; i++) {
    BOARD[i] = [];
    for (let j = 0; j < COLS; j++) {
        BOARD[i][j] = null;
    }
}

/**
 * Syncs cell's DOM with interal board array, BOARD[r][c] 
 */
function drawBoard() {
    for (let r = 0; r < ROWS; r++) {
        for (let c = 0; c < COLS; c++) {
            const cell = document.getElementById(`${c}-${r}`);              
            cell.dataset.cellState = BOARD[r][c];

            // Only recolor empty cells
            if (!cell.querySelector('.card')) {
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
 * Remove all card elements from the grid
 */
function clearBoard() {
    let gridCells = document.getElementById('grid-container').children;
    for (let i = 0; i < gridCells.length; i++) {
        gridCells[i].innerHTML = '';
        gridCells[i].classList.remove('has-card');
    }

}

/**
 * Removes all card elements from the hands
 */
function clearCards() {
    let handCells = document.querySelectorAll('.hand-cell');
    for (let h of handCells) {
        h.innerHTML = '';
        h.classList.remove('has-card');
    }
}

/**
 * Populate BOARD then rebuild the DOM grid, clear and recreate
 * hand cards for levels
 * 
 * @param {number} levelNumber - Index of the level to load.
 */
function loadLevel(levelNumber) {
    const levelObj = LEVELS[levelNumber];
    const levelBoard = levelObj.LAYOUT;
    console.log(levelBoard);
    const levelCards = levelObj.CARDS;
    const numCards = levelCards.length;

    // Generate the hand
    buildHand(numCards);

    // Update internal representation
    for (let r = 0; r < ROWS; r++) {
        for (let c = 0; c < COLS; c++) {
            // Load in correct value for each cell
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
    
    // Update the board visuals
    clearBoard();
    drawBoard();
    
    // Remove existing cards
    clearCards();
    
    // Load the cards (format: cardname=PLUS)
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
 * @param {string} text a string with the new card's name 
 * @returns {HTMLElement} The newly created card element
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

    // Finds first empty hand cell to add card to
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
 * Generates the players hand dynamically given number of cards for level
 * 
 * @param {number} num a number of handcells to generate
 */
function buildHand(num) {
    
    const handContainer = document.getElementById('hand-container');
    handContainer.innerHTML = '';
    // Ensures hand container is correct size
    handContainer.style.gridTemplateColumns = `repeat(${num}, 1fr)`;
    handContainer.style.maxWidth = `calc(${num} * var(--card-max-width))`;
    if (DEBUG) {
        console.log('CREATING HAND');
    }
    // Creates a hand cell for each card
    for (let i = 0; i < num; i++) {
        const handCell = document.createElement('div');
        handCell.classList.add('hand-cell');
        handContainer.appendChild(handCell);
    }
}

/**
 * Applies the effect of a played card on the board at position given by cell
 * using the given type.
 * 
 * @param {String} cell a string with representation 'x-y'
 * @param {String} type a character representing the type of card
 * @returns {Array<{x: number, y: number}>} Array of new positions
 */
function changeBoard(cell, type) {
    const [x, y] = cell.id.split('-').map(Number);

    let offsets = [];
    // Switch statement for readability
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

    const history = [];
    for (let [dx,dy] of offsets) {
        // Calculate the new position for x and y
        const nx = x + dx, ny = y + dy;

        // If the new position is out of bounds, continue
        if (nx < 0 || nx >= COLS || ny < 0 || ny >= ROWS) {
            continue;
        }

        // Target new position and change color
        // nx is column, ny is row
        const cell = document.getElementById(`${nx}-${ny}`);
        if (!cell.querySelector('.card') && BOARD[ny][nx] == CELL_STATES.CORRUPT) {
            BOARD[ny][nx] = CELL_STATES.GRASS;
            cell.dataset.cellState = CELL_STATES.GRASS;
            history.push({x: nx, y: ny});
        }
    };

    drawBoard();
    return history;
}

export { BOARD, changeBoard, loadLevel, drawBoard, buildHand, createCard };
