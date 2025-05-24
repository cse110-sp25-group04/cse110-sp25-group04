import { setupDragAndDrop } from './drag_drop.js';

//Run the init() function when the page has loaded
window.addEventListener('DOMContentLoaded', init);

//declare variables
let handCells;
let gridCells;

//Starts the program
function init() {
    handCells = document.querySelectorAll('#hand-container .hand-cell');
    gridCells = document.querySelectorAll('#grid-container .grid-cell');

    // dropTargets = document.querySelectorAll('.grid-cell, .hand-cell');

    //placeholder
    const card1 = createCard('A♠️');
    const card2 = createCard('K♣️');
    const card3 = createCard('Q♦️');

    // Add mouse down listener to the document to start dragging on any card
    // document.addEventListener('mousedown', handleMouseDown);
    setupDragAndDrop(handCells, gridCells);
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
    console.log('CREATING CARDS');
    const card = document.createElement('div');
    card.classList.add('card');
    card.textContent = text;

    //finds first empty hand cell to add card to
    for (let h of handCells) {
        if (h.classList.contains('has-card')) {
            console.log('EXIT');
            continue;
        }
        h.appendChild(card);
        h.classList.add('has-card');
        console.log('CARD ADDED');
        break;
    }
    return card;
}