<template>
  <Header :class="$style.mainHeaders">
    <h1>Todo</h1>
  </Header>
</template>

<script>
  export default {
    name: 'headers'
    // $style.mainHeader 生效的原理是：
    // 给 Vue 对象增加了一个计算属性 $style，
    // 并且 $style 的每个属性名是根据 css 样式名转化为驼峰命名
    // computed: {
    //   $style() {
    //     return {
    //       mainHeaders: ''
    //     }
    //   }
    // },
  };
</script>

<!-- module 的用法-->
<style lang="stylus" module>
  .main-headers{
    text-align center
    h1{
      font-size 100px
      color: rgba(175, 47, 47, 0.4)
      font-weight 400
      margin 20px
    }
  }
</style>

<!-- 自定义的 模块 -->
<docs>#abc-def</docs>
