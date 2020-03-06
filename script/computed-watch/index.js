/* eslint-disable */

/********************* computed-watch *********************/

// TODO 讲解 computed 的实现机制，并演示基本用法 和与 methods 的区别

import Vue from 'vue';

new Vue({
  el: '#root',
  template: `
    <div>
      <p>模板字符串-FullName: {{firstName + ' ' + lastName}}</p>
      <p>computed-FullName: {{fullName}}</p>
      <p>methods-FullName: {{getFullName()}}</p>
      <p>Age: {{age}}</p>
      <p>
        FirstName: <input type="text" v-model="firstName">
      </p>
      <p>
        LastName: <input type="text" v-model="lastName">
      </p>
      <p>
        FullName: <input type="text" v-model="fullName">
      </p>
      <p>
        Age: <input type="number" v-model="birth">
      </p>
    </div>
  `,
  data: {
    firstName: 'Henry',
    lastName: 'He',
    birth: 1993
  },
  computed: {
    fullName () {
      console.log('##### fullName computed #####');
      return `${this.firstName} ${this.lastName}`;
    },
    age () {
      console.log('##### age computed #####');
      return new Date().getFullYear() - this.birth;
    }
  },
  methods: {
    getFullName () {
      console.log('##### getFullName invoked #####');
      return `${this.firstName} ${this.lastName}`;
    }
  }
});

// TODO 演示通过显式的定义 get/set 方法定义 computed

new Vue({
  computed: {
    fullName: {
      // 表示：获取 fullName 的值时做哪些计算
      get () {
        return `${this.firstName} ${this.lastName}`;
      },
      // 表示：给 fullName 赋值时做哪些计算，
      // 不建议用使用 set，因为将多个值计算组装成一个值很简单，
      // 但是把一个值拆解成多个值是很麻烦的，而且很容易出问题，造成死循环的问题
      set (fullName) {
        const names = fullName.split(' ');
        this.firstName = names[0];
        this.lastName = names[1];
      }
    }
  }
});

// TODO 演示 watch 的基础用法

new Vue({
  template: `
    <div>
      <p v-if="notYoung">Is no longer young!</p>
    </div>
  `,
  data: {
    notYoung: false
  },
  watch: {
    age (newVal, oldVal) {
      // 只有当 data 中的 age 变化之后才会执行以下逻辑
      console.log('##### age changed #####');
      this.notYoung = newVal >= 30;
    }
  },
});

// TODO 演示 watch immediate 用法

new Vue({
  data: {
    birth: 1980
  },
  watch: {
    age: {
      handler (newVal, oldVal) {
        console.log('##### age changed #####');
        this.notYoung = newVal >= 30;
      },
      // 立即执行
      immediate: true
    },
  },
});

// TODO 演示 watch deep 用法：
// TODO 分别演示 other 和 other.hobby 在 changeOther 事件触发时的效果

new Vue({
  template: `
    <div>
      <p>
        Hobby: <input type="text" v-model="other.hobby">
      </p>
      <button @click="changeOther">change other</button>
    </div>
  `,
  data: {
    other: {
      hobby: 'JavaScript'
    },
  },
  watch: {
    other: {
      handler () {
        console.log('##### other changed #####');
      },
      // 深入观察，会逐层遍历 other 所有的属性，并为属性增加一个监听，
      // 只有 other 任何层级的任何属性变化，都会执行 handler，性能开销较大
      deep: true
    },
    'other.hobby' () {
      // 通过这种写法，也可以监听到 other.hobby 的变化，开销要更小
      console.log('##### other.hobby changed #####');
    },
    methods: {
      changeOther() {
        this.other = {hobby: 'Java'};
        this.other.hobby = 'Java';
      }
    }
  },
});


