const path = require('path');
const createVueLoaderOptions = require('./vue-loader.config');
const isDev = process.env.NODE_ENV === 'development';

const config = {
  target: 'web',
  entry: path.join(__dirname, '../client/index.js'),
  output: {
    filename: 'bundle.[hash:8].js',
    path: path.join(__dirname, '../dist')
  },
  module: {
    rules: [
      {
        test: /\.(vue|js|jsx)$/,
        loader: 'eslint-loader',
        exclude: /node_modules/,
        enforce: 'pre' // eslint 只作为预处理的 loader
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: createVueLoaderOptions(isDev)
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
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
          'css-loader'
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
            loader: 'url-loader', // 将图片转化成 base64 代码，直接写到 js 内容中，而不用生成新的文件，适用于小文件
            options: {
              limit: 1024,
              // 使用 resources/[path] 可以将最终打包的静态文件按照开发时的目录结构进行归类
              name: 'resources/[path][name].[hash:8].[ext]'
            }
          }
        ]
      }
    ]
  }
};

module.exports = config;
