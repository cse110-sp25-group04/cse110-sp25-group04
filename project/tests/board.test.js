/**
 * @jest-environment jsdom
 */

import { BOARD, loadLevel, drawBoard, changeBoard, buildHand, createCard} from '../sources/scripts/board.js';
import { CELL_STATES, LEVELS, FLOWER_TYPES } from '../sources/scripts/constants.js';

test('loadLevel(0) sets correct board state', () => {
    // set up DOM
    document.body.innerHTML = `
    <div id="grid-container">
      ${Array.from({ length: 4 * 6 }).map((_, i) => {
        const x = i % 6;
        const y = Math.floor(i / 6);
        return `<div id="${x}-${y}" data-cell-state="" class="grid-cell"></div>`;
    }).join('')}
    </div>
    <div id="hand-container"></div>
  `;

    loadLevel(0);

    // verify state
    const levelLayout = LEVELS[0].LAYOUT;
    for (let r = 0; r < levelLayout.length; r++) {
        for (let c = 0; c < levelLayout[r].length; c++) {
            const expectedChar = levelLayout[r][c];
            const actualState = BOARD[r][c];
            const domCell = document.getElementById(`${c}-${r}`);

            expect(domCell.dataset.cellState).toBe(actualState);

            switch (expectedChar) {
            case 'C':
                expect(actualState).toBe(CELL_STATES.CORRUPT);
                break;
            case 'G':
                expect(actualState).toBe(CELL_STATES.GRASS);
                break;
            case 'R':
                expect(actualState).toBe(CELL_STATES.ROCK);
                break;
            case 'F': // this shouldn't occur at start
                expect(actualState).toBe(CELL_STATES.ROCK);
                break;
            default:
                throw new Error(`Unhandled layout char: ${expectedChar}`);
            }
        }
    }
});

test('drawBoard sets background colors according to BOARD', () => {
    document.body.innerHTML = `
        <div id="grid-container">
            ${Array.from({ length: 4 * 6 }).map((_, i) => {
        const x = i % 6;
        const y = Math.floor(i / 6);
        return `<div id="${x}-${y}" class="grid-cell" data-cell-state=""></div>`;
    }).join('')}
        </div>
    `;

    // Set up board with known states
    BOARD[0][0] = CELL_STATES.CORRUPT;
    BOARD[0][1] = CELL_STATES.GRASS;
    BOARD[0][2] = CELL_STATES.ROCK;

    drawBoard();

    expect(document.getElementById('0-0').style.backgroundColor).toBe('purple');
    expect(document.getElementById('1-0').style.backgroundColor).toBe('green');
    expect(document.getElementById('2-0').style.backgroundColor).toBe('gray');
});

test('changeBoard transforms adjacent corrupt cells with PLUS card', () => {
    document.body.innerHTML = `
        <div id="grid-container">
            ${Array.from({ length: 4 * 6 }).map((_, i) => {
        const x = i % 6;
        const y = Math.floor(i / 6);
        return `<div id="${x}-${y}" class="grid-cell" data-cell-state=""></div>`;
    }).join('')}
        </div>
    `;

    // Setup cells
    BOARD[1][1] = CELL_STATES.GRASS; // center
    BOARD[1][0] = CELL_STATES.CORRUPT; // left
    BOARD[1][2] = CELL_STATES.CORRUPT; // right
    BOARD[0][1] = CELL_STATES.CORRUPT; // top
    BOARD[2][1] = CELL_STATES.ROCK; // bottom (should not change)

    const centerCell = document.getElementById('1-1');
    const fakeCard = document.createElement('div');
    fakeCard.classList.add('card');
    centerCell.appendChild(fakeCard); // simulate the card being played

    const history = changeBoard(centerCell, FLOWER_TYPES.PLUS);

    expect(BOARD[1][0]).toBe(CELL_STATES.GRASS);
    expect(BOARD[1][2]).toBe(CELL_STATES.GRASS);
    expect(BOARD[0][1]).toBe(CELL_STATES.GRASS);
    expect(BOARD[2][1]).toBe(CELL_STATES.ROCK);
    expect(history).toEqual(expect.arrayContaining([
        { x: 0, y: 1 },
        { x: 2, y: 1 },
        { x: 1, y: 0 }
    ]));
});


test('buildHand creates correct number of hand cells', () => {
    document.body.innerHTML = '<div id="hand-container"></div>';

    buildHand(3);
    const handCells = document.querySelectorAll('.hand-cell');
    expect(handCells.length).toBe(3);
});

test('createCard places card in first empty hand cell', () => {
    document.body.innerHTML = `
        <div id="hand-container">
            <div class="hand-cell"></div>
            <div class="hand-cell has-card"></div>
        </div>
    `;

    const card = createCard('PLUS');

    const handCells = document.querySelectorAll('.hand-cell');
    expect(handCells[0].querySelector('.card')).toBe(card);
    expect(handCells[0].classList.contains('has-card')).toBe(true);
});

test('changeBoard ignores out-of-bounds neighbors', () => {
    document.body.innerHTML = `
        <div id="grid-container">
            ${Array.from({ length: 4 * 6 }).map((_, i) => {
        const x = i % 6;
        const y = Math.floor(i / 6);
        return `<div id="${x}-${y}" class="grid-cell" data-cell-state=""></div>`;
    }).join('')}
        </div>
    `;

    BOARD[0][0] = CELL_STATES.GRASS;
    BOARD[0][1] = CELL_STATES.CORRUPT;
    BOARD[1][0] = CELL_STATES.CORRUPT;

    const testCell = document.getElementById('0-0');
    const fakeCard = document.createElement('div');
    fakeCard.classList.add('card');
    testCell.appendChild(fakeCard);

    const result = changeBoard(testCell, FLOWER_TYPES.PLUS);

    expect(result).toEqual(expect.arrayContaining([
        { x: 1, y: 0 },
        { x: 0, y: 1 }
    ]));
});


test('changeBoard handles unknown flower type', () => {
    document.body.innerHTML = `
        <div id="grid-container">
            ${Array.from({ length: 4 * 6 }).map((_, i) => {
        const x = i % 6;
        const y = Math.floor(i / 6);
        return `<div id="${x}-${y}" class="grid-cell" data-cell-state=""></div>`;
    }).join('')}
        </div>
    `;

    const testCell = document.getElementById('2-2');
    BOARD[2][2] = CELL_STATES.GRASS;

    const history = changeBoard(testCell, 'INVALID_TYPE');
    expect(history).toEqual([]); // should do nothing
});
