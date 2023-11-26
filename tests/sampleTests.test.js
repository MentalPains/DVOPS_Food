const { describe, it } = require('mocha');
const { expect } = require('chai');
const { sumTwoNumbers } = require('../utils/sampleFunctions')
describe('Summing up 2 and 3 using sumTwoNumbers function', () => {
    const result = sumTwoNumbers(2, 3);
    it('Should be equal to 5', () => {
        expect(result).to.equal(5);
    });
});