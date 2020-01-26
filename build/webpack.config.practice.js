const path = require('path');
const HTMLPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
// 用于合理地合并 webpack config
const merge = require('webpack-merge');
const baseConfig = require('./webpack.config.base');

const defaultPlugins = [
  new webpack.DefinePlugin({
    'process.env': {
      // 注： 必须要用 "" 号引起来，因为 webpack 不然最终打包生成的代码是：
      // process.env.NODE_ENV = development 报错
      NODE_ENV: '"development"'
    }
  }),
  // 指定以这个文件为模板生成最终的 html 文件
  new HTMLPlugin({
    template: path.join(__dirname, 'template.html')
  })
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
config = merge(baseConfig, {
  entry: path.join(__dirname, '../practice/index.js'),
  devtool: '#cheap-module-eval-source-map',
  devServer,
  resolve: {
    alias: {
      // 指定 Vue 打包使用的版本，
      // runtime 情况下：不能能在 Vue 对象中写template
      'vue': path.join(__dirname, '../node_modules/vue/dist/vue.esm.js')
    }
  },
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

module.exports = config;
