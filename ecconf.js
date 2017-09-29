module.exports = {
    presets: [],

    config: {
        webpack: {
            foo: 'core-config',

            module: {
                rules: [
                    {
                        test: /\.(js|jsx)$/,
                        use: [
                            {
                                loader: 'react-hot-loader',
                            },
                            {
                                loader: 'babel-loader',
                                options: {
                                    plugins: ['transform-runtime'],
                                    presets: [
                                        ['es2015', { modules: false }],
                                        'stage-1',
                                        'react',
                                    ]
                                }
                            },
                            {
                                loader: 'eslint-loader',
                                options: {
                                    configFile: './.eslintrc',
                                }
                            }
                        ],
                        exclude: /node_modules/
                    },
                ],
            },
        },

        babel: {
            foo: 'core-config',
        },

        eslint: {
            foo: 'core-config',
        },

        jest: {
            foo: 'core-config',
        },
    }
};
