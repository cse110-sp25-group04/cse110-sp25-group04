/**
 * Toggle for detailed logging, debugging process
 * If True, game events and state changes are logged onto the console
 * 
 * @type {boolean}
 */
export const DEBUG = true;

/**
 * Board dimensions
 * ROWS: number of horizontal rows on the grid
 * COLS: number of vertical columns on the grid  
 * 
 * @type {number}
 */
export const ROWS = 4;
export const COLS = 6;

/**
 * Cell States for board:
 * GRASS: empty tile that allows flowers to be placed
 * FLOWER: tile containing a flower
 * CORRUPT: tile that must be cleared in order to win
 * ROCK: unchanged cell state, no possible placement
 * 
 * @enum {string}
 */
export const CELL_STATES = {
    GRASS: 'grass',
    FLOWER: 'flower',
    CORRUPT: 'corrupt',
    ROCK: 'rock'
};

/**
 * Symbols for each flower card type
 * 
 * @enum {string}
 */
export const FLOWER_TYPES = {
    PLUS: '+',
    CROSS: 'x',
    SQUARE: '■',
    KNIGHT: 'N'
};

/**
 * Image paths for each flower type
 * 
 * @enum {string}
 */
export const FLOWER_IMAGES = {
    PLUS: 'sources/assets/cards/plus-flower.png',
    CROSS: 'sources/assets/cards/x-flower.png',
    SQUARE: 'sources/assets/cards/block-flower.png',
    KNIGHT: 'sources/assets/cards/n-flower.png'
};

/**
 * Image paths for each flower type
 * 
 * @enum {string}
 */
export const GRID_IMAGES = {
    ROCK: 'sources/assets/cards/rock-card.png',
    GRASS: 'sources/assets/cards/grass.jpg',
    CORRUPT: 'sources/assets/cards/corrupt.jpg'
};

/**
 * Audio for Different Game Events
 * 
 * @type {HTMLAudioElement}
 */
export const FAIL_AUDIO = new Audio('sources/assets/sound-effects/error.mp3');
export const CARD_GRAB = new Audio('sources/assets/sound-effects/card-grab.mp3');
export const CARD_PLACE = new Audio('sources/assets/sound-effects/card-place.mp3');
export const LOSS_SOUND = new Audio('sources/assets/sound-effects/loss-sound.mp3');
export const SUCCESS = new Audio('sources/assets/sound-effects/success.mp3');

// Level conditions
export const WIN = true;
export const LOSE = false;

/**
 * Level configuration
 * Layout: 2D Array of inital cell states 
 * Cards: Array of strings corresponding to flower cards
 * 
 * @type {Array<{LAYOUT: string[][], CARDS: string[]}>}
 */
