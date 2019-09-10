const mock = require('mock-fs');
const serverModule = require('../');

describe('Test module export', () => {
    it('should return an error object because no file', async () => {
        // mock file in temporary file system
        mock({
            '/proc/': {
                'mdstat': null
            }
        });
        // apply module function
        const res = await serverModule();
        expect(res).toEqual({error: 'kernel module not loaded'});
    });

    /* it('should return an error object because not parsable file', async () => {
        // mock file in temporary file system
        mock({
            '/proc/': {
                'mdstat': '\n'
            }
        });

        // apply module function
        const res = await serverModule();
        expect(res).toHaveProperty('error', /Please report the issue to module author!/);
    }); */
});

afterAll(() => {
    mock.restore();
});