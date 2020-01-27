import Vue from 'vue';

new Vue({
  el: '#root',
  template: `
    <div>
      <div>{{text}}</div>
      <div>类似于 dom 的 innerText 和 innerHtml</div>
      <div v-pre>将内容当做纯文本显示: {{text}}</div>
      <div v-once="text">
        <div>数据绑定的内容只执行一次，之后数据变化后也不会随之变化，</div>
        <div>用处：展示静态内容时，通过声明 v-once 减少性能开销，</div>
        <div>v-once 中的所有节点，Vue 都不会将其和虚拟 dom 进行检测对比，从而减少重新渲染的开销。</div>
      </div>
      <div v-text="text"></div>
      <div v-html="html"></div>
      <div>如果只是单纯想控制元素的显示和隐藏，那么最好使用 v-show，</div>
      <div>因为 v-if 会对 dom 节点进行增删操作，导致重绘和重新排版，有性能的影响。</div>
      <div v-show="active">根据 show 的值，给 div 增加 display 的样式</div>
      <div v-if="active">根据 show 的值，决定是否把 div 添加到 dom 流中</div>
      <div v-else>else content</div>
      <div>v-for 中的 key 是用来做数据缓存的，需要保证唯一，</div>
      <div>当数据源发生变化时，Vue 会根据每个 item 的 key 在缓存中寻找，是否已经存在 key，</div>
      <div>如果已经存在，则直接在缓存中复用 item 的 dom 节点，而不重新创建新的 dom 节点，提高渲染性能。</div>
      <div>注：不要用 idx 作为 key，因为数组元素的顺序和具体值没有什么直接关系，</div>
      <div>用 idx 作为 key，可能会导致产生错误的缓存。</div>
      <ul>
        <li v-for="(item, idx) in arr" :key="item">index: {{idx}}, value: {{item}}</li>
      </ul>
      <ul>
        <li v-for="(val, key, idx) in obj">key: {{key}}, value: {{val}}, index: {{idx}}</li>
      </ul>
      <div v-on:click="">
      <div>v-on 做的事情是：</div>
      <div>如果 v-on 加在普通的 dom 节点元素上，则会通过 document.addEventListener 给该节点增加事件监听</div>
      <div>如果 v-on 加在 Vue 组件上，实际上是在 Vue 对象实例上绑定一个事件</div>
      </div>
      <input type="text" v-model="text">
      <input type="text" v-model.number="number">
      <input type="text" v-model.trim="text">
      <input type="text" v-model.lazy="text">
      <input type="checkbox" v-model="active">
      <div>
        <input type="checkbox" :value="1" v-model="arr">
        <input type="checkbox" :value="2" v-model="arr">
        <input type="checkbox" :value="3" v-model="arr">
      </div>
      <div>
        <input type="radio" value="one" v-model="picked">
        <input type="radio" value="two" v-model="picked">
      </div>
    </div>
  `,
  data: {
    text: 'text',
    number: 0,
    html: '<span>html</span>',
    active: true,
    arr: [1, 2, 3],
    obj: {
      a: '1',
      b: '2',
      c: '3'
    },
    picked: 'one'
  }
});
