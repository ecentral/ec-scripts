const path = require('path');
const getConfig = require('./getConfig');

/**
 * Resolves the configurations including presets and the base scripts package.
 * @param configPath The path where to find ecconf.js (without filename).
 * @returns {Object} A lookup of loaded configurations.
 */
const resolvePresets = (configPath) => {
    const config = getConfig(configPath);

    const presets = ['scripts'].concat(config.presets || []);

    return presets.map((preset) => {
        const presetConfigPath = path.resolve(configPath, 'node_modules', `ec-${preset}`);
        return getConfig(presetConfigPath);
    }).concat([config]);
};

module.exports = resolvePresets;
