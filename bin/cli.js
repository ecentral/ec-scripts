#!/usr/bin/env node
const util = require('util');
const parseArgs = require('minimist');
const invariant = require('invariant');
const resolvePresets = require('../lib/utils/resolvePresets');
const combineConfigs = require('../lib/utils/combineConfigs');
const writeFile = require('../lib/utils/writeFile');
const settings = require('../lib/settings');

invariant(
    process.env.NODE_ENV !== undefined,
    'The NODE_ENV environment variable is required but was not specified.'
);

// Load the configurations.
const presetConfigs = resolvePresets(settings.appPath);
// Combine all preset configurations.
const config = combineConfigs(presetConfigs);

// Parse cli args
const args = parseArgs(process.argv.slice(2));

// Always rebuild .eslintrc file.
writeFile(settings.appPath, '.eslintrc.json', config.addons.eslint);

if (args.build) {
    // Build and bundle all the things.
    const webpack = require('webpack');

    invariant(
        !config.options.devMode && !config.options.testMode,
        'Make sure to run build script in "production" mode.'
    );

    if (args.watch) {
        // Add flag for watch mode.
        config.runners.webpack.watch = true;
    }

    webpack(config.runners.webpack, (err, stats) => {
        if (err) throw err;

        console.log('[webpack]', stats.toString({
            colors: true,
            hash: false,
            timings: true,
            chunks: false,
            chunkModules: false,
            modules: false,
        }));
    });
}

if (args.start) {
    // Start webpack with dev server
    const webpack = require('webpack');
    const WebpackDevServer = require('webpack-dev-server');

    invariant(
        config.options.devMode && !config.options.testMode,
        'Make sure to start dev server in "development" mode.'
    );

    const { host, port } = config.options;
    const url = `http://${host}:${port}`;

    new WebpackDevServer(
        webpack(config.runners.webpack),
        // For some reason passing this explicitly seems necessary
        config.runners.webpack.devServer
    )
        .listen(port, host, (err) => {
            if (err) throw err;
            // Server listening
            console.info('[webpack-dev-server]', url);
        });
}

if (args.test) {
    // Run tests with jest
    const jest = require('jest');

    invariant(
        config.options.testMode,
        'Make sure to run tests in "test" mode.'
    );

    // Makes the script crash on unhandled rejections instead of silently
    // ignoring them. In the future, promise rejections that are not handled will
    // terminate the Node.js process with a non-zero exit code.
    process.on('unhandledRejection', (err) => { throw err; });

    // Make configuration globally available in test environment.
    // This is necessary for the babel-jest transformer to work.
    writeFile(settings.appPath, '.babelrc', config.addons.babel);

    const argsList = process.argv
        .slice(2)
        .filter(arg => arg !== '--test');

    argsList.push('--config', JSON.stringify(config.runners.jest));

    jest.run(argsList);
}

if (args['show-config']) {
    // Print config
    console.info(util.inspect(config, true, null));
}
