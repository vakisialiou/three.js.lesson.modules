const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const isProduction = process.env.NODE_ENV === 'production'
let dir = 'app'
// dir = 'debug'

const version = prepareNewVersion(isProduction);

const HtmlWebpackPluginConfig = new HtmlWebpackPlugin({
  template: `./${dir}/index.html`,
  filename: 'index.html',
  inject: 'body',
});

const ExtractTextPluginConfig = new ExtractTextPlugin(version + '/bundle.min.css')

const UglifyJsPluginConfig =  new UglifyJsPlugin({
  sourceMap: true,
  extractComments: true
});

const CopyWebpackPluginConfig = new CopyWebpackPlugin([
  { from: `${dir}/web/images`, to: version +'/images' },
  { from: `${dir}/web/models`, to: version +'/models' },
  // { from: `${dir}/web/models/**/*.3ds`, to: version +'/models' },
  `${dir}/icon.ico`
])

module.exports = {
  entry: `./${dir}/index.js`,
  output: {
    path: path.resolve('public'),
    filename: version + '/bundle.min.js'
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            {
              loader: 'css-loader',
              options: {
                minimize: true
              }
            }
          ]
        })
      },
      {
        test: /\.pcss$/,
        exclude: /node_modules/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              module: true,
              importLoaders: 1,
              localIdentName: '[folder]-[local]--[hash:base64:5]',
            }
          },
          'postcss-loader'
        ],
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: "babel-loader"
      },
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: "babel-loader"
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.jsx', '.json', '.pcss', '.css'],
    alias: {
      '@app': path.resolve(__dirname, './app'),
      '@app-debug': path.resolve(__dirname, './app-debug'),
      '@helper': path.resolve(__dirname, './helper'),
      '@entity': path.resolve(__dirname, './entity'),
    },
  },
  plugins: [
    HtmlWebpackPluginConfig,
    ExtractTextPluginConfig,
    UglifyJsPluginConfig,
    CopyWebpackPluginConfig
  ],
  performance: { hints: false }
};

/**
 *
 * @returns {string}
 */
function prepareNewVersion(isProduction) {
  if (isProduction) {
    return process.env.npm_package_version
  }
  return '0.0.0'
}