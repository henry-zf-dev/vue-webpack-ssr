import Vue from 'vue';

// const globalData = {
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
    // 理由和不是通过 new Vue() 创建的组件，data 必须以 function 形式返回一样，
    // 即当两个相同类型的子组件的一个对象 props 引用了父组件的同一个值，那么就会相互影响
    obj () {
      return {
        default: {}
      };
    },
    propOne: Number
  },
  // data: globalData,
  data () {
    // 不是通过 new Vue() 创建的组件，data 必须以 function 形式返回，
    // 否则一个父组件有多个相同类型子组件时，所有的子组件都会引用同一份数据源
    return {
      text: 0
    };
  },
  // mounted () {
  //   // Vue 不推荐在子组件中直接更改 props 的值，如果需要更改，可以通过 $emit 触发事件，在父组件中更改
  //   this.propOne = 1;
  // },
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
