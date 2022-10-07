const path = require('path');
const NodePolyfillPlugin = require("node-polyfill-webpack-plugin");

module.exports = {
  mode: 'production',
  entry: './src/reporter.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
    libraryTarget: "commonjs"
  },
  plugins: [
    new NodePolyfillPlugin()
  ],
  target: 'node'
};
