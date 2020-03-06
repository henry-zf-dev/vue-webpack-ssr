import Vue from 'vue';

var globalVar = '111'; // eslint-disable-line

new Vue({
  el: '#root',
  template: `
    <div :id="id" :class="activeClass" @click="handleClick">
      <div :class="{active: isActive}">
        模板中只能做用一行语句就能有结果的表达式
        {{isActive ? "active" : "not active"}}
      </div>
      <div :class="[{active: isActive}, inactiveClass]">
        模板中可以访问 Vue 默认的全局变量白名单，但自己定义的全局变量不能访问（如 globalVar）
        {{Date.now()}}
      </div>
      <div :style="[activeStyle, inactiveStyle]">
        对 data 中定义的 HTML，Vue 会自动进行转移成纯的字符串，这样处理为的是防止注入攻击
        要以 v-html 方式使用
        <div v-html="html"></div>
        <div>{{getJoinedArr(arr)}}</div>
      </div>
    </div>
  `,
  data: {
    id: 'aaa',
    activeClass: 'active',
    inactiveClass: 'inactive',
    activeStyle: {
      color: 'red',
      // Vue 会给需要加前缀的样式属性名自动加上前缀
      // 该属性用于消除浏览默认样式
      appearance: 'none'
    },
    inactiveStyle: {
      // html 中所写样式的 '-' 分隔符格式转化成驼峰格式
      fontSize: '15px'
    },
    isActive: true,
    arr: [1, 2, 3],
    html: '<span>123</span>'
  },
  methods: {
    handleClick () {
      console.log('##### handleClick #####');
    },
    // 建议这种情况使用 computed，
    // 因为 computed 会先判断数据源是否有变化，再来渲染页面，效率会更高
    getJoinedArr (arr = []) {
      return arr.join('、');
    }
  }
});
