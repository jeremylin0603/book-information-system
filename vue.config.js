const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  publicPath: process.env.NODE_ENV === 'production' ? '/book-information-system/' : '/',
  transpileDependencies: true,

  pluginOptions: {
    'style-resources-loader': {
      preProcessor: 'sass',
      patterns: ['./src/styles/common.sass']
    }
  }
})
