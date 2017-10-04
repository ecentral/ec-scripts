const invariant = require('invariant');
const merge = require('./merge');

/**
 * Casts a value to a function wrapper.
 * @param {*} value
 * @returns {Function}
 */
const castFunction = (value) => (
    typeof value === 'function' ? value : () => value
);

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

    const result = {};

    result.options = configs.reduce((options, presetConfig) => {
        const nextOptions = castFunction(presetConfig.options)({
            ...result,
            options,
        });
        return merge(options, nextOptions);
    }, {});

    result.addons = configs.reduce((addons, presetConfig) => {
        const nextAddons = castFunction(presetConfig.addons)({
            ...result,
            addons,
        });
        return merge(addons, nextAddons);
    }, {});

    result.runners = configs.reduce((runners, presetConfig) => {
        const nextRunners = castFunction(presetConfig.runners)({
            ...result,
            runners,
        });
        return merge(runners, nextRunners);
    }, {});


    return result;
};

module.exports = combineConfigs;
