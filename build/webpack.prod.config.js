const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const merge = require('webpack-merge')
const webpackBaseConfig = require('./webpack.base.config.js')
const path = require('path')
function resolve (dir) {
  return path.join(__dirname, dir)
}

module.exports = merge(webpackBaseConfig, {
  output: {
    path: resolve('../dist'),
    filename: '[name].[hash].js',
    publicPath: './'
  },
  plugins: [
    new CleanWebpackPlugin(['dist/*'], {
      root: path.resolve(__dirname, '../')
    }),
    new ExtractTextPlugin({
      filename: '[name].[hash].css',
      allChunks: true
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendors',
      minChunks: Infinity
    }),
    // new webpack.DefinePlugin({
    //     'process.env': {
    //         NODE_ENV: '"production"'
    //     }
    // }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    }),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'index.html',
      query: `?${+new Date()}`,
      inject: true
    }),
    new CopyWebpackPlugin([
      {
        from: 'static/',
        to: 'static'
      }
    ])
  ]
})
