require('./_gen-pegjs-parser');

jest.doMock('fs');

test('two plus two is four', () => {
    expect(2 + 2).toBe(4);
});

describe('Validity of return value of function', () => {
    const MOCKED_FILES = {
        '/proc/mdstat': 'Personalities : [raid1] \nunused devices: <none>\n'
    };

    beforeEach(() => {
        require('fs').__setMockFiles(MOCKED_FILES);
    });

    test('JSON serializable', async (done) => {
        const res = await (require('../src')());

        expect(JSON.stringify(res)).toBeTruthy();
        done();
    });
});