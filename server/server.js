const _ = require('lodash')
const moment = require('moment')
const fs = require('fs');
const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const webpack = require('webpack');

const isDevelopment = process.env.NODE_ENV !== 'production';

const webpackMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
var config = isDevelopment ? require('../webpack/webpack.dev.config') : require('../webpack/webpack.prod.config')

import apiIndex from './api'
import ns from './namespace'

import dbInit from './dbinit'

// Initialize DB
dbInit(ns)

const devServerPort = config.devServerPort;
const devServerHost = config.devServerHost;

const port = devServerPort;
const app = express();

var publicPath = path.resolve(__dirname, '../public')
app.use(express.static(publicPath))
app.use(bodyParser.json())

console.log((isDevelopment ? "Development" : "Production") + " mode is active.");
const compiler = webpack(config);
const middleware = webpackMiddleware(compiler, {
  publicPath: config.output.publicPath,
  //contentBase: 'src',
  historyApiFallback: true,
  noInfo: true,
  headers: {'Access-Control-Allow-Origin': '*'},
  stats: {
    colors: true,
    hash: false,
    timings: true,
    chunks: false,
    chunkModules: false,
    modules: false
  }
});

app.use(middleware);
app.use(webpackHotMiddleware(compiler));

// Dynamically initialize all API handlers (they are located under /api/ folder
_.each(_.values(apiIndex), (mod) => {
  mod(app, app.locals.appConfig)
})

// default handler
app.get('*', function response(req, res) {
  res.write(middleware.fileSystem.readFileSync(path.join(__dirname, '../index.html')));
  res.end();
});

console.log("==> Building Initial DB cache and indexes.. please wait...")

// Invoke a first DB query to kickstart the index and caching
const now = Date.now()
ns.collections.Books.find({category:'horror'}).skip(0).limit(100).toArray((err, res) => {
  console.log("==> Done! it took only " + moment().diff(now, 'seconds') + " seconds!")

  app.listen(port, devServerHost, function onStart(err) {
    if (err) {
      console.log(err);
    }
    console.info('==>   Server running in ' + app.get('env') + ' mode');
    console.info('==> 🌎 Listening on port %s. Open up http://0.0.0.0:%s/ in your browser.', port, port);
  });
})
