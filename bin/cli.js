#!/usr/bin/env node

const path = require('path');
const parseArgs = require('minimist');
const getConfig = require('../lib/utils/getConfig');
const combineConfigs = require('../lib/utils/combineConfigs');

// Get some paths
const rootPath = path.resolve(__dirname, '../');
const extPath = process.cwd();

// Gather all the configurations
const rootConfig = getConfig(rootPath);
const extConfig = getConfig(extPath);
// Combine configurations
const config = combineConfigs([rootConfig, extConfig]);

// Parse cli args
const args = parseArgs(process.argv.slice(2));

if (args.build) {
    // Build and bundle all the things
    const webpack = require('webpack');

    // TODO: Fix "Can't resolve '...'" Errors
    // Webpack looks for modules in the project directory
    // but it should look for them here.
    // I already added aliases to webpacks config,
    // but that didn't solve all errors.
    webpack(config.webpack, (err, stats) => {
        if (err) throw err;

        console.log('[webpack]', stats.toString({
            colors: true,
            hash: false,
            timings: true,
            chunks: false,
            chunkModules: false,
            modules: false,
        }));

        process.exit();
    });
}

if (args.start || args.s) {
    // Start webpack with dev server
    const webpack = require('webpack');
    const WebpackDevServer = require('webpack-dev-server');

    const { host, port } = config.options;
    const url = `http://${host}:${port}`;

    new WebpackDevServer(webpack(config.webpack))
        .listen(port, host, (err) => {
            if (err) throw err;
            // Server listening
            console.info('[webpack-dev-server]', url);
        });
}

if (args.status) {
    // Print config
    const output = JSON.stringify(config, null, 4);

    console.info('Merged project configuration:');
    console.info(output);
}
