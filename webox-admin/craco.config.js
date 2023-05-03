/* craco.config.js */
const webpack = require('webpack')
module.exports = {
  // ...
  webpack: {
    alias: {},
    plugins: {
      add: [
        new webpack.DefinePlugin({
          'process.env': {
            NODE_ENV: JSON.stringify('development')
          }
        })
      ],
      remove: []
    },
    configure: {},
    configure: (webpackConfig, { env, paths }) => {
      return webpackConfig
    }
  }
}