var webpack = require("webpack");
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
    entry: __dirname + "/node/js/main.js",
    devtool: "source-map",
    output: {
        path: __dirname + "/public/min/",
        filename: "bundle.js"
    },
    mode: "development",
    plugins: [
        new UglifyJsPlugin({
            uglifyOptions: {
                compress: true,
                mangle: true
            }
        }),
        new webpack.ProvidePlugin({
            io: __dirname + "/node/js/socketio.js",
            jQuery: __dirname + "/node/js/jquery.js",
            $: __dirname + "/node/js/jquery.js"
            //toastr: "./toastr.js"
        })
    ]
}
