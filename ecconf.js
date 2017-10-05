module.exports = {
    options: () => ({
        devMode: false, // TODO: Should be defined by `process.env.NODE_ENV !== 'production'`
        // Working and output directories
        srcDir: './src',
        buildDir: './build',
        distDir: './dist',
        // Define files for main bundle
        entryFiles: [
            'index.js',
        ],
        // DevServer settings
        host: 'localhost', // TODO: Should use local network ip by default
        port: 3000,
        // List of supported browsers for babel-preset-env and autoprefixer.
        browserList: ['last 2 versions'],
    }),

    addons: ({ options }) => ({
        babel: require('./config/babel')(options),
        eslint: require('./config/eslint')(options),
    }),

    runners: (config) => ({
        webpack: require('./config/webpack')(config),
        // TODO: Add jest runner.
    }),
};
