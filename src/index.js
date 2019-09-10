const fsp = require('fs').promises;
const parser = require('./parser.js');

const mdstatPath = '/proc/mdstat';

/**
 * The Linux RAID module for the server-state system
 * @returns A JSON-serializable (via `JSON.stringify()`) version information about the raids in the linux system
 */
module.exports = async function() {
    try {
        var file = await fsp.readFile(mdstatPath, {encoding: 'utf-8'});
        return parser.parse(file);
    } catch (e) {
        // mdraid kernel module not loaded. file missing.
        return {'error': 'kernel module not loaded'};
    }
};
