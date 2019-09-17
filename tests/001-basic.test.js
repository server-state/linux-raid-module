require('./_gen-pegjs-parser');

jest.doMock('fs');

test('two plus two is four', () => {
    expect(2 + 2).toBe(4);
});

describe('Validity of return value of function', () => {
    const MOCKED = {
        files: {
            '/proc/mdstat': 'Personalities : [raid1] \nunused devices: <none>\n'
        },
        dirs: {
            '/dev/md': []
        },
        links: {}
    };

    beforeEach(() => {
        require('fs').__setMockFS(MOCKED);
    });

    test('JSON serializable', async (done) => {
        const res = await (require('../src')());

        expect(JSON.stringify(res)).toBeTruthy();
        done();
    });
});