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
