#!/usr/bin/env node
const parseArgs = require('minimist');

const args = parseArgs(process.argv.slice(2));

if (args.s || args.start) {
    // Start webpack dev server.
}

if (args.status) {
    // Print config
    const mergeConfig = require('../lib/utils/mergeConfig');

    const coreConfig = require('../ecconf');
    // eslint-disable-next-line import/no-dynamic-require
    const extConfig = require(`${process.cwd()}/ecconf`);

    const mergedConfig = mergeConfig(coreConfig, extConfig);

    const mergedConfigString = JSON.stringify(mergedConfig, null, 4);

    console.info('Merged project configuration:');
    console.info(mergedConfigString);
}
