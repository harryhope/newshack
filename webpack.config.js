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
    alias: {
      assets: path.resolve(__dirname, 'app/assets'),
      store: path.resolve(__dirname, 'app/store'),
      styles: path.resolve(__dirname, 'app/styles'),
      components: path.resolve(__dirname, 'app/components'),
      containers: path.resolve(__dirname, 'app/containers'),
      utils: path.resolve(__dirname, 'app/utils')
    },
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
