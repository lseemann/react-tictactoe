module.exports = {
  entry: [
    './source/App.js'
  ],
  output: {
    path: __dirname + '/js/',
    publicPath: '/js/',
    filename: "bundle.js"
  },
  module: {
    loaders: [{
      test: /\.jsx?$/,
      loader: 'babel'
    }]
  }

};