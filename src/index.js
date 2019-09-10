const fsp = require('fs').promises;
const parser = require('./parser.js');

/**
 * The Linux RAID module for the server-state system
 * @returns A JSON-serializable (via `JSON.stringify()`) version information about the raids in the linux system
 */
module.exports = async function() {
    const file = await fsp.readFile('./examples/mdstat/typical.mdstat', {encoding: 'utf-8'});
    return parser.parse(file);
};
