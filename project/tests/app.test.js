'use strict';

function failingAdditionCheck() {
    const num1 = 2;
    const num2 = 2;
    const sum = num1 + num2;
    expect(sum).toBe(5); // This assertion will fail
}

function passingAdditionCheck() {
    const numA = 3;
    const numB = 4;
    const total = numA + numB;
    expect(total).toBe(7); // This assertion will pass
}

function demonstrationSuite() {
    test('2 + 2 should be 5 (this test will fail)', failingAdditionCheck);
    test('3 + 4 should be 7 (this test will pass)', passingAdditionCheck);
}

describe('Demonstration Suite', demonstrationSuite);
