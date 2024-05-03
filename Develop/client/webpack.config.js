const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const path = require('path');
const { InjectManifest } = require('workbox-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = () => {
  return {
    mode: 'development',
    entry: {
      main: './client/src/index.js',  // Assuming your main entry is in 'client/src'
      install: './client/src/install.js'  // Assuming you have an install script
    },
    output: {
      filename: '[name].bundle.js',
      path: path.resolve(__dirname, 'client/dist'),  // Output in 'client/dist'
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: './client/index.html'  // Assuming your HTML template is in 'client'
      }),
      new InjectManifest({
        swSrc: './client/src-sw.js',  // Service worker source in 'client'
        swDest: 'service-worker.js'
      }),
      new WebpackPwaManifest({
        name: 'Text Editor PWA',
        short_name: 'TextEditor',
        description: 'A PWA Text Editor that works offline and saves data locally.',
        background_color: '#ffffff',
        crossorigin: 'use-credentials', // can be null, use-credentials or anonymous
        icons: [
          {
            src: path.resolve('client/icons/icon.png'), // Assuming your icons are in 'client/icons'
            sizes: [96, 128, 192, 256, 384, 512] // Multiple sizes
          }
        ]
      }),
      new MiniCssExtractPlugin({
        filename: 'styles.css'  // Output CSS filename
      })
    ],
    module: {
      rules: [
        {
          test: /\.css$/,
          use: [MiniCssExtractPlugin.loader, 'css-loader']  // CSS loader to handle .css files
        },
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env']  // Preset used for modern JavaScript features
            }
          }
        }
      ],
    },
  };
};
