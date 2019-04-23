const HtmlWebPackPlugin = require("html-webpack-plugin");
const webpack = require('webpack');
const dotenv = require('dotenv');
const fs = require('fs'); // to check if the file exists
const path = require('path'); // to get the current path

// call dotenv and it will return an Object with a parsed key
const env = dotenv.config().parsed;

const CopyPlugin = require('copy-webpack-plugin');

// reduce it to a nice object, the same as before
const envKeys = Object.keys(env).reduce((prev, next) => {
    prev[`process.env.${next}`] = JSON.stringify(env[next]);
    return prev;
}, {});

module.exports = (env) => {
    // Get the root path (assuming your webpack config is in the root of your project!)
    const currentPath = path.join(__dirname);

    // Create the fallback path (the production .env)
    const basePath = currentPath + '/.env';

    // We're concatenating the environment name to our filename to specify the correct env file!
    const envPath = basePath + '.' + env.ENVIRONMENT;

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
            port: 3000,
            publicPath: "http://localhost:3000/",
            historyApiFallback: true,
            hotOnly: true
        },
        plugins: [
            new webpack.HotModuleReplacementPlugin(),
            new webpack.DefinePlugin(envKeys),
            new HtmlWebPackPlugin({
                template: "./src/index.html",
                // fileName: "../index.html",
                hash: true
            }),
            new CopyPlugin([
                { from: 'public', to: 'public' }
            ]),

        ]
    }
};
