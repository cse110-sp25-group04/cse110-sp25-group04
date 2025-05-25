const ROWS = 4, COLS = 6;

const BOARD = Array.from({ length: ROWS }, () => Array(COLS).fill(null));

function CHANGE_BOARD(cell, type) {
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

        //if the new position is out of bounds return
        if (nx < 0 ||  nx >= COLS ||  ny < 0 || ny >= ROWS) {
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

export { ROWS, COLS, BOARD, CHANGE_BOARD };
export default { ROWS, COLS, BOARD, CHANGE_BOARD };