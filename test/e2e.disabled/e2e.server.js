
const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const path = require('path');

// Путь к webpack.config.js
const configPath = path.resolve(__dirname, '../../webpack.config.js');
const config = require(configPath);

const server = new WebpackDevServer(
  {
    ...config.devServer,
    port: 9000,
    host: 'localhost',
  },
  webpack(config)
);

server.start().then(() => {
  if (process.send) {
    process.send('ok');
  }
})