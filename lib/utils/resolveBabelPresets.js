/**
 * This is a workaround that helps babel resolve its presets.
 * See https://github.com/babel/babel-loader/issues/166#issuecomment-160866946
 * @param {Array} presets The presets to use (not prefixed).
 * @return {Array} The resolved presets to use.
 */
const resolveBabelPresets = (presets) => (
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

module.exports = resolveBabelPresets;
