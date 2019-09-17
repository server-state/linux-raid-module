module.exports = {
    entry: './src/index.js',
    output: {
        path: __dirname,
        filename: 'index.js',
        libraryTarget: 'commonjs2'
    },
    node: {
        fs: 'empty'
    },
    module: {
        rules: [
            { test: /\.pegjs$/, use: 'pegjs-loader' }
        ]
    }
};