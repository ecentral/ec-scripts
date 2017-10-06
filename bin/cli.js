#!/usr/bin/env node
const util = require('util');
const parseArgs = require('minimist');
const resolvePresets = require('../lib/utils/resolvePresets');
const combineConfigs = require('../lib/utils/combineConfigs');
const buildEslintrc = require('../lib/utils/buildEslintrc');

const extPath = process.cwd();

// Load the configurations.
const presetConfigs = resolvePresets(extPath);
// Combine all preset configurations.
const config = combineConfigs(presetConfigs);

// Parse cli args
const args = parseArgs(process.argv.slice(2));

// Always (re-)build .eslintrc file.
buildEslintrc(extPath, config.addons.eslint);

if (args.build || args.watch) {
    // Build and bundle all the things.
    const webpack = require('webpack');

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

if (args['show-config']) {
    // Print config
    console.info(util.inspect(config, true, null));
}
