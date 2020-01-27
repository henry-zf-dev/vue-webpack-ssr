import Vue from 'vue';

// const data = {
//   text: 0
// };

const component = {
  template: `
    <div>
      <input type="text" v-model="text">
      <span v-show="active">show if active</span>
      <span @click="handleChange">{{propOne}}</span>
    </div>
  `,
  // 使用数组也可以定义 pros，但相对不严谨
  // props: ['active', 'propOne'],
  props: {
    // 不要在子组件中更改 props 的值
    active: {
      type: Boolean,
      required: true,
      default: true
      // 自定义校验
      // validator (value) {
      //   return typeof value === 'boolean';
      // }
    },
    // 如果是对象，则必须以 function 形式返回一个对象，
    // 理由和不是通过 new Vue() 创建的组件，data 必须是 function 形式返回一样
    obj () {
      return {
        default: {}
      };
    },
    propOne: Number
  },
  data () {
    // 不是通过 new Vue() 创建的组件，data 必须是 function 形式返回，
    // 否则一个父组件有多个相同类型子组件时，所有的子组件都会引用同一份数据源
    return {
      text: 0
    };
  },
  methods: {
    handleChange () {
      this.$emit('change');
    }
  }
};
// 全局注册组件
// Vue.component('Comp', component);

new Vue({
  el: '#root',
  components: {
    Comp: component
  },
  mounted () {
    console.log('##### ref.compA #####', this.$refs.compA);
    console.log('##### ref.compB #####', this.$refs.compB);
  },
  template: `
    <div>
      <comp ref="compA" :active="true" :prop-one="propA" @change="handleChange"></comp>
      <comp ref="compB" :active="false" :prop-one="propB" @change="handleChange"></comp>
    </div>
  `,
  data: {
    propA: 1,
    propB: 2
  },
  methods: {
    handleChange () {
      this.propA += 1;
    }
  }
});
