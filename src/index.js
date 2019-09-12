const fs = require('fs');
const parser = require('./grammar.pegjs');

/**
 * The Linux RAID module for the server-state system
 * @returns A JSON-serializable (via `JSON.stringify()`) version information about the raids in the linux system
 */
module.exports = async function() {
    let file;
    // pull file from filesystem
    try {
        file = fs.readFileSync('/proc/mdstat', {encoding: 'utf-8'});
    } catch (e) {
        e.message = 'File not found: /proc/mdstat.\n' + e.message;
        throw(e);
    }

    // parse file into json format
    try {
        return parser.parse(file);
    } catch (e) {
        e.message = 'Can not parse: /proc/mdstat.\n' + e.message;
        throw(e);
    }
};
