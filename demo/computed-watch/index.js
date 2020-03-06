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
      <p>
        Hobby: <input type="text" v-model="other.hobby">
      </p>
      <p v-if="notYoung">Is no longer young!</p>
      <p>test.a: {{test.a}}</p>
      <p>test.b: {{test.b}}</p>
      <ul>
        <li v-for="(item, idx) in test.c" :key="idx">index: {{idx}}, value: {{item}}</li>
      </ul>
      <p>test.d.e: {{test.d.e}}</p>
      <p>test.d.f: {{test.d.f}}</p>
      <ul>
        <li v-for="(item, idx) in test.d.g" :key="idx">index: {{idx}}, value: {{item}}</li>
      </ul>
      <button @click="handleClick">测试</button>
    </div>
  `,
  data: {
    firstName: 'Henry',
    lastName: 'He',
    birth: 1989,
    hobbies: ['js'],
    notYoung: false,
    other: {
      hobby: ''
    },
    test: {}
  },
  // 注意：不要在 computed 或 watch 中尝试直接或间接地修改当前所依赖的属性，避免死循环
  computed: {
    // 定义在 computed 中的方法，可以像访问变量的属性一样去调用，因为 Vue 会对 fullName 声明 get 和 set 方法
    // 并且会对计算的结果做缓存，只有 data 中定义的 firstName || lastName 有变化才会重新计算
    // fullName () {
    //   console.log('##### fullName computed #####');
    //   console.log('##### this #####', this);
    //   return `${this.firstName} ${this.lastName}`;
    // },
    // 也可以通过这种方式定义 computed，把 get 和 set 方法显式地定义出来
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
    //   this.notYoung = newVal >= 30;
    // }
    age: {
      handler (newVal, oldVal) {
        console.log('##### age changed #####');
        this.notYoung = newVal >= 30;
      },
      // 立即执行
      immediate: true
    },
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
    }
  },
  created () {
    this.setInitData();
    console.log('##### test #####', this.test);
  },
  methods: {
    // 只要 data 中的任何属性有变化，都会重新渲染，并调用该方法
    getFullName () {
      console.log('##### getFullName invoked #####');
      return `${this.firstName} ${this.lastName}`;
    },
    setInitData () {
      this.$set(this, 'test', {
        a: '',
        b: 0,
        c: [],
        d: {
          e: '',
          f: 0,
          g: []
        }
      });
    },
    handleClick () {
      this.test.a = 'a';
      this.test.b += 1;
      this.test.c.push('c');
      this.test.d.e = 'e';
      this.test.d.f += 2;
      this.test.d.g.push('g');
    }
  }
});
