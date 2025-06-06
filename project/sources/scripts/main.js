import DragAndDropManager from './drag_drop.js';

import { ROWS, COLS, DEBUG, CELL_STATES, FLOWER_TYPES, LEVELS, WIN_AUDIO } from './constants.js';
import { loadLevel } from './board.js';

//Run the init() function when the page has loaded
window.addEventListener('DOMContentLoaded', init);

//declare variables
let handCells;
let gridCells;
let levelCounter;
let highestLevelReached;
let dndManager;

function buildGrid() {
    const container = document.getElementById('grid-container');
    container.innerHTML = '';
    for (let y = 0; y < ROWS; y++) {
        for (let x = 0; x < COLS; x++) {
            const cell = document.createElement('div');
            cell.className = 'grid-cell';
            cell.id = `${x}-${y}`;
            cell.dataset.cellState = CELL_STATES.ROCK;
            // dataset.cellState -> data-cell-state attribute
            // for now just default cell state to rock until we do level loading stuff
            container.appendChild(cell);
        }
    }
}

//Starts the program
function init() {
    // build the grid cells
    buildGrid();

    // get the level from localStorage
    levelCounter = getLevelNumber();
    loadLevel(levelCounter);

    highestLevelReached = getHighestLevelReached();

    // creates listeners for previous/next/reset
    createControlListeners();

    // Add mouse down listener to the document to start dragging on any card
    // document.addEventListener('mousedown', handleMouseDown);
    handCells = document.querySelectorAll('#hand-container .hand-cell');
    gridCells = document.querySelectorAll('#grid-container .grid-cell');
    dndManager = new DragAndDropManager(handCells, gridCells);
    
    
    const winButton = document.querySelector("#win");
    winButton.addEventListener('click', function() {
        WIN_AUDIO.play();
    });
}

//Throttles function to reduce lag from running too quickly
function throttle(func, limit) {
    let inThrottle;
    return function () {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            //gets correct event and this from args and context respectively
            func.apply(context, args);
            inThrottle = true;
            setTimeout (function () {
                inThrottle = false;
            }, limit);
        }
    };
}

function createControlListeners() {
    // Add previous/next level button listeners
    const prevButton = document.getElementById('previous-level');
    const nextButton = document.getElementById('next-level');
    const resetButton = document.getElementById('reset');
    const resetLSButton = document.getElementById('reset-local-storage');
    const undoButton = document.getElementById('undo');

    prevButton.addEventListener('click', function () {
        if(levelCounter <= 0) return;
        levelCounter -= 1;
        localStorage.setItem('level-number', levelCounter);
        loadLevel(levelCounter);
        if (dndManager) { dndManager.moveHistory = []; }
    });

    nextButton.addEventListener('click', function () {
        if(levelCounter >= highestLevelReached) return;
        levelCounter += 1;
        localStorage.setItem('level-number', levelCounter);
        loadLevel(levelCounter);
        if (dndManager) { dndManager.moveHistory = []; }
    });

    resetButton.addEventListener('click', function () {
        loadLevel(levelCounter);
        if (dndManager) { dndManager.moveHistory = []; }
    });

    resetLSButton.addEventListener('click', function () {
        localStorage.clear();
        if (dndManager) { dndManager.moveHistory = []; }
    });

    undoButton.addEventListener('click', () => {
        if (dndManager) { dndManager.undo(); }
    });
}

function getLevelNumber() {
    if (localStorage.getItem('level-number')) {
        return Number(localStorage.getItem('level-number'));
    }
    else {
        localStorage.setItem('level-number', 0);
        return 0;
    }
}

function getHighestLevelReached() {
    if (localStorage.getItem('highest-level')) {
        return Number(localStorage.getItem('highest-level'));
    }
    else {
        localStorage.setItem('highest-level', 0);
        return 0;
    }
}

// Is this the right place for these functions?


// Function to handle win check
export { checkGameStatus };
function checkGameStatus() {

    let handCells = document.querySelectorAll('#hand-container .hand-cell');
    let gridCells = document.querySelectorAll('#grid-container .grid-cell');

    // if there is still purple and user's hand is empty we can have a loss screen or offer a reset as they have failed the puzzle
    let hasCards = false;
    for (const h of handCells) {
        if (h.classList.contains('has-card') === true) {
            if (DEBUG) {
                console.log('Player has cards');
            }
            hasCards = true;
            break;
        }
    }

    // check if there is corrupt left
    for (const g of gridCells) {
        if (g.dataset.cellState === CELL_STATES.CORRUPT) {
            if (DEBUG) {
                console.log('Purple Tile Detected');
            }
            if (hasCards) {
                // corrupt left + cards = keep going
                return;
            }
            else {
                // corrupt left + no cards = lose
                handleLevelFailed();
                return;
            }
        }
    }

    // no corrupt left
    handleLevelPassed();
    return;
}

// Handle level success
function handleLevelPassed() {
    alert('Level Passed');
    if(levelCounter >= LEVELS.length-1) {
        alert('Completed all existing levels, congrats!');
    };
    levelCounter += 1;
    localStorage.setItem('level-number', levelCounter);
    loadLevel(levelCounter);
    if (dndManager) { dndManager.moveHistory = []; }
    
    // only update highestLevelReached here (no cheating!)
    // check localstorage value + new levelcounter
    highestLevelReached = Math.max(getHighestLevelReached(), levelCounter);
    localStorage.setItem('highest-level', highestLevelReached);
}

// Handle level failure
function handleLevelFailed() {
    alert('Level Failed');
    // reload level
    loadLevel(levelCounter);
    if (dndManager) { dndManager.moveHistory = []; }
}