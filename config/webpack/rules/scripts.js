const fs = require('fs');

/**
 * This is a workaround that helps babel resolve its presets.
 * See https://github.com/babel/babel-loader/issues/166#issuecomment-160866946
 * @param {Array} presets The presets to use (not prefixed).
 * @return {Array} The resolved presets to use.
 */
const getBabelPresets = (presets) => (
    presets.map((preset) => {
        if (Array.isArray(preset)) {
            const [name, options] = preset;
            return [
                require.resolve(`babel-preset-${name}`),
                options,
            ];
        }

        return require.resolve(`babel-preset-${preset}`);
    })
);

module.exports = ({ browserList, eslint }) => ({
    test: /\.js$/,
    use: [
        {
            loader: 'babel-loader',
            query: {
                presets: getBabelPresets([
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
