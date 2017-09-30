module.exports = ({ browserList }) => ({
    test: /\.js$/, // /\.(js|jsx)$/,
    use: [
        {
            loader: 'babel-loader',
            options: {
                presets: [
                    ['env', {
                        modules: false,
                        targets: {
                            browsers: browserList,
                        },
                    }],
                    'stage-1',
                    // 'react'
                ],
                // plugins: ['react-hot-loader/babel'],
            },
        },
        {
            loader: 'eslint-loader',
            options: {
                // TODO: Resolve with correct config
                // How to access config.eslint here?
                // configFile: './.eslintrc.json',
            },
        },
    ],
    exclude: /node_modules/,
});
