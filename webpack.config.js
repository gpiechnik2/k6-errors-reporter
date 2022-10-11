const path = require('path');

module.exports = {
  mode: 'production',
  entry: './src/reporter.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
    libraryTarget: "commonjs"
  },
  resolve: {
    symlinks: false
  },
  target: 'node'
}
