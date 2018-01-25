const path = require('path')
const webpack = require('webpack')
const NODE_ENV = process.env.NODE_ENV
console.log(NODE_ENV)
const getPublicPath = () => {
  if (NODE_ENV === 'production') {
    return path.resolve(__dirname, './dist')
  } else if (NODE_ENV === 'dist') {
    return path.resolve(__dirname, './example')
  }
  return '/'
}

module.exports = {
  entry: {
    index: NODE_ENV === 'production'
      ? './src/index.js'
      : './src/main.js'
  },
  output: {
    path: getPublicPath(),
    publicPath: getPublicPath(),
    filename: 'vue-drr.js',
    library: 'VueDrr',
    libraryTarget: 'umd'
  },
  devtool: false,
  module: { // loader
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          loaders: {
            'scss': 'vue-style-loader!css-loader!sass-loader',
            'sass': 'vue-style-loader!css-loader!sass-loader?indentedSyntax'
          }
        }
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: '[name].[ext]?[hash]'
        }
      }
    ]
  },
  resolve: {
    alias: {
      'vue$': 'vue/dist/vue.esm.js'
    }
  },
  devServer: {
    historyApiFallback: true,
    noInfo: true,
    port: 8081
  },
  performance: {
    hints: false
  }
}

if (NODE_ENV === 'production' || NODE_ENV === 'dist') {
  module.exports.plugins = (module.exports.plugins || []).concat([
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"'
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: false,
      compress: {
        warnings: false
      }
    })
  ])
}
