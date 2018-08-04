const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const merge = require('webpack-merge')
const webpackBaseConfig = require('./webpack.base.config.js')
const path = require('path')
function resolve (dir) {
  return path.join(__dirname, dir)
}

module.exports = merge(webpackBaseConfig, {
  entry: {
    app: './examples/main.js'
  },
  output: {
    path: resolve('../examples/dist'),
    filename: '[name].[hash].js'
  },
  devtool: '#source-map',
  devServer: {
    port: 8080,
    host: '0.0.0.0',
    hot: true,
    proxy: {}
  },
  plugins: [
    new ExtractTextPlugin({
      filename: '[name].css',
      allChunks: true
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    // new webpack.optimize.CommonsChunkPlugin({
    //   name: ['vender-exten', 'vender-base'],
    //   minChunks: Infinity
    // }),
    new HtmlWebpackPlugin({
      filename: resolve('../examples/dist/index.html'),
      template: resolve('../examples/index.html'),
      inject: true
    })
  ]
})
