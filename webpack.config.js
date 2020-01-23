const path = require('path');
const HTMLPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
// 将非 js 文件单独打包成静态资源文件
const ExtractPlugin = require('extract-text-webpack-plugin');

const isDev = process.env.NODE_ENV === 'development';

const config = {
  target: "web",
  entry: path.join(__dirname, 'src/index.js'),
  output: {
    filename: "bundle.[hash:8].js",
    path: path.join(__dirname, 'dist')
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      },
      {
        test: /\.jsx$/,
        loader: 'babel-loader'
      },
      {
        test: /\.css$/,
        // 浏览器加载 css 有两种方式：
        // 1：把 css 文件作为外部静态资源，2：将样式以 <style> 标签写到 html 内容中
        // 在 webpack 配置中要指定使用哪种方式
        // 注：在 Vue 中 打包的 css 样式和 js 文件一样都是异步加载的
        use: [
          'style-loader',
          'css-loader',
        ]
      },
      // 需要区分环境来做不同配置
      // {
      //   test: /\.styl$/,
      //   use: [
      //     'style-loader',
      //     'css-loader',
      //     {
      //       loader: "postcss-loader",
      //       options: {
      //         // 使用 stylus-loader 会给 css 文件自动生成 sourceMap，
      //         // 而 postcss-loader 也会生成 sourceMap，
      //         // 设置了 sourceMap: true 后 postcss-loader 会直接使用 stylus-loader 已经生成好的 sourceMap，
      //         // 从而提高编译效率
      //         sourceMap: true,
      //       }
      //     },
      //     'stylus-loader'
      //   ]
      // },
      {
        test: /\.(gif|jpg|jpeg|png|svg)/,
        use: [
          {
            loader: "url-loader", // 将图片转化成 base64 代码，直接写到 js 内容中，而不用生成新的文件，适用于小文件
            options: {
              limit: 1024,
              name: '[name].[hash:8].[ext]', // 文件名.后缀名
            }
          }
        ]
      }
    ]
  },
  plugins: [
    // Vue React 这些框架必须用到的 plugin
    // 用于 webpack 在编译过程中，以及自己写的页面 js 文件中，当前环境的判断
    // 再者比如 Vue，会根据当前环境区分打包，比如在 development 环境，会将报错信息打印到控制台，
    // 方便开发过程中定位问题，而在 production 环境，就不会打印报错，
    // 而且相比 development 环境要更小，运行效率更快
    new webpack.DefinePlugin({
      'process.env': {
        // 注： 必须要用 "" 号引起来，因为 webpack 不然最终打包生成的代码是：
        // process.env.NODE_ENV = development 报错
        NODE_ENV: isDev ? '"development"' : '"production"'
      }
    }),
    new HTMLPlugin()
  ]
};

if (isDev) {
  config.module.rules.push({
    test: /\.styl$/,
    use: [
      'style-loader', // 在 css-loader 处理好的内容外面包一层 js 代码，用于把 css 代码写到 <style> 标签中
      'css-loader',
      {
        loader: "postcss-loader",
        options: {
          // 使用 stylus-loader 会给 css 文件自动生成 sourceMap，
          // 而 postcss-loader 也会生成 sourceMap，
          // 设置了 sourceMap: true 后 postcss-loader 会直接使用 stylus-loader 已经生成好的 sourceMap，
          // 从而提高编译效率
          sourceMap: true,
        }
      },
      'stylus-loader'
    ]
  });
  // 使用 Vue 编写的组件代码，是无法直接运行在浏览器中的，
  // 所以需要 webpack 对其打包生成浏览器可以识别的代码，
  // 但是在调试过程中，我们直接看打包好的代码进行调试是不现实的，
  // 所以需要用到 webpack 提供的 devtool 工具，将打包好的代码和源代码进行映射
  // 以下为 webpack 官方推荐配置，该配置调试运行效率比较高，而且映射准确性也较好
  config.devtool = '#cheap-module-eval-source-map';
  config.devServer = {
    port: 8000,
    host: '0.0.0.0', // 可使用 IP 地址访问
    overlay: {
      errors: true, // 在 webpack 进行编译的过程中，所有的错误都显示到网页上显示
    },
    // open: true, // webpack-dev-server 启动时，自动打开浏览器
    hot: true, // 当一个组件的代码更改，在渲染时，只会更新这个组件的数据，而不是整个页面刷新
  };
  config.plugins.push(
    // 配合 hot，实现热更新
    new webpack.HotModuleReplacementPlugin(),
    // 减少不需要的信息展示
    new webpack.NoEmitOnErrorsPlugin()
  );
} else {
  config.entry = {
    app: path.join(__dirname, 'src/index.js'),
    // 将 vue/vue-router/vuex 框架代码等其他内库文件单独打包到 vendor 文件夹中
    vendor: ['vue']
  };
  // 注：需要用 chunkhash 将每个 js 模块作为独立的节点，这样打包文件的 hash 才会不一样，
  // 否则 app.[hash].js 和 vendor.[hash].js 的文件名将是一样的，
  // 这样我们每次改动业务代码后，打包出的 vendor 也会有是不同的文件名，
  // 从而背离利用浏览器尽可能长时间缓存内库代码的目的
  config.output.filename = '[name].[chunkhash:8].js';
  config.module.rules.push({
    test: /\.styl$/,
    use: ExtractPlugin.extract({
      fallback: 'style-loader',
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
  });
  config.plugins.push(
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
  )
}

module.exports = config;