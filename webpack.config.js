const path = require('path')
const webpack = require('webpack')
require('dotenv').config()

const entry = {
  index: './src/App.js',
}

const output = {
  path: path.resolve(__dirname, 'public'),
  publicPath: '/public/',
  filename: 'bundle.js',
}

const devServer = {
  contentBase: path.join(__dirname, 'public'),
  publicPath: 'http://localhost:4000',
  port: 3000,
  compress: true,
  watchContentBase: true,
  historyApiFallback: true,
}

const babelLoader = {
  test: /\.js$/,
  exclude: /(node_modules|bower_components)/,
  use: {
    loader: 'babel-loader',
  },
}

const styleLoader = {
  test: /.s?css$/,
  use: [
    'style-loader',
    'css-loader',
    'sass-loader',
  ],
}

const envVariables = new webpack.DefinePlugin({
  'process.env.FIREBASE_API_KEY': JSON.stringify(process.env.FIREBASE_API_KEY),
  'process.env.FIREBASE_AUTH_DOMAIN': JSON.stringify(process.env.FIREBASE_AUTH_DOMAIN),
  'process.env.FIREBASE_DATABASE_URL': JSON.stringify(process.env.FIREBASE_DATABASE_URL),
  'process.env.FIREBASE_PROJECT_ID': JSON.stringify(process.env.FIREBASE_PROJECT_ID),
  'process.env.FIREBASE_MESSAGING_SENDER_ID': JSON.stringify(process.env.FIREBASE_MESSAGING_SENDER_ID),
})

module.exports = {
  entry,
  output,
  devServer,
  module: {
    rules: [
      babelLoader,
      styleLoader,
    ],
  },
  plugins: [
    envVariables,
  ],
}
