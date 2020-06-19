const path = require('path');

module.exports = {
  entry: './client/index.js',
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'bundle.js',
  },

  devServer: {
    // contentBase: path.join(__dirname, 'client'),
    // contentBasePublicPath: '/',
    publicPath: '/build/',
    proxy: {
      '*': 'http://localhost:4000',
    },
  },
  mode: process.env.NODE_ENV,
  module: {
    rules: [
      //   { test: /\.css$/, use: 'css-loader' },
      {
        test: /\.jsx?/,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader',
          options: { presets: ['@babel/preset-env', '@babel/preset-react'] },
        },
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          // Creates `style` nodes from JS strings
          'style-loader',
          // Translates CSS into CommonJS
          'css-loader',
          // Compiles Sass to CSS
          'sass-loader',
        ],
      },
      {
        test: /\.(graphql|gql)$/,
        exclude: /node_modules/,
        loader: 'graphql-tag/loader',
      },
    ],
  },
};
