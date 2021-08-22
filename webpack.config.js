const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const autoprefixer = require('autoprefixer');

const env = process.env.NODE_ENV || 'development';
// set to 'production' or 'development' in your env

// EC
const ImageminPlugin = require('imagemin-webpack');

const finalCSSLoader = (env === 'production') ? MiniCssExtractPlugin.loader : { loader: 'style-loader' };

module.exports = {
  mode: env,
  output: { publicPath: '/' },
  entry: ['./src'], // this is where our app lives
  devtool: 'source-map', // this enables debugging with source in chrome devtools
  devServer: {
    hot: true,
    historyApiFallback: true,
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [ // here's the part you want
          { loader: 'babel-loader' },
          // { loader: 'eslint-loader' },
        ],
      },
      {
        test: /\.s?css/,
        use: [
          finalCSSLoader,
          {
            loader: 'css-loader',
            options: {
              sourceMap: true,
            },
          },
          {
            loader: 'postcss-loader',
            options: {
              plugins: () => [autoprefixer()],
              sourceMap: true,
            },
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true,
            },
          },
        ],
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              useRelativePath: true,
              name: '[name].[ext]',
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin(),
    new HtmlWebpackPlugin({
      template: './src/index.html',
      filename: './index.html',
    }),
    new HtmlWebpackPlugin({
      template: './src/index.html',
      filename: './200.html',
    }),
    // Make sure that the plugin is after any plugins that add images, example `CopyWebpackPlugin`
    new ImageminPlugin({
      bail: false, // Ignore errors on corrupted images
      cache: true,
      imageminOptions: { // From: https://www.npmjs.com/package/imagemin-webpack
        // Before using imagemin plugins make sure you have added them in `package.json` (`devDependencies`) and installed them
        // Lossless optimization with custom option
        // Feel free to experiment with options for better result for you
        plugins: [
          ['gifsicle', { interlaced: true }],
          ['jpegtran', { progressive: true }],
          ['optipng', { optimizationLevel: 5 }],
          [
            'svgo',
            {
              plugins: [
                {
                  removeViewBox: false,
                },
              ],
            },
          ],
        ],
      },
    }),
  ],
};
