//use as a debug flag for logging
export const DEBUG = true;

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
    SQUARE: '■'
};

// Levels (for now)
export const LEVELS = {
    TEST: {
        LAYOUT:[['C', 'R', 'G', 'G', 'C', 'C'],
                ['C', 'G', 'R', 'C', 'R', 'R'],
                ['C', 'C', 'C', 'G', 'R', 'R'],
                ['C', 'C', 'C', 'R', 'C', 'G']],
        CARDS: [FLOWER_TYPES.PLUS, FLOWER_TYPES.CROSS, FLOWER_TYPES.SQUARE,
                'ABC', '123', 'Arul']
    },
    ONE: {
        LAYOUT:[['R', 'R', 'C', 'C', 'R', 'R'], 
                ['R', 'C', 'R', 'R', 'C', 'R'], 
                ['C', 'G', 'C', 'C', 'R', 'R'], 
                ['R', 'C', 'C', 'R', 'C', 'R']],
        CARDS: [FLOWER_TYPES.PLUS, FLOWER_TYPES.PLUS, FLOWER_TYPES.PLUS, FLOWER_TYPES.CROSS, FLOWER_TYPES.CROSS]
    }
};