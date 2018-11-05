module.exports = {
    options: () => ({
        // Working and output directories
        srcDir: 'src',
        assetsDir: 'assets', // relative to srcDir
        buildDir: 'build',
        // Define files for main bundle
        entryFiles: [
            'index.js',
        ],
        // Set js output filename
        jsOutputFile: '[name].bundle.js',
        // Set css output filename
        cssOutputFile: 'style.css',
        // Set css filename for dynamic chunks
        cssChunkFile: '[id].css',
        // Set default html template (or `null` for no html template)
        htmlTemplate: 'index.html',
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
        inlineFileSize: -1, // Disabled
        // Define environment boolean flags
        devMode: process.env.NODE_ENV === 'development',
        testMode: process.env.NODE_ENV === 'test',
    }),

    addons: (config) => ({
        babel: require('./config/babel')(config.options),
        eslint: require('./config/eslint')(config.options),
    }),

    runners: (config) => ({
        webpack: require('./config/webpack')(config),
        jest: require('./config/jest')(config),
    }),
};
