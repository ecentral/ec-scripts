const fs = require('fs');
const requireBabelPresets = require('../../../lib/utils/requireBabelPresets');

module.exports = ({ browserList, eslint }) => ({
    test: /\.js$/,
    use: [
        {
            loader: 'babel-loader',
            query: {
                presets: requireBabelPresets([
                    ['env', {
                        modules: false,
                        targets: {
                            browsers: browserList,
                        },
                    }],
                    'stage-1',
                ]),
            },
        },
        {
            loader: 'eslint-loader',
            options: {
                useEslintrc: fs.existsSync('./eslintrc.js'),
                // TODO: Get correct eslint config (eslint is not part of options parameter)
                rules: eslint,
            },
        },
    ],
    exclude: /node_modules/,
});
