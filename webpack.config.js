const path = require("path");
const webpack = require("webpack");

const MiniCssExtractPlugin = require("mini-css-extract-plugin");

if (process.env.NODE_ENV !== "production") {
    // Already set on heroku production
    process.env.apiKey = require("./secrets.json").apiKey;
}

// let googleSecret =
//     process.env.apiKey || JSON.stringify(require("./google.json"));
// console.log("googlesecret: ", googleSecret);
// process.env.apiKey = process.env.apiKey || JSON.stringify("./google.json");

module.exports = () => ({
    entry: [
        "@babel/polyfill",
        path.join(__dirname, "client", "style.css"),
        path.join(__dirname, "client", "src", "start.js"),
    ],
    output: {
        path: path.join(__dirname, "client", "public"),
        filename: "bundle.js",
    },
    performance: {
        hints: false,
    },
    devServer: {
        contentBase: path.join(__dirname, "client", "public"),
        proxy: {
            "/": {
                target: "http://localhost:3001",
            },
            "/socket.io": {
                target: "http://localhost:3001",
                ws: true,
            },
        },
        port: "3000",
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                loader: "babel-loader",
            },
            {
                test: /\.css$/i,
                use: [
                    MiniCssExtractPlugin.loader,
                    {
                        loader: "css-loader",
                        options: {
                            url: false,
                        },
                    },
                ],
            },
        ],
    },
    // plugins: [
    //     new MiniCssExtractPlugin({
    //         filename: "bundle.css",
    //     }),
    //     new webpack.EnvironmentPlugin(["apiKey"]),
    //     new webpack.DefinePlugin({
    //         apiKey:
    //             process.env.apiKey || JSON.stringify(require("./google.json")),
    //     }),
    // ],
    plugins: [
        new MiniCssExtractPlugin({
            filename: "bundle.css",
        }),
        new webpack.EnvironmentPlugin(["apiKey"]),
    ],
});

// new webpack.EnvironmentPlugin([
//     "apiKey",
//     process.env.apiKey || JSON.stringify(require("./google.json")),
// ]);
