const path = require('path');
const requireConfig = require('./requireConfig');

/**
 * Resolves the configurations including presets and the base scripts package.
 * @param extPath The path to the project's ecconf.js (without filename).
 * @returns {Object} A lookup of loaded configurations.
 */
const resolvePresets = (extPath) => {
    const config = requireConfig(extPath);

    // Add ec-scripts as initial configuration.
    const presets = ['ec-scripts']
        // Prefix other presets.
        .concat((config.presets || []).map(preset => `ec-scripts-${preset}`));

    return presets.map((preset) => {
        const presetConfigPath = path.resolve(extPath, 'node_modules', preset);
        return requireConfig(presetConfigPath);
    }).concat([config]);
};

module.exports = resolvePresets;
