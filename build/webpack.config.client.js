const path = require('path');
const HTMLPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
// 用于合理地合并 webpack config
const merge = require('webpack-merge');
// 将非 js 文件单独打包成静态资源文件
const ExtractPlugin = require('extract-text-webpack-plugin');
const baseConfig = require('./webpack.config.base');

const isDev = process.env.NODE_ENV === 'development';

const defaultPlugins = [
  new webpack.DefinePlugin({
    'process.env': {
      // 注： 必须要用 "" 号引起来，因为 webpack 不然最终打包生成的代码是：
      // process.env.NODE_ENV = development 报错
      NODE_ENV: isDev ? '"development"' : '"production"'
    }
  }),
  new HTMLPlugin()
];

const devServer = {
  port: 8000,
  host: '0.0.0.0', // 可使用 IP 地址访问
  overlay: {
    errors: true // 在 webpack 进行编译的过程中，所有的错误都显示到网页上显示
  },
  // open: true, // webpack-dev-server 启动时，自动打开浏览器
  hot: true // 当一个组件的代码更改，在渲染时，只会更新这个组件的数据，而不是整个页面刷新
};

let config;

if (isDev) {
  config = merge(baseConfig, {
    devtool: '#cheap-module-eval-source-map',
    devServer,
    module: {
      rules: [
        {
          test: /\.styl$/,
          use: [
            'vue-style-loader', // 此处需要用 vue-style-loader 才能实现 css 热重载
            {
              loader: 'css-loader'
              // 在 css-loader 中也可以定义 cssModules
              // module: true,
              // localIdentName: isDev ? '[path]-[name]-[hash:base64:5]' : '[hash:base64:5]',
            },
            {
              loader: 'postcss-loader',
              options: {
                // 使用 stylus-loader 会给 css 文件自动生成 sourceMap，
                // 而 postcss-loader 也会生成 sourceMap，
                // 设置了 sourceMap: true 后 postcss-loader 会直接使用 stylus-loader 已经生成好的 sourceMap，
                // 从而提高编译效率
                sourceMap: true
              }
            },
            'stylus-loader'
          ]
        }
      ]
    },
    plugins: defaultPlugins.concat([
      // 配合 hot，实现热更新
      new webpack.HotModuleReplacementPlugin(),
      // 减少不需要的信息展示
      new webpack.NoEmitOnErrorsPlugin()
    ])
  });
} else {
  config = merge(baseConfig, {
    entry: {
      app: path.join(__dirname, '../client/index.js'),
      // 将 vue/vue-router/vuex 框架代码等其他内库文件单独打包到 vendor 文件夹中
      vendor: ['vue']
    },
    output: {
      filename: '[name].[chunkhash:8].js'
    },
    module: {
      rules: [
        {
          test: /\.styl$/,
          use: ExtractPlugin.extract({
            fallback: 'vue-style-loader',
            use: [
              'css-loader',
              {
                loader: 'postcss-loader',
                options: {
                  sourceMap: true
                }
              },
              'stylus-loader'
            ]
          })
        }
      ]
    },
    plugins: defaultPlugins.concat([
      // 指定单独生成的 css 文件的名称
      // [contentHash:8] 根据文件内容生成 hash
      new ExtractPlugin('styles.[contentHash:8].css'),
      // 将 Vue 框架代码等其他内库文件单独打包到 vendor 文件夹中
      new webpack.optimize.CommonsChunkPlugin({
        name: 'vendor'
      }),
      // 将 webpack 打包配置相关的文件单独打包，
      // 因为 webpack 会给需要打包的每一个模块添加一个 id，
      // 当有新的模块添加时，有可能它的顺序在已有模块的中间，
      // 这样会造成原有模块的 id 发生变化，从而背离利用浏览器尽可能长时间缓存内库代码的目的
      // 注：vendor 需要放在 runtime 之前，否则也会失去作用
      new webpack.optimize.CommonsChunkPlugin({
        name: 'runtime'
      })
    ])
  });
}

module.exports = config;
