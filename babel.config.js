const presets = [
    [
        "@babel/env",
        {
            corejs: "3.0.0",
            targets: {
                edge: "17",
                firefox: "60",
                chrome: "67",
                safari: "11.1",
            },
            useBuiltIns: "usage",
        },
    ],
    "@babel/preset-react"
];

const plugins = [
    '@babel/plugin-proposal-object-rest-spread',
    '@babel/plugin-proposal-class-properties'
];

module.exports = { presets, plugins };