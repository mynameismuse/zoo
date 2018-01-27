<template>
  <div class="landing">
    <h1>进入后台数据配置台</h1>
    <el-button type="primary" v-on:click="navigate">进入界面</el-button>
  </div>
</template>
<script type="text/babel">
  export default {
    data: function () {
      return {
      }
    },
    methods: {
      navigate () {
        this.$router.push({name: 'source'})
      }
    }
  }
</script>
<style lang="less" scoped>
  .landing {
    padding: 50px 0;
    margin: auto;
    text-align: center;
  }
</style>
