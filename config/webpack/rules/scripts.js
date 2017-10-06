module.exports = (addons) => ({
    test: /\.js$/,
    use: [
        {
            loader: 'babel-loader',
            query: addons.babel,
        },
        {
            loader: 'eslint-loader',
        },
    ],
    exclude: /node_modules/,
});
