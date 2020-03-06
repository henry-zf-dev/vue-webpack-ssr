import Vue from 'vue';

const component = {
  template: `
    <div>
      <input type="text" v-model="text">
      <span v-show="active">show if active</span>
      <span @click="handleChange">{{propOne}}</span>
    </div>
  `,
  props: {
    active: Boolean,
    propOne: String
  },
  data () {
    return {
      text: 0
    };
  },
  mounted () {
    console.log('##### component mounted #####');
  },
  methods: {
    handleChange () {
      this.$emit('change');
    }
  }
};

// CompVue 是 Vue 的一个子类，通过 new Vue(options) 初始化而来 Vue 对象，是默认内置配置下生成的，没有 data、props 等相关配置
// 通过 new CompVue() 生成的 Vue 对象会默认带有 data、props、methods 配置
// const CompVue = Vue.extend(component);
//
// new CompVue({
//   el: '#root',
//   // 通过 props 无法将外部属性传入
//   // props: {
//   //   propOne: 'props 1'
//   // },
//   // 需要通过 propsData 传入
//   propsData: {
//     propOne: 'propsData 1'
//   },
//   // 可以传入 data 与 CompVue 默认的 data 合并覆盖
//   data () {
//     return {
//       text: 3
//     };
//   },
//   // 生命周期方法执行顺序：先执行 CompVue 默认配置中的生命周期方法，再执行 CompVue 实例中的生命周期方法
//   mounted () {
//     console.log('##### instance mounted #####');
//   }
// });

// 也可以通过这种方式实现对 component 的继承
const component2 = {
  extends: component,
  data () {
    return {
      text: 1
    };
  },
  mounted () {
    console.log('##### instance mounted #####');
  }
};

new Vue({
  el: '#root',
  components: {
    Comp: component2
  },
  template: `<comp prop-one="123"></comp>`
});

// 当我们开发好一个组件，可能比较公用，很多项目都会用到，而且功能描述比较泛，使用起来需要传入很多的配置项，
// 而在某个具体项目中，很多参数都使用它的默认值，不需要传入，或者需要在原有基础上扩展一些特定的属性，
// 这时候就可以通过 extend 的方式，在原有组件基础上，继承扩展出我们需要的组件，而不需要从头开始写一个新的组件
