const path = require('path')
const webpack = require('webpack')
const merge = require('webpack-merge')
const LodashPlugin = require('lodash-webpack-plugin')
const ProgressBarPlugin = require('progress-bar-webpack-plugin')

const base = {
  entry: './app/index.js',
  output: {
    path: path.join(__dirname, '/dist'),
    publicPath: '/dist',
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.jsx?/i,
        exclude: /node_modules/,
        loader: 'babel-loader'
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.jsx', '.json']
  },
  plugins: [
    new ProgressBarPlugin({
      complete: '█',
      incomplete: '░',
      renderThrottle: 100
    }),
    new LodashPlugin()
  ]
}

const development = {
  mode: 'development',
  devtool: 'cheap-module-eval-source-map',
  devServer: {
    hot: true,
    port: 3000,
    stats: 'minimal',
    historyApiFallback: true
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ]
}

const production = {
  mode: 'production',
  plugins: []
}

module.exports = (() =>
  merge(base, process.env.NODE_ENV === 'production'
    ? production
    : development
  )
)()
