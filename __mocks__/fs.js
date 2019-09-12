// Manual mocking of nodejs modules
// https://jestjs.io/docs/en/manual-mocks.html

// eslint-disable-next-line no-undef
const fs = jest.genMockFromModule('fs');

// holds modified files
let mockFiles = {};
function __setMockFiles(newMockFiles) {
    if (typeof newMockFiles === 'object') {
        mockFiles = newMockFiles;
    } else {
        mockFiles = {};
    }
}

function readFileSync(filePath) {
    if (mockFiles[filePath]) {
        return mockFiles[filePath];
    } else {
        throw new Error('no such file, open ' + filePath);
    }
}

fs.__setMockFiles = __setMockFiles;
fs.readFileSync = readFileSync;

module.exports = fs;