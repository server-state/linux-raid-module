require('./_gen-pegjs-parser');

jest.doMock('fs');

const serverModule = require('../src');

describe('Test simple module behaviour', () => {
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
            '/dev/md': ['myRaid', 'mySecondRaid']
        },
        links: {
            '/dev/md/myRaid': '../md127',
            '/dev/md/mySecondRaid': '../other/location'
        }
    };

    it('should return an error object when file /proc/mdstat do not exist', async () => {
        require('fs').__setMockFiles(MOCKED_NO_FILE);
        expect(serverModule()).rejects.toThrow();
    });

    it('should return an error object when file /proc/mdstat is empty', async () => {
        require('fs').__setMockFiles(MOCKED_EMPTY_FILE);
        expect(serverModule()).rejects.toThrow();
    });

    it('should return an error object when file /proc/mdstat is not parsable', async () => {
        require('fs').__setMockFiles(MOCKED_NOPARSE_FILE);
        expect(serverModule()).rejects.toThrow();
    });

    it('should return an result with correct unique names', () => {
        require('fs').__setMockFS(MOCKED_CORRECT);
        expect(serverModule()).resolves.toMatchSnapshot();
    });

    it('should return an correct result with one missing unique name', () => {
        require('fs').__setMockFS(MOCKED_MISSING);
        expect(serverModule()).resolves.toMatchSnapshot();
    });

    it('should return an correct result with one wrong link destination', () => {
        require('fs').__setMockFS(MOCKED_WRONG_LINK);
        expect(serverModule()).resolves.toMatchSnapshot();
    });
});



describe('Test module options', () => {
    const types = ['null', 'undefined', 'boolean', 'number', 'string', 'object', 'array'];
    const typeExamples = {
        null: null,
        undefined: undefined,
        boolean: false,
        number: 3.141,
        string: 'I am a string',
        object: { prop1: 'prop1', prop2: 'prop2' },
        array: ['I', 'am', 'an', 'array']
    };

    const MOCKED_STANDARD = {
        files: {
            '/proc/mdstat': 'Personalities : [raid1] [raid0] \nmd127 : active raid0 sdb3[2] sdb2[1] sdb1[0]\n      62862336 blocks super 1.2 512k chunks\n      \nmd126 : active raid0 sdb6[2] sdb5[1] sdb4[0]\n      62862336 blocks super 1.2 512k chunks\n\nmd125 : active raid0 sdb9[2] sdb8[1] sdb7[0]\n      62862336 blocks super 1.2 512k chunks\n\nunused devices: <none>\n'
        },
        dirs: {
            '/dev/md': ['myRaid', 'mySecondRaid']
        },
        links: {
            '/dev/md/myRaid': '../md127',
            '/dev/md/mySecondRaid': '../md126'
        }
    };

    const OPTIONS_TESTS = [
        [
            'filter',
            'array',
            [
                [
                    'not filter any raids',
                    { filter: [], invert: false }
                ],
                [
                    'filter everything',
                    { filter: [], invert: true }
                ],
                [
                    'filter out \'myRaid\'',
                    { filter: ['myRaid'], invert: false }
                ],
                [
                    'filter everything except \'myRaid\'',
                    { filter: ['myRaid'], invert: true }
                ],
                [
                    'filter out \'myRaid\' and \'mySecondRaid\'',
                    { filter: ['myRaid', 'mySecondRaid'], invert: false }
                ],
                [
                    'filter everything except \'myRaid\' and \'mySecondRaid\'',
                    { filter: ['myRaid', 'mySecondRaid'], invert: true }
                ],
                [
                    'filter block device without unique name',
                    { filter: ['md125'], invert: false }
                ]
            ]
        ],
        [
            'invert',
            'boolean',
            [
                [
                    'do nothing',
                    {}
                ]
            ]
        ]
    ];


    beforeAll(() => {
        require('fs').__setMockFS(MOCKED_STANDARD);
    });

    it.each(types)('should pass with given options, type: %s', (type) => {
        expect(serverModule(typeExamples[type])).resolves.toBeTruthy();
    });

    describe.each(OPTIONS_TESTS)('Test option \'%s\'', (name, type, tests) => {
        // basic member tests
        it.each(types.filter(testType => testType !== type))('should reject when \'' + name + '\' is given with type: %s', (testType) => {
            let obj = {};
            obj[name] = typeExamples[testType];

            expect(serverModule(obj)).rejects.toThrow();
        });

        it('should pass when \'' + name + '\' is given with type: ' + type, () => {
            let obj = {};
            obj[name] = typeExamples[type];

            expect(serverModule(obj)).resolves.toBeTruthy();
        });

        // special member cases (defined in OPTIONS_TESTS)
        it.each(tests)('should %s', (desc, options) => {
            expect(serverModule(options)).resolves.toMatchSnapshot();
        });
    });
});