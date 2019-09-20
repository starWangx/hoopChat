const merge = require('webpack-merge');
const webpack = require('webpack');
const UglifyJsPlugin = require("uglifyjs-webpack-plugin") ;
const CleanWebpackPlugin = require('clean-webpack-plugin');
const _path = require("./path");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");

const commonConfig = require('./webpack.common.config.js');

const publicConfig = {
  mode:'production',
  optimization: {
    minimizer: [
      new UglifyJsPlugin({
        cache: true,
        parallel: true,
        sourceMap: true
      }),
      new OptimizeCSSAssetsPlugin({}) // use OptimizeCSSAssetsPlugin
    ]
  },
  plugins: [
    new CleanWebpackPlugin(['dist/*.*'], {
      root: _path.appPath,
      verbose: true,
    }),

    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production'),
        API_HOSTNAME:JSON.stringify('https://customapi.ibuscloud.com'),//开发环境地址

        API_PROTOCOL: JSON.stringify('http'),
        API_VERSION: JSON.stringify('mdm/v1'),
      }
    }),
  ]

};

module.exports = merge(commonConfig, publicConfig);