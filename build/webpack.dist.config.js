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
    app: './src/index.js'
  },
  output: {
    path: resolve('../dist'),
    filename: 'iviewExtra.js',
    libraryTarget: 'umd',
    library: 'iviewExtra',
    umdNamedDefine: true
  },
  externals: {
    vue: {
      root: 'Vue',
      commonjs: 'vue',
      commonjs2: 'vue',
      amd: 'vue'
    }
  },
  plugins: [
    new CleanWebpackPlugin(['dist/*'], {
      root: path.resolve(__dirname, '../')
    }),
    // new webpack.optimize.UglifyJsPlugin({
    //   compress: {
    //     warnings: false
    //   }
    // }),
    new webpack.DefinePlugin({
      'process.env': {
          NODE_ENV: '"production"'
      }
    })
  ]
})
