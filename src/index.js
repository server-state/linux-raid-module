const fsp = require('fs').promises;
const parser = require('./grammar.pegjs');

const mdstatPath = '/proc/mdstat';

/**
 * The Linux RAID module for the server-state system
 * @returns A JSON-serializable (via `JSON.stringify()`) version information about the raids in the linux system
 */
module.exports = async function() {
    let file;
    // pull file from filesystem
    try {
        file = await fsp.readFile(mdstatPath, {encoding: 'utf-8'});
    } catch (e) {
        // mdraid kernel module not loaded. file missing.
        return {error: 'kernel module not loaded'};
    }

    // parse file into json format
    try {
        return parser.parse(file);
    } catch (e) {
        return {error: 'Can not parse ' + mdstatPath + 
        '! Please report the issue to module author!\nError: ' + e};
    }
};
