const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const autoprefixer = require('autoprefixer');
const px2rem = require('postcss-px2rem');
const _path = require('./path');

commonConfig = {
  entry: {
    app: [
      "babel-polyfill",
      'react-hot-loader/patch',
      require.resolve('./polyfills'),
      path.join(__dirname, '../src/index.js')

    ],
    vendor: ['react', 'react-router-dom', 'redux', 'react-dom', 'react-redux']
  },
  output: {
    path: _path.appDist,
    filename: '[name].[chunkhash].js',
    chunkFilename: '[name].[chunkhash].js',
    publicPath: "/"
  },
  module: {
    rules: [{
      test: /\.js$/,
      use: ['babel-loader?cacheDirectory=true'],
      include: _path.appSrc
    }, {
      test: /\.(png|jpg|gif|svg|bmp|jpeg)$/,
      use: [{
        loader: 'url-loader',
        options: {
          limit: 8192
        }
      }]
    }, {
      test: /\.(css|less)$/,
      use: [
        require.resolve('style-loader'),
        {
          loader: require.resolve('css-loader'),
          options: {
            importLoaders: 1,
          },
        }, {
          loader: require.resolve('postcss-loader'),
          options: {
            // Necessary for external CSS imports to work
            // https://github.com/facebookincubator/create-react-app/issues/2677
            ident: 'postcss',
            plugins: () => [
              require('postcss-flexbugs-fixes'),
              autoprefixer({
                browsers: [
                  '>1%',
                  'last 4 versions',
                  'Firefox ESR',
                  'not ie < 9', // React doesn't support IE8 anyway
                ],
                flexbox: 'no-2009',
              }),
              px2rem({remUnit: 75})
            ],
          }
        }, {
          loader: require.resolve('less-loader')
        },
      ],
    }]
  },
  optimization: {
    runtimeChunk: {
      name: 'manifest'
    },
    // minimizer: true, // [new UglifyJsPlugin({...})] //minimizer 必须是数组，在production模式下使用到，见步骤4
    splitChunks: {
      chunks: 'async',
      minSize: 30000,
      minChunks: 1,
      maxAsyncRequests: 5,
      maxInitialRequests: 3,
      name: false,
      cacheGroups: {
        vendor: {
          name: 'vendor',
          chunks: 'initial',
          priority: -10,
          reuseExistingChunk: false,
          test: /node_modules\/(.*)\.js/
        },
        styles: {
          name: 'styles',
          test: /\.(less|scss|css)$/,
          chunks: 'all', // merge all the css chunk to one file
          minChunks: 1,
          reuseExistingChunk: true,
          enforce: true
        }
      }
    }
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: path.join(_path.appSrc, './index.html')
    }),
    new webpack.HashedModuleIdsPlugin(),
    new webpack.DefinePlugin(
      {
        'process.env': {

        },
      }
    ),

  ],

  resolve: {
    alias: {
      pages: _path.pagesPath,
      components: _path.commonPath,
      router: _path.routerPath,
      actions: path.join(_path.appSrc, './redux/actions'),
      reducers: path.join(_path.appSrc, './redux/reducers'),
      mock: path.join(_path.appSrc, './mock'),
      image: path.join(_path.appSrc, './image'),
      '@': _path.appSrc,
    }
  }
};

module.exports = commonConfig;