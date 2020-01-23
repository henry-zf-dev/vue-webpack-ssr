<template>
  <div id="app">
    <div id="cover"></div>
    <Headers></Headers>
    <todo></todo>
    <Footer></Footer>
  </div>
</template>

<script>
  import Headers from './todo/headers.vue'
  import Todo from './todo/todo.vue'
  import Footer from './todo/footer.jsx'

  // 注释
  export default {
    components: {
      Headers,
      Todo,
      Footer,
    },
    data() {
      return {
        text: 'abc'
      }
    }
  }
</script>

<style lang="stylus" scoped>
  #app{
    position absolute
    left 0
    right 0
    top 0
    bottom 0
  }
  #cover{
    position absolute
    left 0
    top 0
    right 0
    bottom 0
    background-color #999
    opacity .5
    z-index -1
  }
</style>
