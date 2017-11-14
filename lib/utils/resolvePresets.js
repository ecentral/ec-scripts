const path = require('path');
const requireConfig = require('./requireConfig');
const settings = require('../settings');

/**
 * Resolves the configurations including presets and the base ec-scripts package.
 * @param [appPath=settings.appPath] An optional path to the project's ecconf.js (without filename).
 * @returns {Object} A lookup of loaded configurations.
 */
const resolvePresets = (appPath = settings.appPath) => {
    const config = requireConfig(appPath);

    // Add ec-scripts as initial configuration.
    const presets = ['ec-scripts']
        // Prefix other presets.
        .concat((config.presets || []).map(preset => `ec-scripts-preset-${preset}`));

    return presets.map((preset) => {
        const presetConfigPath = path.resolve(appPath, 'node_modules', preset);
        return requireConfig(presetConfigPath);
    }).concat([config]);
};

module.exports = resolvePresets;
