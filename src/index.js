const fs = require('fs');
const path = require('path');
const parser = require('./grammar.pegjs');

const defaultOptions = {
    filter: [],
    invert: false
};

function validateOptions(options) {
    if (!Array.isArray(options.filter))
        throw new Error('Wrong argument type. Expected options: filter to be an array, but found ' + typeof options.filter);

    if (typeof options.invert !== 'boolean')
        throw new Error('Wrong argument type. Expected options: invert to be a boolean, but found ' + typeof options.invert);
}

/**
 * A module for the server-state system
 * 
 * Parse the file /proc/mdstat generated from the linux raid kernel module and extract useful information
 * 
 * @throws if invalid options format is given
 * @throws if kernel module not loaded and file /proc/mdstat not created
 * @throws if parser can not parse current /proc/mdstat
 * 
 * @argument options given options to specifiy module task
 * 
 * @returns {object|array|string|number|boolean} A JSON-serializable (via `JSON.stringify()`) vers{object|array|string|number|boolean}ion information about the raids in the linux system
 */
module.exports = async function (options) {
    options = Object.assign(defaultOptions, options);
    validateOptions(options);

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

    // filter through valid raids
    // passes filter, if name is unique or name of raid inserted (with invert option)
    result.raids = result.raids.filter(elem => 
        options.invert ^ !(options.filter.includes(elem.unique) || options.filter.includes(elem.name))
    );
    
    return result;
};
