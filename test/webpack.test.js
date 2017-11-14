/* eslint-disable  no-undef */
const fs = require('fs');
const del = require('del');
const path = require('path');
const webpack = require('webpack');
const requireConfig = require('../lib/utils/requireConfig');
const combineConfigs = require('../lib/utils/combineConfigs');
const settings = require('../lib/settings');

process.chdir(__dirname);

const makeBundle = (config) => {
    const bundle = webpack(config.runners.webpack);

    return new Promise((resolve, reject) => {
        bundle.run((err, stats) => {
            if (err) {
                reject(err);
            } else if (stats.compilation.errors.length) {
                reject(Error(stats.toString('errors-only')));
            } else {
                resolve(stats);
            }
        });
    });
};

describe('Webpack', () => {
    // 60 sec time to create bundle
    jest.setTimeout(60000);

    const buildDir = 'build';
    const testConfig = {
        options: {
            srcDir: 'mock/src',
            buildDir,
            // Set production mode
            devMode: false,
            testMode: false,
        },
    };
    let config;

    beforeEach(() => {
        del([path.resolve(buildDir)]);

        const rootConfig = requireConfig(settings.rootPath);
        config = combineConfigs([rootConfig, testConfig]);
    });

    test('Bundle files are created without errors or warnings', () => (
        makeBundle(config).then((stats) => {
            const minStats = stats.toJson('minimal');

            expect(minStats.errors).toHaveLength(0);
            expect(minStats.warnings).toHaveLength(0);

            expect(fs.existsSync('./build/index.html')).toBe(true);
            expect(fs.existsSync('./build/main.bundle.js')).toBe(true);
            expect(fs.existsSync('./build/main.bundle.js.map')).toBe(true);
        })
    ));
});
