const fs = require('fs');
const path = require('path');
const parser = require('./grammar.pegjs');

/**
 * The Linux RAID module for the server-state system
 * @returns A JSON-serializable (via `JSON.stringify()`) version information about the raids in the linux system
 */
module.exports = async function () {
    let file;
    // pull file from filesystem
    try {
        file = fs.readFileSync('/proc/mdstat', { encoding: 'utf-8' });
    } catch (e) {
        e.message = 'File not found: /proc/mdstat.\n' + e.message;
        throw (e);
    }

    // parse file into json format
    let result;
    try {
        result = parser.parse(file);
    } catch (e) {
        e.message = 'Can not parse: /proc/mdstat.\n' + e.message;
        throw (e);
    }

    // resolve block name with unique linkage
    const names = fs.readdirSync('/dev/md');
    let raidNames = {};
    for (const name of names) {
        const blockName = path.basename(fs.readlinkSync('/dev/md/' + name));
        raidNames[blockName] = name;
    }

    // insert uniqueName into result
    for (const raid of result['raids']) {
        raid['unique'] = raidNames[raid['name']];
    }

    return result;
};
