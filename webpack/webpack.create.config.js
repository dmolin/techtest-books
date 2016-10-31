var path = require('path')
var webpack = require('webpack')
var HtmlWebpackPlugin = require('html-webpack-plugin')
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var autoprefixer = require('autoprefixer')

module.exports = function(options) {

  //
  // Setup environment specific settings
  //
  var envEntry = [path.join(__dirname, '../src/app/bootstrap.js')];
  var envPlugins = [];

  if (options.devServer) {
    envEntry = [
      'webpack-hot-middleware/client?reload=true',
    ].concat(envEntry);
    envPlugins = [new webpack.HotModuleReplacementPlugin()]
  }

  if (options.compress) {
    envPlugins = envPlugins.concat([
      new webpack.IgnorePlugin(/\.\/dev/, /\/config$/),
      new webpack.optimize.DedupePlugin(),
      new webpack.optimize.OccurenceOrderPlugin(),
      new webpack.optimize.UglifyJsPlugin({
        compress: {
          drop_console: true,
          warnings: false
        }
      })
    ])
  }

  return {
    devServerHost: options.host,
    devServerPort: options.port,
    devtool: options.devServer ? 'inline-source-map' : 'source-map',
    entry: envEntry,
    output: {
      //path: path.join(__dirname, options.outputDir),
      path: path.join(__dirname, '../'),
      publicPath: '/',
      filename: '[hash].bundle.js'
    },
    resolve: {
      root: path.join(__dirname, '../'),
      alias: {
        //lookupValues: 'src/js/store/lookupValues',
        utils: 'src/app/utils'
      },
      extensions: ['', '.js', '.jsx']
    },
    module: {
      loaders: [{
        test: /(\.js|\.jsx?)$/,
        exclude: /node_modules/,
        //loaders: options.devServer ? ['react-hot', 'babel'] : ['babel'],
        //loaders: ['babel']
        loader: 'babel',
        query: {
          presets: ['react-hmre']
        }
      },
        /*
        {
          test: /(\.js|\.jsx?)$/,
          exclude: /node_modules/,
          loader: 'eslint-loader'
        },*/
        // Loaders are executed right-to-left so sass must be last! TODO try using a preloader
        {
          test: /(\.css|\.scss)$/,
          exclude: /node_modules/,
          loader: ExtractTextPlugin.extract('style-loader', 'css!postcss!sass'),
        },
        {
          test: /(\.jpg|\.jpeg|\.png|\.gif)$/,
          exclude: /node_modules/,
          loader: 'url-loader',
        },
        {
          test: /(\.eot|\.ttf|\.woff|\.svg)/,
          loader: 'url-loader?limit=10240&name=fonts/[name].[ext]'
        },
        {
          test: /\.svg$/,
          loader: 'file',
          exclude: /node_modules/,
          include: path.join(__dirname, 'img')
        }
      ]
    },
    plugins: [
      new webpack.ProvidePlugin({
        fetch: 'imports?this=>global!exports?global.fetch!whatwg-fetch'
      }),
      new webpack.DefinePlugin({
        "process.env": {
          NODE_ENV: options.devServer ? JSON.stringify("development") : JSON.stringify("production")
        },
        __DEV__: JSON.stringify(JSON.parse(process.env.DEV || false)),
        __MOCK__: JSON.stringify(JSON.parse(process.env.MOCK || false))
      }),
      new HtmlWebpackPlugin({
        title: options.devServer ? 'DEV - React Example' : 'React Example',
        template: 'src/index.tpl.html',
        inject: true,
        filename: 'index.html'
        //favicon: 'public/img/favicons/favicon.ico'
      }),
      new webpack.NoErrorsPlugin(),
      new ExtractTextPlugin('[hash].css')
    ].concat(envPlugins),
    postcss: [
      autoprefixer({browsers: ['> 1%']})
    ]
  };
}
