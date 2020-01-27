import Vue from 'vue';

new Vue({
  el: '#root',
  template: `
    <div>
      <p>FullName: {{firstName + ' ' + lastName}}</p>
      <p>FullName: {{fullName}}</p>
      <p>FullName: {{getFullName()}}</p>
      <p>Age: {{age}}</p>
      <p>
        FirstName: <input type="text" v-model="firstName">
        LastName: <input type="text" v-model="lastName">
        Age: <input type="number" v-model="birth">
        Hobby: <input type="text" v-model="other.hobby">
      </p>
      <p v-if="youngFlag">Is no longer young!</p>
    </div>
  `,
  data: {
    firstName: 'Henry',
    lastName: 'He',
    birth: 1993,
    hobbies: ['js'],
    youngFlag: false,
    other: {
      hobby: ''
    }
  },
  // 注意：不要在 computed 或 watch 中尝试修改当前所依赖的属性，
  // 避免无限循环
  computed: {
    // 只有 data 中定义的 firstName ||lastName 有变化才会重新计算
    fullName () {
      console.log('##### fullName computed #####');
      return `${this.firstName} ${this.lastName}`;
    },
    age () {
      console.log('##### age computed #####');
      return new Date().getFullYear() - this.birth;
    }
  },
  watch: {
    // age (newVal, oldVal) {
    //   // 只有当 data 中的 age 变化之后才会执行以下逻辑
    //   console.log('##### age changed #####');
    //   this.youngFlag = newVal >= 30;
    // }
    age: {
      handler (newVal, oldVal) {
        console.log('##### age changed #####');
        this.youngFlag = newVal >= 30;
      },
      // 立即执行
      immediate: true
    },
    other: {
      handler () {
        console.log('##### other changed #####');
      }
      // 深入观察，会逐层遍历 other 所有的属性，并为属性增加一个监听，
      // 只有 other 任何层级的任何属性变化，都会执行 handler，性能开销较大
      // deep: true
    },
    'other.hobby' () {
      // 通过这种写法，也可以监听到 other.hobby 的变化，开销要更小
      console.log('##### other.hobby changed #####');
    }
  },
  methods: {
    // 只要 data 中的任何属性有变化，都会重新渲染，并调用该方法
    getFullName () {
      console.log('##### getFullName invoked #####');
      return `${this.firstName} ${this.lastName}`;
    }
  }
});
