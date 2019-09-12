require('./_gen-pegjs-parser');

jest.doMock('fs');

describe('Test module export', () => {
    const MOCKED_NO_FILE = {};
    
    const MOCKED_EMPTY_FILE = {
        '/proc/mdstat': '\n'
    };

    const MOCKED_NOPARSE_FILE = {
        '/proc/mdstat': 'I am not parsable :D\n'
    };

    const MOCKED_CORRECT = {
        files: {
            '/proc/mdstat': 'Personalities : [raid1] [raid0] \nmd127 : active raid0 sdb3[2] sdb2[1] sdb1[0]\n      62862336 blocks super 1.2 512k chunks\n      \nmd126 : active raid0 sdb6[2] sdb5[1] sdb4[0]\n      62862336 blocks super 1.2 512k chunks\n\nunused devices: <none>\n'
        },
        dirs: {
            '/dev/md': ['myRaid', 'mySecondRaid']
        },
        links: {
            '/dev/md/myRaid': '../md127',
            '/dev/md/mySecondRaid': '../md126'
        }
    };

    const MOCKED_MISSING = {
        files: {
            '/proc/mdstat': 'Personalities : [raid1] [raid0] \nmd127 : active raid0 sdb3[2] sdb2[1] sdb1[0]\n      62862336 blocks super 1.2 512k chunks\n      \nmd126 : active raid0 sdb6[2] sdb5[1] sdb4[0]\n      62862336 blocks super 1.2 512k chunks\n\nunused devices: <none>\n'
        },
        dirs: {
            '/dev/md': ['myRaid']
        },
        links: {
            '/dev/md/myRaid': '../md127'
        }
    };

    const MOCKED_WRONG_LINK = {
        files: {
            '/proc/mdstat': 'Personalities : [raid1] [raid0] \nmd127 : active raid0 sdb3[2] sdb2[1] sdb1[0]\n      62862336 blocks super 1.2 512k chunks\n      \nmd126 : active raid0 sdb6[2] sdb5[1] sdb4[0]\n      62862336 blocks super 1.2 512k chunks\n\nunused devices: <none>\n'
        },
        dirs: {
            '/dev/md': ['myRaid']
        },
        links: {
            '/dev/md/myRaid': '../md127',
            '/dev/md/mySecondRaid': '../other/location'
        }
    };

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

    it('should return an result with correct unique names', () => {
        require('fs').__setMockFS(MOCKED_CORRECT);

        let serverModule = require('../src');
        expect(serverModule()).resolves.toMatchSnapshot();
    });

    it('should return an correct result with one missing unique name', () => {
        require('fs').__setMockFS(MOCKED_MISSING);

        let serverModule = require('../src');
        expect(serverModule()).resolves.toMatchSnapshot();
    });

    it('should return an correct result with one wrong link destination', () => {
        require('fs').__setMockFS(MOCKED_WRONG_LINK);

        let serverModule = require('../src');
        expect(serverModule()).resolves.toMatchSnapshot();
    });
});
