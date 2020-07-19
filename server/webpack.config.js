const path = require("path");
const NODE_ENV = process.env.NODE_ENV || "production";

const nodeExternals = require('webpack-node-externals');
const WebpackShellPlugin = require('webpack-shell-plugin');

module.exports = {
    entry: "./src/app.ts",
    mode: NODE_ENV,
    target: "node",
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "app.js"
    },
    resolve: {
        extensions: [".ts", ".js"],
    },

    module: {
        rules: [
            {
                test: /\.ts$/,
                use: [
                    "ts-loader",
                ]
            }
        ]
    },
    externals: [nodeExternals()],
    plugins: [
        new WebpackShellPlugin({
            onBuildEnd: ['npm run dev']
        })
    ],
    watch: NODE_ENV === "development"
};