const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    mode: process.env.NODE_ENV,
    entry: './client/index.js',
    output: {
      path: path.resolve(__dirname, 'build'),
      filename: 'bundle.js',
    },
    plugins: [
      new HtmlWebpackPlugin({
        title: 'development',
        template: path.join(__dirname, 'index.html'),
      }),
    ],
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-react', '@babel/preset-env'],
            },
          },
        },
        {
          test: /\.css$/i,
          use: ['style-loader', 'css-loader', 'postcss-loader' ],
        }
      ],
    },
    devServer: {
      port: 8080,
      static: {
        directory: path.join(__dirname, './build'),
      },
      proxy: [
        {
          context: ['/api'],
          target: 'http://localhost:3000',
        },
      ],
      historyApiFallback: true,
    },
  };