export const LEVELS = [
    // Level 1
    {
        LAYOUT:[['R', 'R', 'R', 'R', 'R', 'R'], 
            ['R', 'R', 'R', 'C', 'R', 'R'], 
            ['R', 'R', 'C', 'G', 'C', 'R'], 
            ['R', 'R', 'R', 'C', 'R', 'R']],
        CARDS: ['PLUS']
    },
    // Level 2
    {
        LAYOUT:[['R', 'R', 'R', 'R', 'R', 'R'], 
            ['R', 'R', 'C', 'R', 'C', 'R'], 
            ['R', 'R', 'R', 'G', 'R', 'R'], 
            ['R', 'R', 'C', 'R', 'C', 'R']],
        CARDS: ['CROSS']
    },
    // Level 3
    {
        LAYOUT:[['R', 'R', 'R', 'R', 'R', 'R'], 
            ['C', 'R', 'C', 'R', 'C', 'R'], 
            ['R', 'G', 'R', 'C', 'G', 'C'], 
            ['C', 'R', 'C', 'R', 'C', 'R']],
        CARDS: ['CROSS', 'PLUS']
    },
    // Level 4
    {
        LAYOUT:[['R', 'R', 'C', 'C', 'R', 'R'], 
            ['R', 'C', 'R', 'R', 'C', 'R'], 
            ['C', 'G', 'C', 'C', 'R', 'R'], 
            ['R', 'C', 'C', 'R', 'C', 'R']],
        CARDS: ['PLUS', 'PLUS', 'PLUS', 'CROSS', 'CROSS']
    },
    // Level 5
    {
        LAYOUT:[['C', 'C', 'G', 'R', 'C', 'C'], 
            ['C', 'R', 'C', 'C', 'R', 'C'], 
            ['C', 'R', 'C', 'R', 'C', 'R'], 
            ['R', 'R', 'R', 'R', 'R', 'R']],
        CARDS: ['PLUS', 'PLUS', 'PLUS', 'PLUS', 'CROSS', 'CROSS', 'CROSS']
    },
    // Level 6
    {
        LAYOUT:[['R', 'R', 'R', 'R', 'R', 'R'], 
            ['R', 'R', 'C', 'C', 'C', 'R'], 
            ['R', 'R', 'C', 'G', 'C', 'R'], 
            ['R', 'R', 'C', 'C', 'C', 'R']],
        CARDS: ['SQUARE']
    },
    // Level 7
    {
        LAYOUT:[['R', 'G', 'R', 'R', 'R', 'R'], 
            ['R', 'R', 'C', 'C', 'C', 'R'], 
            ['R', 'R', 'C', 'C', 'C', 'R'], 
            ['R', 'R', 'C', 'C', 'C', 'R']],
        CARDS: ['CROSS', 'CROSS', 'SQUARE']
    },
    // Level 8
    {
        LAYOUT:[['R', 'R', 'C', 'R', 'R', 'R'],
            ['R', 'C', 'C', 'C', 'R', 'C'], 
            ['C', 'C', 'C', 'R', 'C', 'C'], 
            ['G', 'C', 'R', 'R', 'C', 'C']],
        CARDS: ['PLUS', 'CROSS', 'CROSS', 'SQUARE', 'SQUARE']
    },
    // Level 9
    {
        LAYOUT:[['R', 'R', 'C', 'R', 'C', 'R'], 
            ['R', 'C', 'R', 'R', 'R', 'C'], 
            ['R', 'R', 'R', 'G', 'R', 'R'], 
            ['R', 'C', 'R', 'R', 'R', 'C']],
        CARDS: ['KNIGHT']
    },
    // Level 10
    {
        LAYOUT:[['C', 'C', 'C', 'C', 'C', 'R'], 
            ['C', 'R', 'C', 'C', 'C', 'R'], 
            ['C', 'R', 'C', 'R', 'C', 'C'], 
            ['C', 'C', 'C', 'C', 'C', 'G']],
        CARDS: ['CROSS', 'SQUARE', 'KNIGHT', 'KNIGHT', 'KNIGHT', 'KNIGHT']
    },
    // Level 11
    {
        LAYOUT:[['C', 'C', 'R', 'C', 'C', 'R'], 
            ['C', 'R', 'C', 'C', 'C', 'R'], 
            ['R', 'C', 'G', 'C', 'R', 'C'], 
            ['C', 'R', 'C', 'R', 'C', 'R']],
        CARDS: ['PLUS','KNIGHT','KNIGHT','KNIGHT','KNIGHT','KNIGHT']
    },
    // Level 12
    {
        LAYOUT:[['C', 'C', 'R', 'C', 'C', 'C'], 
            ['C', 'C', 'C', 'C', 'C', 'R'], 
            ['C', 'R', 'C', 'R', 'C', 'R'], 
            ['G', 'C', 'C', 'C', 'C', 'R']],
        CARDS: ['KNIGHT', 'KNIGHT', 'KNIGHT', 'KNIGHT', 'KNIGHT', 'KNIGHT']
    },
    // Level 13
    {
        LAYOUT:[['R', 'C', 'C', 'C', 'R', 'C'], 
            ['C', 'C', 'C', 'C', 'C', 'C'], 
            ['R', 'C', 'C', 'C', 'R', 'C'], 
            ['C', 'G', 'C', 'R', 'C', 'R']],
        CARDS: ['KNIGHT', 'KNIGHT', 'KNIGHT', 'KNIGHT', 'KNIGHT', 'KNIGHT']
    },
    // Level 14
    {
        LAYOUT:[['G', 'R', 'C', 'R', 'C', 'R'], 
            ['C', 'C', 'C', 'R', 'C', 'R'], 
            ['C', 'C', 'C', 'R', 'C', 'R'], 
            ['C', 'R', 'C', 'R', 'C', 'R']],
        CARDS: ['KNIGHT', 'KNIGHT', 'KNIGHT', 'CROSS', 'CROSS', 'PLUS']
    }
];
