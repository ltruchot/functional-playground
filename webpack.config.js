const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'app.js'
  },
  mode: 'development',
  devServer: {
    contentBase: './dist',
    hot: true,
    port: 4200
  },
  resolve: {
    extensions: ['.js']
  },
  module: {
    rules: []
  },
  plugins: [new HtmlWebpackPlugin()]
};
