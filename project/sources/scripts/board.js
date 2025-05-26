const ROWS = 4, COLS = 6;

//initalizes the 2d array board to be null
const BOARD = [];
for (let i = 0; i < ROWS; i++) {
    BOARD[i] = [];
    for (let j = 0; j < COLS; j++) {
        BOARD[i][j] = null;
    }
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
    if (type === '+') {
        offsets = [[1,0], [-1,0], [0,1], [0,-1]];
    }
    else if (type === 'x') {
        offsets = [[1,1], [1,-1], [-1,1], [-1,-1]];
    }
    else if (type === '■') {
        offsets = [[1,0], [-1,0], [0,1], [0,-1], [1,1], [1,-1], [-1,1], [-1,-1]];
    }

    for (let [dx,dy] of offsets) {
        //calculate the new position for x and y
        const nx = x + dx, ny = y + dy;

        //if the new position is out of bounds, continue
        if (nx < 0 || nx >= COLS || ny < 0 || ny >= ROWS) {
            continue;
        }

        //target new position and change color
        const cell = document.getElementById(`${nx}-${ny}`);
        if (!cell.querySelector('.card')) {
            BOARD[ny][nx] = 'green';
            cell.style.backgroundColor = 'green';
        }
    };
}

export { ROWS, COLS, BOARD, changeBoard };