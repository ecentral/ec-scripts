module.exports = {
    options: () => ({
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
    }),

    addons: (addons, options) => ({
        babel: {
            foo: 'bar',
        },

        eslint: require('./config/eslint')(options),
    }),

    runners: (runners, addons, options) => ({
        webpack: require('./config/webpack')(options),
    }),
};
