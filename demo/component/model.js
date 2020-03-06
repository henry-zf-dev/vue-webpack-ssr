import Vue from 'vue';

// 通过 v-model 实现父子组件的双向绑定
const component = {
  template: `
    <div>
      <input type="text" :value="value1" @input="handleInput">
    </div>
  `,
  model: {
    prop: 'value1', // 指定双向绑定 prop 的 key
    event: 'change' // 指定回调时间的方法名
  },
  props: ['value', 'value1'],
  methods: {
    handleInput (event) {
      // this.$emit('input', event.target.value);
      this.$emit('change', event.target.value);
    }
  }
};

new Vue({
  el: '#root',
  components: {
    Comp: component
  },
  // template: `<comp :value="value" @input="value = arguments[0]"></comp>`,
  template: `<comp v-model="value"></comp>`,
  data () {
    return {
      value: '123'
    };
  }
});
