/**
 * @file Meant as a test file for the documentation generator.
 * @author Meruzhan Sargsyan
 */

/**
 * Returns a pseudo-random integer between min and max (inclusive).
 * 
 * @param {number} min - The minimum value (inclusive).
 * @param {number} max - The maximum value (inclusive).
 * @param {number} seed - The seed for the random number generator.
 * @returns {number} A pseudo-random integer between min and max (inclusive).
 */
function randomInt(min, max, seed) {
    return 0;    
}

test('placeholder test', () => {
  expect(true).toBe(true);
});

/**
 * This function has no params or return type
 */
function doNothing() {
}

/**
 * Represents a test class.
 * @class
 */
class TestClass {
    /**
     * default constructed
     */
    constructor() {

    }

    method1() {
        return 'this method has no label';
    }

    /**
     * Meant to test return only
     * 
     * @returns {string} placeholder
     */
    method2() {
        return 'this method has a label';
    }
}