import Vue from 'vue';

const GrandsonComponent = {
  template: '<div>child component: {{data.value}}</div>',
  // inject: ['const', 'grandparent', 'value'],
  inject: ['grandparent', 'data'],
  mounted () {
    console.log('##### const #####', this.const);
    console.log('##### grandparent #####', this.grandparent);
    console.log('##### value #####', this.value);
  }
};

const ChildComponent = {
  components: {
    GrandsonComponent
  },
  // 指定插槽名，可以在父组件根据插槽名传入不同的插槽
  // template: `
  //   <div :style="style">
  //     <div class="header">
  //       <slot name="header"></slot>
  //     </div>
  //     <div class="body">
  //       <slot name="body"></slot>
  //     </div>
  //     <div class="footer">
  //       <slot name="footer"></slot>
  //     </div>
  //   </div>
  // `,
  // 带作用域的插槽，在子组件插槽中定义内部属性，父组件通过 slot-scope 就可以访问到子组件的属性
  template: `
    <div :style="style">
      <slot :slotValue1="slotProp" :slotValue2="slotData"></slot>
      <grandson-component></grandson-component>
    </div>
  `,
  props: {
    slotProp: String
  },
  data () {
    return {
      style: {
        width: '200px',
        height: '200px',
        border: '1px solid #aaa'
      },
      slotData: 'abc'
    };
  }
};

new Vue({
  el: '#root',
  components: {
    ChildComponent
  },
  // 通过 provide: {} 的方式定义 provide，
  // 在子孙组件中是拿不到父组件的 this 的，只能接收到传入的常量，
  // 因为这样初始化 provide 对象，其实 Vue 本身还没有初始化完成，所有访问不了 this
  // provide: {
  //   const: 'xyz',
  //   grandparent: this,
  //   value: this.value1
  // },
  // 通过方法返回定义 provide,
  // 才子孙组件中接收到父组件的 this，
  // 但是父组件中的响应式变量，不会在子孙组件中响应式地变化
  // provide () {
  //   return {
  //     const: 'xyz',
  //     grandparent: this,
  //     value: this.value1
  //   };
  // },
  // 只有在 provide 中重定义 get 方法，让子孙组件每次获取到的 value 都是其最新值，
  // 从而实现响应式，这也是 Vue 实现响应式的最基本原理
  provide () {
    const data = {};
    Object.defineProperty(data, 'value', {
      get: () => this.value1,
      enumerable: true
    });
    return {
      grandparent: this,
      data
    };
  },
  template: `
    <div>
      <child-component :slot-prop="value1">
        <!--<div slot="header">slot header</div>-->
        <!--<div slot="body">slot body</div>-->
        <!--<div slot="footer">slot footer</div>-->
        <!--指定通过 "props" 作为 key，将插槽中的属性包装成 object，这样父组件就可以通过 props[key] 来访问插槽中的属性</div>-->
        <div slot-scope="props">
          <div>slotValue1: {{props.slotValue1}}</div>
          <div>slotValue2: {{props.slotValue2}}</div>
          <div>selfValue: {{value2}}</div>
        </div>
      </child-component>
      <input type="text" v-model="value1" />
    </div>
  `,
  data () {
    return {
      value1: 'def',
      value2: 'ijk'
    };
  }
});
