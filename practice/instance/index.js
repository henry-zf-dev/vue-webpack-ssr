import Vue from 'vue';

const app = new Vue({
  // el: '#root',
  template: '<div ref="div-ref">{{text}} {{obj.a}}</div>',
  data: {
    text: 0,
    obj: {}
  }
  // watch: {
  //   text (newText, oldText) {
  //     console.log(`${newText} : ${oldText}`);
  //   }
  // }
});

app.$mount('#root');

let i = 0;

setInterval(() => {
  app.text += 1;
  // app.$options.data.text += 1; // 无效
  // app.$data.text += 1; // 有效
  i++;
  // 对于在 data 中定义的全局对象，如果对属性进行声明，
  // 则在之后给对象增加属性并赋值，Vue 则将不会把这个对象做响应式处理，
  // 所以这个属性的值变化了，也不会响应式地重新渲染
  // app.obj.a = i;
  // 强制组件重新渲染又一次（尽量不要用这个方法）
  // app.$forceUpdate();
  // 给 app data 的某个对象补充声明一个属性，这个时候就是响应式的
  app.$set(app.obj, 'a', i);
  // 彻底删除某个属性
  // app.$delete(app.obj, 'a');
}, 1000);

console.log('##### $data #####', app.$data);
console.log('##### $props #####', app.$props);
console.log('##### $el #####', app.$el);
// 初始化 Vue 传入的参数，会与默认的 options 结合起来
console.log('##### $options #####', app.$options);
// 给 $options 重新定义 render 方法，只有当值有变化后才会执行重定义的 render 逻辑，
// 第一次的渲染还是默认的 render
// app.$options.render = (h) => {
//   return h('div', {}, 'new render function');
// };
console.log('##### $root #####', app.$root); // 是一个 Vue 的 instance
console.log('##### app.$root === app ? #####', app.$root === app);
// <item><div></div></item>
console.log('##### $children #####', app.$children);
console.log('##### $slots #####', app.$slots);
console.log('##### $scopedSlots #####', app.$scopedSlots);
// 用于快速定位到模板里的某个 HTML 节点或某个组件
// 如果是 HTML 节点，则会返回 HTML 节点对象
// 如果是组件，则返回一个组件实例，也就是 Vue 的实例
console.log('##### $refs #####', app.$refs);
// 用于服务端渲染的判断
console.log('##### $isServer #####', app.$isServer);

// 和定义在 options 里效果是一样的，但这样写需要手动去销毁这个方法（比如组件销毁时），
// 而定义在 options 中就不需要手动进行销毁，Vue 的机制会自动销毁
// 定义 $watch 会返回一个 unWatch 方法
const unWatch = app.$watch('text', (newText, oldText) => {
  console.log('##### newText #####', newText);
  console.log('##### oldText #####', oldText);
});
setTimeout(() => {
  unWatch();
}, 2000);

// 事件触发
// $emit 和 $on 都只能同时作用于一个 Vue 对象上，才能生效，
// 对象 app 监听了 test 事件，那么必须对象 app 自己触发时间 test，才会被监听到，
// 而且不会像 dom 事件一样向上冒泡
app.$on('test', (a, b) => {
  console.log('##### $on test emitted #####', a, b);
});

// $once 只会触发一次
app.$once('test', (a, b) => {
  console.log('##### $once test emitted #####', a, b);
});

setInterval(() => {
  app.$emit('test', 1, 2);
}, 1000);
