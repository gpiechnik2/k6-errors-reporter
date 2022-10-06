const path = require('path');

module.exports = {
  entry: './src/reporter.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
  resolve: {
    fallback: {
      "fs": false,
      "os": false
    }
  }
};
