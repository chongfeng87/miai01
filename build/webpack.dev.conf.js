'use strict'
const utils = require('./utils')
const webpack = require('webpack')
const config = require('../config')
const merge = require('webpack-merge')
const path = require('path')
const baseWebpackConfig = require('./webpack.base.conf')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')
const portfinder = require('portfinder')

const HOST = process.env.HOST
const PORT = process.env.PORT && Number(process.env.PORT)

const devWebpackConfig = merge(baseWebpackConfig, {
  module: {
    rules: utils.styleLoaders({ sourceMap: config.dev.cssSourceMap, usePostCSS: true })
  },
  // cheap-module-eval-source-map is faster for development
  devtool: config.dev.devtool,

  // these devServer options should be customized in /config/index.js
  devServer: {
    clientLogLevel: 'warning',
    historyApiFallback: {
      rewrites: [
        { from: /.*/, to: path.posix.join(config.dev.assetsPublicPath, 'index.html') },
      ],
    },
    hot: true,
    contentBase: false, // since we use CopyWebpackPlugin.
    compress: true,
    host: HOST || config.dev.host,
    port: PORT || config.dev.port,
    open: config.dev.autoOpenBrowser,
    overlay: config.dev.errorOverlay
      ? { warnings: false, errors: true }
      : false,
    publicPath: config.dev.assetsPublicPath,
    proxy: config.dev.proxyTable,
    quiet: true, // necessary for FriendlyErrorsPlugin
    watchOptions: {
      poll: config.dev.poll,
    }
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': require('../config/dev.env')
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(), // HMR shows correct file names in console on update.
    new webpack.NoEmitOnErrorsPlugin(),
    // https://github.com/ampedandwired/html-webpack-plugin
    new HtmlWebpackPlugin({
    filename: 'index.html',
    template: 'index.html',
    inject: true,
    chunks:['app']
    }), 
    new HtmlWebpackPlugin({
    filename: 'caigou.html',
    template: './src/pages/caigou/caigou.html',
    inject: true,
    chunks:['caigou']
    }),
    new HtmlWebpackPlugin({
    filename: 'cangchu.html',
    template: './src/pages/cangchu/cangchu.html',
    inject: true,
    chunks:['cangchu']
    }),
    new HtmlWebpackPlugin({
    filename: 'jinzhongzi.html',
    template: './src/pages/jinzhongzi/jinzhongzi.html',
    inject: true,
    chunks:['jinzhongzi']
    }),
    new HtmlWebpackPlugin({
    filename: 'kefu.html',
    template: './src/pages/kefu/kefu.html',
    inject: true,
    chunks:['kefu']
    }),
    new HtmlWebpackPlugin({
    filename: 'peixun.html',
    template: './src/pages/peixun/peixun.html',
    inject: true,
    chunks:['peixun']
    }),
    new HtmlWebpackPlugin({
    filename: 'quanguo.html',
    template: './src/pages/quanguo/quanguo.html',
    inject: true,
    chunks:['quanguo']
    }),
    new HtmlWebpackPlugin({
    filename: 'renzi.html',
    template: './src/pages/renzi/renzi.html',
    inject: true,
    chunks:['renzi']
    }),
    new HtmlWebpackPlugin({
    filename: 'zhiying.html',
    template: './src/pages/zhiying/zhiying.html',
    inject: true,
    chunks:['zhiying']
    }),
    // copy custom static assets
    new CopyWebpackPlugin([
      {
        from: path.resolve(__dirname, '../static'),
        to: config.dev.assetsSubDirectory,
        ignore: ['.*']
      }
    ])
  ]
})

module.exports = new Promise((resolve, reject) => {
  portfinder.basePort = process.env.PORT || config.dev.port
  portfinder.getPort((err, port) => {
    if (err) {
      reject(err)
    } else {
      // publish the new Port, necessary for e2e tests
      process.env.PORT = port
      // add port to devServer config
      devWebpackConfig.devServer.port = port

      // Add FriendlyErrorsPlugin
      devWebpackConfig.plugins.push(new FriendlyErrorsPlugin({
        compilationSuccessInfo: {
          messages: [`Your application is running here: http://${devWebpackConfig.devServer.host}:${port}`],
        },
        onErrors: config.dev.notifyOnErrors
        ? utils.createNotifierCallback()
        : undefined
      }))

      resolve(devWebpackConfig)
    }
  })
})
