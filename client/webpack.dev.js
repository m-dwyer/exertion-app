const path = require('path')
const { merge } = require('webpack-merge')
const common = require('./webpack.common.js')

module.exports = merge(common, {
  mode: 'development',
  devServer: {
    contentBase: path.resolve(__dirname, 'build'),
    compress: true,
    port: 3000,
    historyApiFallback: true,
    proxy: {
      '/graphql': 'http://localhost:4000',
      '/subscriptions': {
        target: 'ws://localhost:4000',
        ws: true
      }
    }
  },
  devtool: 'inline-source-map'
})
