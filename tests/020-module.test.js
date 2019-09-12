require('./_gen-pegjs-parser');

jest.doMock('fs');

describe('Test module export', () => {
    const MOCKED_NO_FILE = {};
    const MOCKED_EMPTY_FILE = {
        '/proc/mdstat': '\n'
    };
    const MOCKED_NOPARSE_FILE = {
        '/proc/mdstat': 'I am not parsable :D\n'
    }

    it('should return an error object when file /proc/mdstat do not exist', async () => {
        require('fs').__setMockFiles(MOCKED_NO_FILE);

        const serverModule = require('../src');
        expect(serverModule()).rejects.toThrow();
    });

    it('should return an error object when file /proc/mdstat is empty', async () => {
        require('fs').__setMockFiles(MOCKED_EMPTY_FILE);

        const serverModule = require('../src');
        expect(serverModule()).rejects.toThrow();
    });

    it('should return an error object when file /proc/mdstat is not parsable', async () => {
        require('fs').__setMockFiles(MOCKED_NOPARSE_FILE);

        const serverModule = require('../src');
        expect(serverModule()).rejects.toThrow();
    });
});
