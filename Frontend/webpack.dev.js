/** @format */

const { merge } = require("webpack-merge");
const common = require("./webpack.common.js");
const path = require("path");
const webpack = require("webpack");

module.exports = merge(common, {
    mode: "development",
    devtool: "inline-source-map",
    devServer: {
        proxy: {
            "/v1": {
                target: "http://localhost:5000",
                changeOrigin: true,
                secure: false
            }
        },
        static: path.join(__dirname, "dist"),
    },
    output: {
        filename: "[name].bundle.js",
        path: path.resolve(__dirname, "dist"),
        libraryTarget: "var",
        library: "EntryPoint",
        publicPath: "/",
    },
    plugins: [
        new webpack.DefinePlugin({
            SERVICE_URL: JSON.stringify("http://localhost:5000"),
            AUTHENTICATION_URL: JSON.stringify("https://auth.uocra.net"),
        }),
    ],
});
