const parser = require('../src/parser.js');

describe('Test parser at different mdstat states', () => {
    it('Blabla', () => {
        expect(() => {
            parser.parse('');
        }).toThrow();
    });
});
