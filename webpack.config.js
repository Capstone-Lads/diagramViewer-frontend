const path = require('path');

module.exports = {
    mode: 'development',
    entry: './app.js',
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "build.js"
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: [
                    /node_modules/
                ],
                loader: "babel-loader",
            },
            {
                test: /\.css$/,
                loader: "css-loader"
            }
        ],
    },
    watch: true
}