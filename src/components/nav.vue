<template>
  <el-menu
    :default-active="activeIndex"
    background-color="#373d41"
    text-color="#fff"
    mode="horizontal"
    active-text-color="#ffd04b"
    @select="handleSelect">
    <el-menu-item index="6">监控任务</el-menu-item>
    <el-menu-item index="5">监控列表</el-menu-item>
    <el-menu-item index="4">监控视图</el-menu-item>
    <el-menu-item index="3">视图</el-menu-item>
    <el-menu-item index="2">SQL</el-menu-item>
    <el-menu-item index="1">数据源</el-menu-item>
  </el-menu>
</template>
<script type="text/babel">
  export default {
    data () {
      return {
        activeIndex: '1',
        address: ['source', 'sql', 'view', 'monitorView', 'monitorList', 'monitorJob']
      }
    },
    methods: {
      handleSelect (key, keyPath) {
        this.$router.push({name: this.address[key - 1]})
      }
    }
  }
</script>
<style lang="less" scoped>
  .el-menu {
    padding: 0 30px;
    box-shadow: 0 2px 4px rgba(0,0,0,.5);
    border-bottom: none;

    .el-menu-item {
      float: right;
    }
  }
</style>
