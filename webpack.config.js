var webpack = require('webpack');

module.exports = {
  entry: './src/app.jsx',
  // entry: [
    // 'webpack-dev-server/client?http://localhost:3000',
    // 'webpack/hot/dev-server',
    // './src/app.jsx'
  // ],
  output: {
    path: __dirname + '/dist',
    filename: 'bundle.js',
    publicPath: '/dist/'
  },
  plugins: [
    // new webpack.HotModuleReplacementPlugin()
  ],
  module: {
    loaders: [
        { test: /\.woff(\?v=\d+\.\d+\.\d+)?$/,   loader: "url?limit=10000&minetype=application/font-woff" },
        { test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,    loader: "url?limit=10000&minetype=application/octet-stream" },
        { test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,    loader: "file" },
        { test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,    loader: "url?limit=10000&minetype=image/svg+xml" },
        { test: /\.png$/, loader: "file-loader" },
        { test: /\.jpe?g$/, loader: "file-loader" },
        { test: /\.css$/, loader: 'style-loader!css-loader' },
        { test: /\.less$/, loaders: [
            "style-loader",
            "css-loader",
            require.resolve("./css-fix-loader.js"),
            "less-loader"
        ]},
        // { test: /\.less$/, loader: "style!raw!less"},
        // { test: /\.jsx?$/, loaders: ['react-hot', 'jsx-loader?harmony'] }
        { test: /\.jsx?$/, loader: 'jsx-loader?harmony' }
    ]
  }
};