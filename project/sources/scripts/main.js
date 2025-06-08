import DragAndDropManager from './drag_drop.js';
import Modal from './transition.js';

import { ROWS, COLS, DEBUG, CELL_STATES, FLOWER_TYPES, LEVELS, WIN, LOSE, } from './constants.js';
import { loadLevel } from './board.js';

// Run the init() function when the page has loaded
window.addEventListener('DOMContentLoaded', init);

// Global state
let handCells;
let gridCells;
let levelCounter;
let highestLevelReached;
let undoCounter;
let resetCounter;
let dndManager;
let levelModal;


/**
 * Builds the grid layout based on ROWS and COLS
 * Initializes each cell with default ROCK state
 */
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

/**
 * Initializes game state, builds grid, loads level,
 * sets up listeners and DragAndDropManager.
 */
function init() {
    buildGrid();

    // Get the level from localStorage
    levelCounter = getLevelNumber();
    loadLevel(levelCounter);
    highestLevelReached = getHighestLevelReached();

    // Get undo and reset counters from localStorage
    undoCounter = localStorage.getItem('undo-counter');
    if (undoCounter === null) {
        undoCounter = 0;
        localStorage.setItem('undo-counter', '0');
    }
    else {
        undoCounter = Number(undoCounter);
    }

    resetCounter = localStorage.getItem('reset-counter');
    if (resetCounter === null) {
        resetCounter = 0;
        localStorage.setItem('reset-counter', '0');
    }
    else {
        resetCounter = Number(resetCounter);
    }

    // Create listeners
    createControlListeners();

    handCells = document.querySelectorAll('#hand-container .hand-cell');
    gridCells = document.querySelectorAll('#grid-container .grid-cell');
    dndManager = new DragAndDropManager(handCells, gridCells);

    levelModal = new Modal('.modal', '#modal-text', '#modal-button');   
}

/**
 * Throttles function to reduce lag from running too quickly
 * 
 * @param {Function} func: The function to throttle
 * @param {number} limit: Time to wait before allowing next call
 * @returns {Function} A throttled version
 */
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

/**
 * Adds event listeners for control buttons: previous, next, reset, reset localStorage, undo
 */
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
        if(levelCounter >= highestLevelReached || levelCounter >= LEVELS.length) return;
        levelCounter += 1;
        localStorage.setItem('level-number', levelCounter);
        loadLevel(levelCounter);
        if (dndManager) { dndManager.moveHistory = []; }
    });

    resetButton.addEventListener('click', function () {
        loadLevel(levelCounter);
        if (dndManager) { dndManager.moveHistory = []; }
        resetCounter += 1;
        localStorage.setItem('reset-counter', resetCounter);
    });

    resetLSButton.addEventListener('click', function () {
        localStorage.clear();
        if (dndManager) { dndManager.moveHistory = []; }
    });

    undoButton.addEventListener('click', () => {
        if (dndManager) { dndManager.undo(); }
        undoCounter += 1;
        localStorage.setItem('undo-counter', undoCounter);
    });
}

/**
 * Gets level number from local storage
 * 
 * @returns {number} level number 
 */
function getLevelNumber() {
    if (localStorage.getItem('level-number')) {
        return Number(localStorage.getItem('level-number')) % LEVELS.length;
    }
    else {
        localStorage.setItem('level-number', 0);
        return 0;
    }
}

/**
 * Gets highest level reached from local storage
 * 
 * @returns {number} highest level number reached
 */
function getHighestLevelReached() {
    if (localStorage.getItem('highest-level')) {
        return Number(localStorage.getItem('highest-level')) % LEVELS.length;
    }
    else {
        localStorage.setItem('highest-level', 0);
        return 0;
    }
}

/**
 * Checks game board and hand to determine if the level passed or failed
 */
export { checkGameStatus };
function checkGameStatus() {

    let handCells = document.querySelectorAll('#hand-container .hand-cell');
    let gridCells = document.querySelectorAll('#grid-container .grid-cell');

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

    // Check if CORRUPT is left
    for (const g of gridCells) {
        if (g.dataset.cellState === CELL_STATES.CORRUPT) {
            if (DEBUG) {
                console.log('Purple Tile Detected');
            }
            if (hasCards) {
                return;
            }
            else {
                // corrupt left + no cards = lose
                // calls show() with LOSE and a callback to handleLevelFailed after the transition button is clicked
                levelModal.show(LOSE, handleLevelFailed);
                return;
            }
        }
    }
    // no corrupt left
    // calls show() with WIN and a callback to handleLevelPassed after the transition button is clicked
    levelModal.show(WIN, handleLevelPassed);
    return;
}

/**
 * Called when level has passed, moves to next level 
 */
function handleLevelPassed() {
    if(levelCounter >= LEVELS.length-1) {
        alert('Completed all existing levels, congrats!');
        levelCounter = 0;
        localStorage.setItem('level-number', '0');
        highestLevelReached = 0;
        localStorage.setItem('highest-level', '0');
    };
  
    levelCounter += 1;
    localStorage.setItem('level-number', levelCounter);
    loadLevel(levelCounter);
    if (dndManager) { dndManager.moveHistory = []; }
    
    highestLevelReached = Math.max(getHighestLevelReached(), levelCounter);
    localStorage.setItem('highest-level', highestLevelReached);
}

/**
 * Called when level has failed, reloads current level
 */
function handleLevelFailed() {
    // reload level
    loadLevel(levelCounter);
    if (dndManager) { dndManager.moveHistory = []; }
}

document.addEventListener('DOMContentLoaded', () => {
  const menuEl = document.getElementById('menu');
  const gameEl = document.getElementById('game');
  const startBtn = document.getElementById('start-button');

  startBtn.addEventListener('click', () => {
    // hide menu, reveal game
    menuEl.hidden = true;
    gameEl.hidden = false;
    initGame();
  });
});
