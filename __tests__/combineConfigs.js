/* eslint-disable  no-undef */
const combineConfigs = require('./../lib/utils/combineConfigs');

describe('combineConfigs', () => {
    let result;
    let configA;
    let configB;
    let configC;
    let mockJsonQueryResolver;

    // Define test mock configurations
    beforeEach(() => {
        configA = {
            options: {
                host: 'root',
                port: 1,
            },
            addons: {
                eslint: {
                    extends: ['foo'],
                    rules: {
                        'some-rule': 'warn',
                        'other-rule': 'off',
                    },
                },
            },
            runners: {
                // This should be called w/ undefined (no prev config)
                webpack: jest.fn(() => ({
                    entry: {
                        main: 'root.js',
                    },
                    module: {
                        rules: [
                            {
                                test: /\.test$/,
                                use: [
                                    {
                                        loader: 'test-loader',
                                        options: {
                                            foo: 'bar',
                                        },
                                    },
                                ],
                            },
                        ],
                    },
                })),
            },
        };

        configB = {
            options: jest.fn(() => ({
                host: 'project',
            })),
            addons: {
                // This should merge entries of eslint.extends (func w/ spread)
                '$eslint.extends': (eslintExtends) => ([
                    ...eslintExtends,
                    'bar',
                ]),

                eslint: {
                    // This should overwrite previous eslint.rules (func w/o spread)
                    rules: () => ({
                        'only-rule': 'rules-them-all',
                    }),
                },
            },
            runners: {
                webpack: {
                    // This should get merged with previous webpack.entry (object)
                    entry: {
                        otherBundle: 'other.js',
                    },
                },
            },
        };

        mockJsonQueryResolver = jest.fn((loader) => ({
            ...loader,
            options: {
                ...loader.options,
                foo: 'baz',
            },
        }));

        configC = {
            runners: {
                webpack: {
                    '$module.rules[**].use[**][loader=test-loader]': mockJsonQueryResolver,
                },
            },
        };

        result = combineConfigs([configA, configB, configC]);
    });

    test('Function in config A should be called with undefined', () => {
        expect(configA.runners.webpack).toHaveBeenCalledTimes(1);
        expect(configA.runners.webpack).toHaveBeenCalledWith(undefined);
    });

    it('Function in config B should be called with previous config', () => {
        expect(configB.options).toHaveBeenCalledTimes(1);
        expect(configB.options).toHaveBeenCalledWith({
            options: {
                ...configA.options,
            },
        });
    });

    it('Primitive values should be merged correctly', () => {
        expect(result.options.host).toBe('project');
        expect(result.options.port).toBe(1);
    });

    it('Array values should be merged correctly', () => {
        expect(result.addons.eslint.extends).toHaveLength(2);
        expect(result.addons.eslint.extends).toContain('bar');
    });

    it('Object values can be overwritten', () => {
        expect(Object.keys(result.addons.eslint.rules)).toHaveLength(1);
        expect(result.addons.eslint.rules['only-rule']).toBeDefined();
    });

    it('Object values can be merged', () => {
        expect(Object.keys(result.runners.webpack.entry)).toHaveLength(2);
        expect(result.runners.webpack.entry.otherBundle).toBeDefined();
    });

    it('Query function should be merged correctly', () => {
        expect(
            result.runners.webpack.module.rules[0].use[0].options.foo
        ).toBe('baz');
    });

    it.skip('Query function should receive original value', () => {
        // Call mock fn first
        const webpackA = configA.runners.webpack();

        expect(mockJsonQueryResolver).toBeCalledWith(
            webpackA.module.rules[0].use[0]
        );
    });
});
