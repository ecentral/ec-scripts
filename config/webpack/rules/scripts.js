const fs = require('fs');

/**
 * This is a workaround that helps babel resolve its presets.
 * See https://github.com/babel/babel-loader/issues/166#issuecomment-160866946
 * @param {Array} presets The presets to use (not prefixed).
 * @return {Array} The resolved presets to use.
 */
const getBabelPresets = presets => presets.map(preset => require.resolve(`babel-preset-${preset}`));

module.exports = ({ eslint }) => ({
    test: /\.js$/, // /\.(js|jsx)$/,
    use: [
        {
            loader: 'babel-loader',
            query: {
                // TODO: How to pass the targets in browserList here?
                presets: getBabelPresets([
                    'env',
                    'stage-1',
                ]),
            },
        },
        {
            loader: 'eslint-loader',
            options: {
                useEslintrc: fs.existsSync('./eslintrc.js'),
                rules: eslint,
            },
        },
    ],
    exclude: /node_modules/,
});
