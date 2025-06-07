/**
 * @jest-environment jsdom
 */

import { BOARD, loadLevel } from '../sources/scripts/board.js';
import { CELL_STATES, LEVELS } from '../sources/scripts/constants.js';

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
