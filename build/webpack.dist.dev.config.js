const webpack = require('webpack')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const merge = require('webpack-merge')
const webpackBaseConfig = require('./webpack.base.config.js')
const path = require('path')
function resolve (dir) {
  return path.join(__dirname, dir)
}

module.exports = merge(webpackBaseConfig, {
  entry: {
    app: './bbb/index.js'
  },
  output: {
    path: resolve('../dist1'),
    filename: 'webpack-bbb.js',
    publicPath: '/dist1/',
    library: 'webpackBbb',
    libraryTarget: 'umd',
    libraryExport: "default"
  },
  plugins: [
    new CleanWebpackPlugin(['dist1/*'], {
      root: path.resolve(__dirname, '../')
    })
  ]
})
