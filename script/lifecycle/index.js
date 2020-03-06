/* eslint-disable */

/********************* lifecycle *********************/

import Vue from 'vue';

// TODO 代码演示各生命周期的执行顺序，以及每个生命周期需要注意的地方

const app = new Vue({
  el: '#root',
  template: '<div>{{text}}</div>',
  data: {
    text: 0
  },
  beforeCreate () {
    console.log('##### beforeCreate #####', this.$el);
    // undefined
  },
  created () {
    // beforeCreate、created 在 new Vue 过程中一定会执行，
    // 并且 beforeCreate、created 生命周期中不能进行 dom 操作，
    // 因为还拿不到最终生成的 根节点，
    // 所以一般和操作 dom 相关的动作，都会放在 mounted 中，
    // 但和操作数据相关的动作可以放在 created 中，
    // 最好不要放在 beforeCreate 中，因为根据 Vue 的生命周期，
    // beforeCreate 还没进行数据的 reactive 相关的初始化操作
    console.log('##### created #####', this.$el);
    // undefined
  },
  beforeMount () {
    console.log('##### beforeMount #####', this.$el);
    // <div id="root"></div>
  },
  mounted () {
    // 把当前组件生成的 HTML 挂载到 dom 上，
    // 如果在 options 中不指定 el，则不会执行 beforeMount、mounted
    console.log('##### mounted #####', this.$el);
    // <div>0</div> 会把 <div id="root"></div> 替换掉，
    // mounted 之后，所有调用生命周期方法所拿到的根节点，都是 mounted 之后的节点
  },
  // beforeCreate、created、beforeMount、mounted 在组件生命周期中只会被调用一次
  // 而且 beforeMount、mounted 在服务端渲染中不会被调用，因为和 dom 操作有关系
  beforeUpdate () {
    console.log('##### beforeUpdate #####', this);
  },
  updated () {
    console.log('##### updated #####', this);
  },
  // 与组件的 keep-alive 相关
  activated () {
    console.log('##### activated #####', this);
  },
  deactivated () {
    console.log('##### deactivated #####', this);
  },
  // 会解除所有的事件监听以及所有的 watch，
  beforeDestroy () {
    console.log('##### beforeDestroy #####', this);
  },
  destroyed () {
    console.log('##### destroyed #####', this);
  },
  render (h) {
    // render 第一次将在 beforeMount 和 mounted 中间执行，
    // 之后都将在 beforeUpdate 和 updated 中间执行
    console.log('##### render function invoked #####');
  },
  // 只有在开发环境才会触发，并且只能用于当前组件，它的子组件的错误无法捕获到
  renderError (h, err) {
    return h('div', {}, err.stack);
  },
  // 不管是开发还是正式环境，只要捕获一个来自子孙组件的错误时被调用
  // 除非子组件阻止了事件冒泡
  errorCaptured (err, vm, info) {
    console.log('##### err #####', err);
  }
});

setInterval(() => {
  app.text = app.text += 1;
}, 1000);

setTimeout(() => {
  // 一般不会主动去使用
  app.$destroy();
}, 2000);

// TODO 演示 render 生命周期，renderError/errorCaptured 的用处

const app = new Vue({
  el: '#root',
  // 如果在 options 中传入了 template，
  // 则将会把 template 编译到 render 函数中去
  // 否则会将 el 外部的 HTML 作为 template 进行编译
  // template: '<div>{{text}}</div>',
  data: {
    text: 0
  },
  // TODO 重写 render 方法
  render (h) {
    return h('div', {}, this.text);
    // throw new TypeError('render error');
  },
  // 只有在开发环境才会触发，并且只能用于当前组件，它的子组件的错误无法捕获到
  renderError (h, err) {
    return h('div', {}, err.stack);
  },
  // TODO 在 component 中讲解
  // 不管是开发还是正式环境，只要捕获一个来自 "子孙组件" 的错误时被调用
  // 除非子组件阻止了事件冒泡
  errorCaptured (err, vm, info) {
    console.log('##### err #####', err);
  }
});

