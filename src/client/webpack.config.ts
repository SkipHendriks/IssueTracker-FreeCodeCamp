import HtmlWebpackPlugin from 'html-webpack-plugin';
import htmlWebpackTemplate from 'html-webpack-template';
import webpack from 'webpack';

const htmlOptions: htmlWebpackTemplate.Options = {
  title: 'Issue Tracker | freeCodeCamp',
  template: htmlWebpackTemplate,
  headHtmlSnippet: '<style>body {margin: 0;}</style >',
  inject: false,
  appMountId: 'app',
};

const config: webpack.Configuration = {
  mode: 'development',
  watch: true,
  entry: './index.tsx',
  output: {
    filename: 'bundle.js',
    path: `${__dirname}/../../dist/public`,
    publicPath: '/',
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.json'],
  },
  devtool: 'source-map',
  module: {
    rules: [
      { test: /\.scss$/, use: ['style-loader', 'css-loader', 'sass-loader'] },
      { test: /\.tsx?$/, loader: 'babel-loader' },
      { test: /\.tsx?$/, loader: 'ts-loader' },
      { enforce: 'pre', test: /\.js$/, loader: 'source-map-loader' },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin(htmlOptions),
  ],
};

export default config;
