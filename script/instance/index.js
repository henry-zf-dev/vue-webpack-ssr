/* eslint-disable */

// TODO
//  今天和大家分享一下我在做过几个 Vue 项目后，重新学习或者说巩固 Vue 相关的知识点的过程中，
//  总结到的一些我觉得有用的，或者觉得以后会用到的技术，我准备的这些内容，在 Vue 官方文档中都可以找到，
//  不过官网上的描述可能会更抽象一点，分享过程中，我会敲一些简单的 demo 来帮助自己和大家一起理解这些概念，
//  其实我们几个基本都有用 Vue 做业务开发的经验，很多技术点大家也都用过，我自己也是，但是就我个人而言，
//  其实很多东西，都是知其然不知其所以然，我想通过这次分享，让大家对 Vue 原理方面的东西有稍微的认识和感觉，
//  虽然有些东西我们现在很少用到，但以后我们的前端业务慢慢变多变复杂，也许我们得自己维护我们自己的组件库，
//  甚至开源给其他的人用，这时需要用到一些高级的 Vue 组件开发技巧，我想现在开始慢慢打好基础，
//  更全面系统地了解和学习这个框架的方方面面，对我们现有项目做代码优化和以后更多的项目实施都是很好的
//  说道代码优化，在学习的过程中，我意识到之前自己对 Vue 的使用就有很多用的不当或者根本就用错的情况，
//  在分享过程中，我会一个个指出，好让大家不要犯同样的错误：computed 对比 method、v-if 对比 v-show、v-for 的 key 问题等

// TODO
//  对于 Vue 我准备做一个系列的分享，从 Vue核心API用法、高级组件开发、Vue-router、Vuex、SSR服务端渲染，
//  现在只做到 Vue核心API用法 这个阶段，之后的东西希望大家能监督我坚持学习和更新，
//  我希望我学到的东西，大家都能学到或者得到巩固，我理解的不对的地方，也希望大家指出

// TODO
//  今天要分享的是 Vue核心API的用法，分为：
//  instance(实例)、lifecycle(生命周期)、data-binding(数据绑定)、
//  computed-watch(计算属性和监听)、directive(原生指令)、component(组件开发)
//  六大部分，由于时间原因，这次只做前五个部分，component(组件开发)放在下一次的分享中
//  接下来，我们就从 instance(Vue 实例)开始讲

// TODO
//  demo 只是一个很简单的 Vue 项目，没有用到 Vue-cli 脚手架，webpack 只是完成到项目能正常打包运行的程度，
//  关于 webpack 的东西，我也只看了一些基础，不过还是觉得挺有意思的，有时间也可以给大家分享一下

/********************* instance *********************/

import Vue from 'vue';

// TODO 演示最简单的初始化，简要描述 render function，并演示根节点 #root 的替换机制
const root = document.createElement('div');
root.id = 'root'; // 设置属性
document.body.appendChild(root);
const app = new Vue({
  el: root,
  template: '<div>This is content</div>'
});

// TODO 演示多个根节点报警告

// TODO 演示手动挂载
app.$mount('#root');

// TODO 演示 webpack HTMLPlugin 插件
new HTMLPlugin({
  template: path.join(__dirname, 'index.html')
});
const app = new Vue({
  el: '#root',
  template: '<div>This is content</div>'
});

// TODO 演示 options
const app = new Vue({
  el: '#root',
  template: '<div>This is content {{dataA}}</div>',
  props: {
    propA: String
  },
  data: {
    dataA: 0
  },
  computed: {
    computedA () {
      return this.dataA++;
    }
  },
  watch: {
    dataA (newText, oldText) {
      console.log('##### dataA #####', this.dataA);
    }
  },
  created() {
    console.log('##### Vue created #####');
  },
  methods: {
    methodA () {
      console.log('##### methodA invoked #####');
    }
  },
});

// TODO 依次演示 app、$el、$root、$options、$data、$refs、$isServer、$watch、$on、$emit、$once
console.log('##### app #####', app);
console.log('##### $el #####', app.$el);
console.log('##### $root #####', app.$root);

// TODO 演示 直接更改 data、app.$options[attr]、app[attr] 的区别
console.log('##### $options #####', app.$options);
const app = new Vue({
  el: '#root',
  template: '<div ref="div-ref">text: {{text}}</div>',
  data: {
    text: 0
  }
});
setInterval(() => {
  app.text += 1;
  app.$options.data.text += 1; // 无效
  app.$data.text += 1; // 有效
}, 1000);

// TODO 演示 app.[attr] 和 app.$data[attr] 访问的是同一份地址
console.log('##### $data #####', app.$data);

// TODO 演示 data 中非字面量定义的属性，无法做到响应式
const app = new Vue({
  el: '#root',
  template: '<div ref="div-ref">text: {{text}}, obj.a: {{obj.a}}</div>',
  data: {
    text: 0,
    obj: {}
  }
});
let i = 0;
setInterval(() => {
  i++;
  app.obj.a = i;
}, 1000);

// TODO 演示 $set 和 $delete 动态增加、删除响应式属性
let i = 0;
setInterval(() => {
  i++;
  app.$set(app.obj, 'a', i);
  app.$delete(app.obj, 'a');
}, 1000);

// TODO 演示 $forceUpdate 强制重新渲染
let i = 0;
setInterval(() => {
  i++;
  app.obj.a = i;
  app.$forceUpdate();
}, 1000);

// TODO 演示 $watch 的不同写法
const unWatch = app.$watch('text', (newVal, oldVal) => {
  console.log('newVal: ', newVal);
  console.log('oldVal: ', oldVal);
});
setInterval(() => {
  unWatch();
}, 1000);

const app = new Vue({
  el: '#root',
  template: '<div ref="div-ref">text: {{text}}</div>',
  data: {
    text: 0
  },
  watch: {
    text (newVal, oldVal) {
      console.log('newVal: ', newVal);
      console.log('oldVal: ', oldVal);
    }
  }
});

setInterval(() => {
  app.text += 1;
}, 1000);

// TODO 演示 $refs 用于快速定位到模板的某个 html 节点，或某个组件实例，会再之后的章节中具体演示

// TODO 演示 $emit/$on 和 dom 事件冒泡的区别
