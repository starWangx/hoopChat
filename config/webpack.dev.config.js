const merge = require('webpack-merge');
const path = require('path');
const webpack = require('webpack');
const _path = require('./path')
const commonConfig = require('./webpack.common.config.js');

const devConfig = {
  mode: 'development',
  devtool: 'inline-source-map',
  entry: {
    app: [
      'babel-polyfill',
      'react-hot-loader/patch',
      path.join(__dirname, '../src/index.js')

    ]
  },
  output: {
    /*这里本来应该是[chunkhash]的，但是由于[chunkhash]和react-hot-loader不兼容。只能妥协*/
    filename: '[name].[hash].js'
  },

  devServer: {
    port: 9088,
    contentBase: _path.appDist,
    historyApiFallback: true,
    host: '0.0.0.0',
    proxy: {
      "/api/*": "http://localhost:8090/$1"
    }
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('development'),
        API_HOSTNAME: JSON.stringify(''),//开发环境地址
        API_PROTOCOL: JSON.stringify('http'),
      }
    }),
  ]
};

module.exports = merge({
  customizeArray(a, b, key) {
    /*entry.app不合并，全替换*/
    if (key === 'entry.app') {
      return b;
    }
    return undefined;
  }
})(commonConfig, devConfig);