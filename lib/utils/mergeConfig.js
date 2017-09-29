/**
 * Creates a new merged configuration.
 * Object keys of extConfig can be functions that receive the
 * equivalent value of the given key in config or undefined if the key
 * does not exist in config.
 * @param {Object} config The original configuration.
 * @param {Object|Function} extConfig The configuration to merge.
 * @returns {Object} The merged configuration.
 */
const mergeConfigs = (config, extConfig) => {
    if (
        // If left or right side is primitive ...
        (typeof config !== 'object' || Array.isArray(config) || typeof extConfig !== 'object') &&
        // and right side is not a function.
        typeof extConfig !== 'function'
    ) {
        // Return right side if defined, else the original value.
        return extConfig !== undefined ? extConfig : config;
    }

    if (typeof extConfig === 'function') {
        return extConfig(config);
    }

    // Recursively create the object.
    const diff = Object.keys(extConfig).reduce((acc, key) => ({
        ...acc,
        [key]: mergeConfigs(config[key], extConfig[key])
    }), {});

    return {
        ...config,
        ...diff
    };
};

module.exports = mergeConfigs;
