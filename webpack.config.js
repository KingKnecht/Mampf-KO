const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  entry: {
    main: path.resolve(__dirname, './src/index.ts'),
  },
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: '[name].bundle.js',
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'My Stack',
      template: path.resolve(__dirname, './src/template.html'), // template file
      filename: 'index.html', // output file,
    })
  ],
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader', 'postcss-loader'],
      },
      {
        test: /\.jsx?|.tsx?$/,
        exclude: /node_modules/,
        use: ['babel-loader', 'astroturf/loader'],
      },
      {
        test: /\.html$/i,
        loader: 'html-loader',
        options: {
          minimize: {
            removeComments: false
          },
          esModule: false
        }
      },
    ]
  },
  resolve: {
    extensions: ['.ts', '.js'],
  },
  cache : false,
  devServer: {
    client: {
      logging: 'info',
    }
  },
  devtool : "source-map"
}