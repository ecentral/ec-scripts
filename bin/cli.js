#!/usr/bin/env node
const util = require('util');
const parseArgs = require('minimist');
const resolvePresets = require('../lib/utils/resolvePresets');
const combineConfigs = require('../lib/utils/combineConfigs');

// Load the configurations.
const presetConfigs = resolvePresets(process.cwd());
// Combine all preset configurations.
const config = combineConfigs(presetConfigs);

// Parse cli args
const args = parseArgs(process.argv.slice(2));

if (args.build || args.b) {
    // Build and bundle all the things
    const webpack = require('webpack');

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

if (args.start || args.s) {
    // Start webpack with dev server
    const webpack = require('webpack');
    const WebpackDevServer = require('webpack-dev-server');

    const { host, port } = config.options;
    const url = `http://${host}:${port}`;

    new WebpackDevServer(webpack(config.runners.webpack))
        .listen(port, host, (err) => {
            if (err) throw err;
            // Server listening
            console.info('[webpack-dev-server]', url);
        });
}

if (args['show-config'] || args.lc) {
    // Print config
    console.info('Merged project configuration:');
    console.info(util.inspect(config, true, null));
}
