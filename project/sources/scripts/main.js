import DragAndDropManager from './drag_drop.js';

import { DEBUG, CELL_STATES, FLOWER_TYPES } from './constants.js';
import { loadLevel } from './board.js';

//Run the init() function when the page has loaded
window.addEventListener('DOMContentLoaded', init);

//declare variables
let handCells;
let gridCells;
let levelCounter = 1;
const ROWS = 4, COLS = 6;

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
    buildGrid();

    handCells = document.querySelectorAll('#hand-container .hand-cell');
    gridCells = document.querySelectorAll('#grid-container .grid-cell');
    // dropTargets = document.querySelectorAll('.grid-cell, .hand-cell');
    loadLevel(2);

    // Add mouse down listener to the document to start dragging on any card
    // document.addEventListener('mousedown', handleMouseDown);
    const dndManager = new DragAndDropManager(handCells, gridCells);
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
