const parser = require('pegjs').generate(
    // fs goes from root directory to search files!
    require('fs').readFileSync('./src/grammar.pegjs', {encoding: 'utf-8'})
);

describe('Test parser at different mdstat states', () => {
    it('Blabla', () => {
        expect(() => {
            parser.parse('');
        }).toThrow();
    });
});
