var createConfig = require("./webpack.create.config")
var options = {
  devServer: false, // hot reloading, no compression
  host: '127.0.0.1', // so that accessible from VMs
  port: 8080,
  outputDir: ''
}

module.exports = createConfig(options)
