// Manual mocking of nodejs modules
// https://jestjs.io/docs/en/manual-mocks.html

// eslint-disable-next-line no-undef
const fs = jest.genMockFromModule('fs');

let mockFiles = {};
let mockDirs = {};
let mockLinks = {};

// set up functions (object based)
function __setMockFiles(newMockFiles) {
    if (typeof newMockFiles === 'object') {
        mockFiles = newMockFiles;
    } else {
        mockFiles = {};
    }
        
}

function __setMockDirs(newMockDirs) {
    if (typeof newMockDirs === 'object') {
        mockDirs = newMockDirs;
    }
    else {
        mockDirs = {};
    }
}

function __setMockLinks(newMockLinks) {
    if (typeof newMockLinks === 'object') {
        mockLinks = newMockLinks;
    } else {
        mockLinks = {};
    }
}

// summarize function to set up all objects at once
function __setMockFS(newMockFS) {
    __setMockFiles(newMockFS['files']);
    __setMockDirs(newMockFS['dirs']);
    __setMockLinks(newMockFS['links']);
}

// mocked functions (reading from set up objects)
function readFileSync(filePath) {
    if (mockFiles[filePath]) {
        return mockFiles[filePath];
    } else {
        throw new Error('no such file or directory, open ' + filePath);
    }
}

function readdirSync(dirPath) {
    if (mockDirs[dirPath]) {
        return mockDirs[dirPath];
    } else {
        throw new Error('no such file or directory, scandir ' + dirPath);
    }
}

function readlinkSync(linkPath) {
    if (mockLinks[linkPath]) {
        return mockLinks[linkPath];
    } else {
        throw new Error('no such file or directory, readlink ' + linkPath);
    }
}

fs.__setMockFiles = __setMockFiles;
fs.__setMockDirs = __setMockDirs;
fs.__setMockLinks = __setMockLinks;
fs.__setMockFS = __setMockFS;

fs.readFileSync = readFileSync;
fs.readdirSync = readdirSync;
fs.readlinkSync = readlinkSync;

module.exports = fs;