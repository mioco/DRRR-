module.exports = {
  entry: './index.js',

  output: {
    filename: 'main.js',
    path: '../server/public/javascripts/',
    publicPath: '/public/javascripts/'
  },
  watch:true,
  module: {
    loaders: [
      { test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader?presets[]=es2015&presets[]=react' },
      { test: /\.json$/, loader: "json-loader" },
      { test: /\.css$/, loader: "style!css" },
      { test: /\.less$/, loader: "style!css!less" },
      { test: /\.(svg|jpg|png|otf)$/, loader: "url?limit=100000" }
    ]
  }
}
