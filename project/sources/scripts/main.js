import DragAndDropManager from './drag_drop.js';

import { DEBUG, CELL_STATES, FLOWER_TYPES } from './constants.js';

//Run the init() function when the page has loaded
window.addEventListener('DOMContentLoaded', init);

//declare variables
let handCells;
let gridCells;
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
    const testCell = gridCells[0];
    testCell.dataset.cellState = CELL_STATES.GRASS;
    testCell.style.backgroundColor = 'green';
    // dropTargets = document.querySelectorAll('.grid-cell, .hand-cell');

    //placeholder
    const card1 = createCard('A♠️');
    const card2 = createCard('K♣️');
    const card3 = createCard('Q♦️');

    createCard(FLOWER_TYPES.PLUS);
    createCard(FLOWER_TYPES.CROSS);
    createCard(FLOWER_TYPES.SQUARE);

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

//text would probably be a key to access card attributes?
function createCard(text) {
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
