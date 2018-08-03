let ExtractTextWebpackPlugin = require("extract-text-webpack-plugin");

let path = require("path");

//Webpack Extract Text Plugin
let ExtractText = new ExtractTextWebpackPlugin("app.css");

let config = {
    entry: path.resolve("./app.ts"),
    mode: "development",
    output: {
        filename: "app.js",
        path: path.resolve("./dist"),
        library: "opentok-ux-components",
        libraryTarget: 'umd',
        umdNamedDefine: true
    },
    devtool: "source-map",
    resolve: {
        extensions: [".ts", ".tsx", ".js", ".jsx", ".json"]
    },

    module: {
        rules: [{
                test: /\.tsx?$/,
                exclude: [/-ignore\.tsx?$/],
                exclude: [/-ignore\.tsx?$/],
                loader: "awesome-typescript-loader"
            }, {
                test: /\.jsx?$/,
                loader: "babel-loader",
                exclude: [
                    /node_modules/, /-ignore\.tsx?$/
                ],
                query: {
                    presets: [
                        "es2015", "react"
                    ],
                    plugins: ["transform-class-properties", "transform-decorators-legacy"]
                }
            }, {
                enforce: "pre",
                test: /\.js$/,
                loader: "source-map-loader"
            }, {
                test: /\.scss$/,
                use: ExtractTextWebpackPlugin.extract({
                    fallback: "style-loader",
                    use: ["css-loader", "sass-loader"]
                })
            }, {
                test: /\.css$/,
                use: ExtractTextWebpackPlugin.extract({ fallback: "style-loader", use: ["css-loader"] })
            }, {
                test: /\.(woff(2)?|ttf|eot|svg|otf)(\?v=\d+\.\d+\.\d+)?$/,
                use: [{
                    loader: "file-loader",
                    options: {
                        name: "[name].[ext]",
                        outputPath: "fonts/"
                    }
                }]
            },
            {
                test: /\.(jpe?g|png|gif)$/i,
                loader: "file-loader?name=/resources/images/[name].[ext]"
            }
        ]
    },

    plugins: [ExtractText]
};

//Export Config
module.exports = config;