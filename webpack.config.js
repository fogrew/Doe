const path = require('path')

module.exports = [{
  mode: 'production',
  optimization: {
    nodeEnv: 'production',
    concatenateModules: true,
    minimize: true
  },
  entry: {
    'PicoJS.min': './src/Doe.ts'
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist')
  },
  devtool: 'cheap-source-map',
  resolve: {
    extensions: ['.ts', '.tsx']
  },
  externals: {
    '$': '$'
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: 'ts-loader',
        options: {
          transpileOnly: true
        }
      },
      {
        enforce: 'pre',
        test: /\.js$/,
        loader: 'source-map-loader'
      }
    ]
  }
}]
