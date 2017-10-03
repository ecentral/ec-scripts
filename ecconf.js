const defaultOptions = {
    devMode: true, // TODO: Should be defined by `process.env.NODE_ENV !== 'production'`
    // Working and output directories
    srcDir: './src',
    buildDir: './build',
    distDir: './dist',
    // DevServer settings
    host: 'localhost', // TODO: Should use local network ip by default
    port: 3000,
    // List of supported browsers for babel-preset-env and autoprefixer.
    browserList: ['last 2 versions'],
};

const create = (options) => ({
    presets: [],

    options: defaultOptions,

    webpack: require('./config/webpack')(options),

    babel: {
        foo: 'core-config',
    },

    eslint: {
        foo: 'core-config',
    },

    jest: {
        foo: 'core-config',
    },
});

module.exports = {
    defaultOptions,
    create,
};
