/* craco.config.js */
const { whenProd } = require('@craco/craco')
const path = require('path')

const resolve = pathname => path.resolve(__dirname, pathname)

module.exports = {
  webpack: {
    alias: {
      '@': resolve('src')
    },
    plugins: {
      add: [],
      remove: []
    },
    configure: (webpackConfig) => {
      webpackConfig.output = {
        ...webpackConfig.output,
        publicPath: whenProd(() => '/projects/webox/')
      }
      return webpackConfig
    },
    devServer: {
      proxy: {
        '/api-webox': {
          target: 'https://dengcaocao.github.io/resources/db',
          changeOrigin: true,
          pathRewrite: { '^/api': '' }
        }
      }
    }
  }
}
