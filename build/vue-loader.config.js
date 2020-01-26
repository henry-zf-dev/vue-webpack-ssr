const docsLoader = require.resolve('./doc-loader');

module.exports = (isDev) => {
  return {
    // 屏蔽不小心的空格
    preserveWhiteSpace: true,
    // 将 Vue 的 css 样式文件单独打包，Vue 的 css 默认是根据模块异步加载的，问题是：这样要一次性加载完所有的 css
    extractCSS: !isDev,
    cssModules: {
      // 为每个 css 样式增加一个当前文件中唯一的样式名，这个样式只会在当前文件中生效
      // 方便在 dev 模式下快速找到样式文件，并且不会产生样式命名空间冲突的问题
      // 另一个好处是，在 prod 环境 [hash:base64:5] 的命名安全性较高
      localIdentName: isDev ? '[path]-[name]-[hash:base64:5]' : '[hash:base64:5]',
      camelCase: true // 会把 css 中 "-" 的命名方式转化成驼峰命名方式，便于 js 中使用
    },
    // 只控制组件 js 代码的热重载，而不控制 css 的热重载，css 热重载由 vue-style-loader 控制
    // hotReload: false, // 根据环境变量生成
    loaders: {
      // 自定义 loader，加载自定义的模块
      'docs': docsLoader
      // 给默认模块指定自定义的 loader，如：
      // js: 'coffee-loader' 等等
    }
    // 在loaders 之前先执行以下 loaders，比如 typescript 的 loader
    // preLoaders: {
    //   js: 'typescript-loader'
    // },
    // 在loaders 之后再执行以下 loaders
    // postLoader: {}
  };
};
