module.exports = () => ({
    verbose: true,
    rootDir: process.cwd(),
    setupFiles: [
        require.resolve('./setupEnv'),
    ],
    moduleNameMapper: {
        '\\.(css|scss)$': require.resolve('identity-obj-proxy'),
        // Example for internal path alias (e.g. assets/foo -> src/assets/foo)
        // '^assets(.*)$': `<rootDir>${path.join(options.srcDir, 'assets')}$1`,
    },
    transform: {
        '\\.js$': require.resolve('./babelTransform'),
    },
});
