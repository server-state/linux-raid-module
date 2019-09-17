// build parser with given grammar
const parser = require('pegjs').generate(
    // fs go from root directory to search files!
    require('fs').readFileSync('./src/grammar.pegjs', {encoding: 'utf-8'})
);

jest.doMock('../src/grammar.pegjs', () => parser);

module.exports = parser;