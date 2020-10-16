module.exports = {
    output: {
        path: __dirname,
        filename: 'index.js',
        libraryTarget: 'commonjs2'
    },
    resolve: {
        fallback: {
            path: false,
            fs: false
        }
    },
    module: {
        rules: [
            { test: /\.pegjs$/, use: 'pegjs-loader' }
        ]
    }
};
