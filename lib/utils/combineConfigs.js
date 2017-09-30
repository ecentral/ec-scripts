const invariant = require('invariant');
const merge = require('./merge');

/**
 * Combines the given list of configurations into one.
 * The first element in the list must be the root configuration.
 * The last element in the list must be the external configuration.
 * In between there can be preset configurations.
 * @param {Array} configs A list of configurations
 * @returns {*}
 */
const combineConfigs = (configs) => {
    invariant(
        configs.length >= 2,
        `Expected to receive at least 2 configurations. Received: ${configs.length}`
    );

    // The first item should be our root config
    const rootConfig = configs[0];
    // The last item should be our external config
    const extConfig = configs.slice(-1)[0];

    invariant(
        typeof rootConfig.defaultOptions === 'object',
        'Expected the first item to be the root configuration and contain \'defaultOptions\'.'
    );

    invariant(
        typeof rootConfig.create === 'function',
        'Expected the first item to be the root configuration and contain \'create()\'.'
    );

    // Merge default options with external options
    const mergedOptions = merge(
        rootConfig.defaultOptions,
        extConfig.options,
    );

    // Derive the base config from the merged options
    const baseConfig = rootConfig.create(mergedOptions);

    // Consecutively merge base config with all the remaining configs
    return configs.slice(1).reduce((acc, conf) => (
        merge(acc, conf)
    ), baseConfig);
};

module.exports = combineConfigs;
