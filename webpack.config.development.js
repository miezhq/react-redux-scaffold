const config = require('./server/config');
const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const ENV = 'development';

const webpackConfig = {
  devtool: 'source-map',
  target: 'web',
  entry: {
    app: [
      'react-hot-loader/patch',
      'webpack-hot-middleware/client',
      './src/index.js',
    ],
    vendor: [
      'react',
      'react-dom',
      'redux',
      'react-redux',
      'react-router',
      'redux-immutable',
      'immutable',
    ],
  },
  resolve: {
    modules: [
      path.join(__dirname, 'src'),
      path.join(__dirname, 'node_modules'),
    ],
    extensions: ['.js', '.jsx'],
  },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name].js',
    publicPath: `${config.get('baseUrl')}static/`,
  },
  performance: {
    hints: false,
  },
};

webpackConfig.module = {
  rules: [
    {
      test: /\.js$/,
      exclude: /node_modules/,
      enforce: 'pre',
      use: [{ loader: 'eslint-loader', options: { rules: { semi: 0 } } }],
    },
    {
      test: /\.(js|jsx)$/,
      exclude: /node_modules/,
      loaders: ['babel-loader'],
    },
    {
      test: /\.s?css$/,
      loader: ExtractTextPlugin.extract({
        fallbackLoader: 'style-loader',
        loader: [
          {
            loader: 'css-loader',
            options: {
              modules: false,
            },
          },
          'postcss-loader',
          'sass-loader',
        ],
      }),
    },
    {
      test: /\.(jpe?g|png|gif|svg)$/i,
      use: [
        {
          loader: 'url-loader',
          options: {
            limit: 10000,
          },
        },
        {
          loader: 'img-loader',
          options: {
            progressive: true,
          },
        },
      ],
    },
    {
      test: /\.(woff|woff2|eot|ttf|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
      loader: 'file-loader',
    },
  ],
};

webpackConfig.plugins = [
  new webpack.optimize.CommonsChunkPlugin({
    name: 'vendor',
    minChunks: Infinity,
  }),

  new webpack.HotModuleReplacementPlugin(),
  // enable HMR globally

  new webpack.NamedModulesPlugin(),
  // prints more readable module names in the browser console on HMR updates

  new ExtractTextPlugin({
    filename: '[name].css',
    allChunks: true,
  }),

  new webpack.DefinePlugin({
    'process.env': {
      NODE_ENV: JSON.stringify(ENV),
    },
    __API_ENDPOINT__: JSON.stringify(config.get('api.endpoint')),
  }),
];

module.exports = webpackConfig;
