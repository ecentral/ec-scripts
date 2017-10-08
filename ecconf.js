module.exports = {
    options: () => ({
        // Working and output directories
        srcDir: 'src',
        assetsDir: 'assets', // relative to srcDir
        stylesDir: 'styles', // relative to srcDir
        buildDir: 'build',
        // Define files for main bundle
        entryFiles: [
            'index.js',
        ],
        // Set default html template (or `null` for no html template)
        htmlTemplate: require.resolve('./templates/index.ejs'),
        // Define page title
        title: 'App | powered by ec-scripts',
        // DevServer settings
        host: '0.0.0.0',
        port: 3000,
        // List of supported browsers for babel-preset-env and autoprefixer.
        browserList: [
            '>1%',
            'last 4 versions',
            'Firefox ESR',
            'not ie < 9',
        ],
        // The file size in bytes under which the url-loader kicks in.
        inlineFileSize: 10000,
        // Define environment boolean flags
        devMode: process.env.NODE_ENV === 'development',
        testMode: process.env.NODE_ENV === 'test',
    }),

    addons: ({ options }) => ({
        babel: require('./config/babel')(options),
        eslint: require('./config/eslint')(options),
    }),

    runners: (config) => ({
        webpack: require('./config/webpack')(config),
        jest: require('./config/jest')(config),
    }),
};
