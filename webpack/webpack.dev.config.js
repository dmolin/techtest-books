var createConfig = require("./webpack.create.config")
var options = {
  devServer: true, // hot reloading, no compression
  host: '0.0.0.0', // so that accessible from VMs
  port: 8080,
  outputDir: ''
}

module.exports = createConfig(options)
