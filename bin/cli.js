#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
const util = require('util');
const parseArgs = require('minimist');
const resolvePresets = require('../lib/utils/resolvePresets');
const combineConfigs = require('../lib/utils/combineConfigs');

const extPath = process.cwd();

// Load the configurations.
const presetConfigs = resolvePresets(extPath);
// Combine all preset configurations.
const config = combineConfigs(presetConfigs);

// Parse cli args
const args = parseArgs(process.argv.slice(2));

if (args.init) {
    // Create eslint config file.
    const eslintConfig = JSON.stringify(config.addons.eslint, null, 4);
    const eslintFileName = path.join(extPath, '.eslintrc.json');

    fs.writeFileSync(eslintFileName, eslintConfig);
}

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

    new WebpackDevServer(webpack(config.runners.webpack))
        .listen(port, host, (err) => {
            if (err) throw err;
            // Server listening
            console.info('[webpack-dev-server]', url);
        });
}

if (args['show-config']) {
    // Print config
    console.info('Merged project configuration:');
    console.info(util.inspect(config, true, null));
}
