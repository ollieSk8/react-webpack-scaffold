/**
 * Created by ollie on 2017/12/14.
 */
var path = require('path');
var webpack = require('webpack');
var ROOT_PATH = path.resolve(__dirname);
var BUILD_PATH = path.resolve(__dirname, './public');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var UglifyJSPlugin = require('uglifyjs-webpack-plugin');
var OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
var entry=require('./webpack.entry');
module.exports = {
    entry:entry,
    output: {
        path: `${BUILD_PATH}/js`,
        filename: '[name].bundle.js',
    },
    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                loaders: ['babel-loader?presets[]=es2015,presets[]=react']
            },
            {
                test: /\.js$/, exclude: /node_modules/, loader: "babel-loader",query:{
                    presets: ['es2015']
                }
            },
            {
                test: /\.scss$/,
                loader: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: ['css-loader', 'sass-loader']
                })
            },
            {
                test: /\.(png|jpg|gif)$/,
                loader: 'file-loader?limit=8192',
                options: {
                    name:'[name].[ext]?[hash]',
                    outputPath:`../image/`,
                }
            },
            {
                test:/\.(woff|woff2|eot|ttf|svg)$/,
                loader:'file-loader',
                options:{
                    name:'[name].[ext]?[hash]',
                    outputPath:`../fonts/`
                }
            }
        ]
    },
    plugins: [
        new UglifyJSPlugin({
            uglifyOptions: {
                output: {
                    comments: false,
                    beautify: false
                },
                compress:{
                    keep_classnames:false,
                    drop_console:true,
                    drop_debugger:true,
                },
                keep_fnames:false,
                warnings: false
            }
        }),
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify('production')
            }
        }),
        new ExtractTextPlugin("../css/[name].css"),
        new OptimizeCssAssetsPlugin({
            assetNameRegExp: /\.css$/g,
            cssProcessor: require('cssnano'),
            cssProcessorOptions: { discardComments: { removeAll: true } },
            canPrint: true
        })
    ],
}