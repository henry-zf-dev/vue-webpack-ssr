<template>
  <div id="app">
    <div id="cover"></div>
    <Headers></Headers>
    <todo></todo>
    <Footer></Footer>
  </div>
</template>

<script>
  import Headers from './views/layout/headers.vue';
  import Todo from './views/todo/todo.vue';
  import Footer from './views/layout/footer.jsx';

  // console.log(Headers.__docs);

  // 注释
  export default {
    components: {
      Headers,
      Todo,
      Footer
    },
    data () {
      return {
        text: 'abc'
      };
    }
  };
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
