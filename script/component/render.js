import Vue from 'vue';

const component = {
  props: ['prop1'],
  name: 'comp',
  // template: `
  //   <div :style="style">
  //     <slot></slot>
  //   </div>
  // `,
  render (createElement) {
    return createElement(
      'div',
      {
        style: this.style
      },
      [
        this.$slots.default, // 如果 slot 没有指定名称，则使用 default，否则就使用名称访问
        this.prop1
      ]
    );
  },
  data () {
    return {
      style: {
        width: '200px',
        height: '200px',
        border: '1px solid #aaa'
      },
      value: 'component value'
    };
  }
};

new Vue({
  components: {
    CompOne: component
  },
  el: '#root',
  data () {
    return {
      value: '123'
    };
  },
  mounted () {
    console.log(this.$refs.comp.value, this.$refs.span);
  },
  methods: {
    handleClick () {
      console.log('clicked');
    }
  },
  // template: `
  //   <comp-one ref="comp">
  //     <span ref="span">{{value}}</span>
  //   </comp-one>
  // `,
  // template 字符串最终会被 Vue 转化成 render function，
  // render 方法最终生成的不是真正的 dom 节点，而是虚拟节点：VNode 这个类的实例，
  // 存储在内存中，结构类似于 dom 节点，在渲染过程中，VNode 会和 dom 节点进行对比，
  // 如果判断需要更新，则将新的内容更新到真正的 dom 节点上，
  // 相比直接操作 dom ，虚拟 dom 效率更高
  render (createElement) {
    // render 被调用时，都会传进 createElement 方法
    // Vue 创建节点函数，每个 Vue 实例都会有这个函数
    return createElement(
      // 第一个参数：节点名，可以是 Vue 组件名，也可以是 dom 节点名
      'comp-one',
      // 第二个参数：要给节点传入的属性，attr、props、ref、event 等
      {
        ref: 'comp',
        props: {
          prop1: this.value
        }
      },
      // 第三个参数：节点的内容，可以直接是文本，也可以是子节点（子节点需要用数组传递）
      [
        createElement('span', {
          ref: 'span'
        }, this.value)
      ]);
  }
});
