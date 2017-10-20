#!/usr/bin/env node
const invariant = require('invariant');
const checkVersions = require('../lib/utils/checkVersions');
const settings = require('../lib/settings');

// NODE_ENV variable should be set.
invariant(
    process.env.NODE_ENV !== undefined,
    'The NODE_ENV environment variable is required but was not specified.'
);

// Check for proper node and npm versions,
// then run the main script file.
checkVersions().then((versions) => {
    invariant(
        versions.node,
        `You need at least node version ${settings.requiredVersions.node} to run ec-scripts.`
    );

    invariant(
        versions.npm,
        `You need at least npm version ${settings.requiredVersions.npm} to run ec-scripts.`
    );

    // Run the main script file.
    require('../lib/run')();
});
