/**
 * Toggle for detailed logging, debugging process
 * If True, game events and state changes are logged onto the console
 */
export const DEBUG = true;

/**
 * Board dimensions
 * ROWS: number of horizontal rows on the grid
 * COLS: number of vertical columns on the grid  
 */
export const ROWS = 4;
export const COLS = 6;

/**
 * Cell States for board:
 * GRASS: empty tile that allows flowers to be placed
 * FLOWER: tile containing a flower
 * CORRUPT: tile that must be cleared in order to win
 * ROCK: unchanged cell state, no possible placement
 */
export const CELL_STATES = {
    GRASS: 'grass',
    FLOWER: 'flower',
    CORRUPT: 'corrupt',
    ROCK: 'rock'
};

/**
 * Symbols for each flower card type
 */
export const FLOWER_TYPES = {
    PLUS: '+',
    CROSS: 'x',
    SQUARE: '■',
    KNIGHT: 'N'
};

/**
 * Audio for failure events 
 * Plays when player fails a level
 */
export const FAIL_AUDIO = new Audio('/project/sources/assets/error.mp3');

/**
 * Level configuration
 * Layout: 2D Array of inital cell states 
 * Cards: Array of strings corresponding to flower cards
 */
export const LEVELS = [
    // Level 1
    {
        LAYOUT:[['R', 'R', 'C', 'C', 'R', 'R'], 
            ['R', 'C', 'R', 'R', 'C', 'R'], 
            ['C', 'G', 'C', 'C', 'R', 'R'], 
            ['R', 'C', 'C', 'R', 'C', 'R']],
        CARDS: ['PLUS', 'PLUS', 'PLUS', 'CROSS', 'CROSS']
    },
    // Level 2
    {
        LAYOUT:[['R', 'R', 'C', 'R', 'C', 'R'], 
            ['R', 'C', 'R', 'R', 'R', 'C'], 
            ['R', 'R', 'R', 'G', 'R', 'R'], 
            ['R', 'C', 'R', 'R', 'R', 'C']],
        CARDS: ['KNIGHT']
    },
    // Level 3
    {
        LAYOUT:[['C', 'C', 'R', 'C', 'C', 'C'], 
            ['C', 'C', 'C', 'C', 'C', 'R'], 
            ['C', 'R', 'C', 'R', 'C', 'R'], 
            ['G', 'C', 'C', 'C', 'C', 'R']],
        CARDS: ['KNIGHT', 'KNIGHT', 'KNIGHT', 'KNIGHT', 'KNIGHT', 'KNIGHT']
    },
    // Level 4
    {
        LAYOUT:[['R', 'R', 'C', 'R', 'C', 'R'], 
            ['R', 'C', 'R', 'R', 'R', 'C'], 
            ['R', 'R', 'R', 'G', 'R', 'R'], 
            ['R', 'C', 'R', 'R', 'R', 'C']],
        CARDS: ['L','E','V','E','L','4']
    },
    // Level 5
    {
        LAYOUT:[['R', 'R', 'C', 'R', 'C', 'R'], 
            ['R', 'C', 'R', 'R', 'R', 'C'], 
            ['R', 'R', 'R', 'G', 'R', 'R'], 
            ['R', 'C', 'R', 'R', 'R', 'C']],
        CARDS: ['L','E','V','E','L','5']
    } 
];