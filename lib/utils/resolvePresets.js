const path = require('path');
const getConfig = require('./getConfig');

/**
 * Resolves the configurations including presets and the base scripts package.
 * @param configPath The path where to find ecconf.js (without filename).
 * @returns {Object} A lookup of loaded configurations.
 */
const resolvePresets = (configPath) => {
    const config = getConfig(configPath);

    // Add ec-scripts as initial configuration.
    const presets = ['ec-scripts']
        // Prefix other presets.
        .concat((config.presets || []).map(preset => `ec-scripts-${preset}`));

    return presets.map((preset) => {
        const presetConfigPath = path.resolve(configPath, 'node_modules', preset);
        return getConfig(presetConfigPath);
    }).concat([config]);
};

module.exports = resolvePresets;
