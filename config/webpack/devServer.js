module.exports = ({ buildDir }) => ({
    contentBase: buildDir,
    hot: true,
    inline: true,
    stats: {
        colors: true,
        hash: false,
        timings: true,
        chunks: false,
        chunkModules: false,
        modules: false,
    },
});
