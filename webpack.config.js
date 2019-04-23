const webpack = require('webpack');
const dotenv = require('dotenv')
const fs = require('fs');
const path = require('path');

const CopyPlugin = require('copy-webpack-plugin');
const HtmlWebPackPlugin = require("html-webpack-plugin");


module.exports = env => {
    // Get the root path (assuming your webpack config is in the root of your project!)
    const currentPath = path.join(__dirname);
    // Create the fallback path (the production .env)
    const basePath = currentPath + '/.env';

    // We're concatenating the environment name to our filename to specify the correct env file!
    const envPath = basePath + '.' + env.NODE_ENV;


    // Check if the file exists, otherwise fall back to the production .env
    const finalPath = fs.existsSync(envPath) ? envPath : basePath;

    // Set the path parameter in the dotenv config
    const fileEnv = dotenv.config({ path: finalPath }).parsed;

    // reduce it to a nice object, the same as before (but with the variables from the file)
    const envKeys = Object.keys(fileEnv).reduce((prev, next) => {
        prev[`process.env.${next}`] = JSON.stringify(fileEnv[next]);
        return prev;
    }, {});

    return {
        entry: "./src/index.js",
        mode: "development",
        module: {
            rules: [
                {
                    test: /\.(js|jsx)$/,
                    exclude: /(node_modules)/,
                    loader: "babel-loader",
                    options: {presets: ["@babel/env"]}
                },
                {
                    test: /\.css$/,
                    use: ["style-loader", "css-loader"]
                },
                {
                    test: /\.html$/,
                    use: [
                        {
                            loader: "html-loader"
                        }
                    ]
                }
            ]
        },
        resolve: {extensions: ["*", ".js", ".jsx"]},
        output: {
            path: path.resolve(__dirname, "dist/"),
            publicPath: "",
            filename: "bundle.js"
        },
        devServer: {
            contentBase: path.join(__dirname, "public/"),
            port: process.env.PORT,
            publicPath: process.env.WEBSITE_ROOT,
            historyApiFallback: true,
            hotOnly: true
        },
        plugins: [
            new webpack.DefinePlugin(envKeys),
            new webpack.HotModuleReplacementPlugin(),
            new HtmlWebPackPlugin({
                template: "./src/index.html",
                // fileName: "../index.html",
                hash: true
            }),
            new CopyPlugin([
                { from: 'public', to: '' }
            ]),
        ]
    }
};
