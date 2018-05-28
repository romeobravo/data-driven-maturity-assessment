/* global __dirname, require, module*/

// const webpack = require('webpack')
// const UglifyJsPlugin = webpack.optimize.UglifyJsPlugin
// const CompressionPlugin = require('compression-webpack-plugin')
// const nodeExternals = require("webpack-node-externals");
const path = require('path')
// const env = require('yargs').argv.env // use --env with webpack 2

let libraryName = 'shop-ui'

// yarn install --dev webpack-bundle-analyzer
// const BundleAnalyzerPlugin = require("webpack-bundle-analyzer")
//   .BundleAnalyzerPlugin;
// let plugins = [new BundleAnalyzerPlugin()];
let plugins = []
let outputFile

// NOTE currently stopped using uglify in prod build as frontend breaks on it
//
// if (env === "build") {
//   plugins.push(new UglifyJsPlugin({ minimize: true }));
//   outputFile = libraryName + ".min.js";
// } else {
outputFile = libraryName + '.js'
// }

const config = {
  entry: __dirname + '/src/index.js',
  devtool: 'source-map',
  output: {
    path: __dirname + '/lib',
    filename: outputFile,
    library: libraryName,
    libraryTarget: 'umd',
    umdNamedDefine: false
  },
  module: {
    rules: [
      {
        test: /(\.jsx|\.js)$/,
        loader: 'babel-loader',
        exclude: /node_modules\/(?!shop-ui).*/
      },
      // {
      //   test: /(\.jsx|\.js)$/,
      //   loader: 'eslint-loader',
      //   exclude: /node_modules/
      // },
      {
        test: /\.(gif|png|jpe?g|svg)$/i,
        loaders: [
          'file-loader?hash=sha512&digest=hex&name=./assets/[name]-[hash].[ext]',
          'image-webpack-loader'
        ]
      }
    ]
  },
  resolve: {
    modules: [path.resolve('./src'), 'node_modules'],
    extensions: ['.json', '.js'],
    alias: {
      Components: path.resolve(__dirname, 'src/Components/'),
      Helpers: path.resolve(__dirname, 'src/Helpers/'),
      Package: path.resolve(__dirname, 'src'),
      Static: path.resolve(__dirname, 'static')
    }
  },
  plugins: plugins,
  externals: [
    'lodash',
    'react',
    'react-dom',
    'styled-components',
    'react-stickynode'
    // nodeExternals({
    //   whitelist: [
    //     "classnames",
    //     "grid-styled",
    //     "styled-system",
    //
    //     "react-stickynode",
    //     "react-addons-shallow-compare", // dep of react-stickynode
    //     "subscribe-ui-event", // dep of react-stickynode
    //       "eventemitter3"
    //       "raf"
    //   ]
    // })
  ]
}

module.exports = config
