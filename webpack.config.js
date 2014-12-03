module.exports = {
  entry: './src/app.jsx',
  output: {
    path: 'dist',
    filename: 'bundle.js',
    publicPath: '/dist/'
  },
  module: {
    loaders: [
        { test: /\.css$/, loader: 'style-loader!css-loader' },
        { test: /\.jsx?$/, loader: 'jsx-loader?harmony' }
    ]
  }
};