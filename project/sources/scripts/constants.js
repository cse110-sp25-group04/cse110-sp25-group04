// Use as a debug flag for logging
export const DEBUG = true;

// Board sizes
export const ROWS = 4;
export const COLS = 6;

// Cell states
export const CELL_STATES = {
    GRASS: 'grass',
    FLOWER: 'flower',
    CORRUPT: 'corrupt',
    ROCK: 'rock'
};

// Flower types
export const FLOWER_TYPES = {
    PLUS: '+',
    CROSS: 'x',
    SQUARE: '■',
    KNIGHT: 'N'
};

// Audio Sources
export const FAIL_AUDIO = new Audio('/cse110-sp25-group04/sources/assets/error.mp3');

// Levels (for now)
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
        LAYOUT:[['R', 'R', 'C', 'C', 'R', 'R'], 
            ['R', 'C', 'R', 'R', 'C', 'R'], 
            ['C', 'G', 'C', 'C', 'R', 'R'], 
            ['R', 'C', 'C', 'R', 'C', 'R']],
        CARDS: ['PLUS', 'PLUS', 'PLUS', 'CROSS', 'CROSS']
    },
    // Level 4
    {
        LAYOUT:[['C', 'C', 'G', 'R', 'C', 'C'], 
            ['C', 'R', 'C', 'C', 'R', 'C'], 
            ['C', 'R', 'C', 'R', 'C', 'R'], 
            ['R', 'R', 'R', 'R', 'R', 'R']],
        CARDS: ['PLUS', 'PLUS', 'PLUS', 'PLUS', 'CROSS', 'CROSS', 'CROSS']
    },
    // Level 5
    {
        LAYOUT:[['R', 'R', 'R', 'R', 'R', 'R'], 
            ['R', 'R', 'C', 'C', 'C', 'R'], 
            ['R', 'R', 'C', 'G', 'C', 'R'], 
            ['R', 'R', 'C', 'C', 'C', 'R']],
        CARDS: ['SQUARE']
    },
    // Level 6
    {
        LAYOUT:[['R', 'G', 'R', 'R', 'R', 'R'], 
            ['R', 'R', 'C', 'C', 'C', 'R'], 
            ['R', 'R', 'C', 'C', 'C', 'R'], 
            ['R', 'R', 'C', 'C', 'C', 'R']],
        CARDS: ['CROSS', 'CROSS', 'SQUARE']
    },
    // Level 7
    {
        LAYOUT:[['R', 'R', 'C', 'R', 'R', 'R'],
            ['R', 'C', 'C', 'C', 'R', 'C'], 
            ['C', 'C', 'C', 'R', 'C', 'C'], 
            ['G', 'C', 'R', 'R', 'C', 'C']],
        CARDS: ['PLUS', 'CROSS', 'CROSS', 'SQUARE', 'SQUARE']
    },
    // Level 8
    {
        LAYOUT:[['R', 'R', 'C', 'R', 'C', 'R'], 
            ['R', 'C', 'R', 'R', 'R', 'C'], 
            ['R', 'R', 'R', 'G', 'R', 'R'], 
            ['R', 'C', 'R', 'R', 'R', 'C']],
        CARDS: ['KNIGHT']
    },
    // Level 9
    {
        LAYOUT:[['C', 'C', 'C', 'C', 'C', 'R'], 
            ['C', 'R', 'C', 'C', 'C', 'R'], 
            ['C', 'R', 'C', 'R', 'C', 'C'], 
            ['C', 'C', 'C', 'C', 'C', 'G']],
        CARDS: ['CROSS', 'SQUARE', 'KNIGHT', 'KNIGHT', 'KNIGHT', 'KNIGHT']
    },
    // Level 10
    {
        LAYOUT:[['C', 'C', 'R', 'C', 'C', 'R'], 
            ['C', 'R', 'C', 'C', 'C', 'R'], 
            ['R', 'C', 'G', 'C', 'R', 'C'], 
            ['C', 'R', 'C', 'R', 'C', 'R']],
        CARDS: ['PLUS','KNIGHT','KNIGHT','KNIGHT','KNIGHT','KNIGHT']
    },
    // Level 11
    {
        LAYOUT:[['C', 'C', 'R', 'C', 'C', 'C'], 
            ['C', 'C', 'C', 'C', 'C', 'R'], 
            ['C', 'R', 'C', 'R', 'C', 'R'], 
            ['G', 'C', 'C', 'C', 'C', 'R']],
        CARDS: ['KNIGHT', 'KNIGHT', 'KNIGHT', 'KNIGHT', 'KNIGHT', 'KNIGHT']
    },
    // Level 12
    {
        LAYOUT:[['R', 'C', 'C', 'C', 'R', 'C'], 
            ['C', 'C', 'C', 'C', 'C', 'C'], 
            ['R', 'C', 'C', 'C', 'R', 'C'], 
            ['C', 'G', 'C', 'R', 'C', 'R']],
        CARDS: ['KNIGHT', 'KNIGHT', 'KNIGHT', 'KNIGHT', 'KNIGHT', 'KNIGHT']
    }
];

