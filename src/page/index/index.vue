<template>
  <div class="index">
    <homeNav></homeNav>
    <router-view></router-view>
  </div>
</template>
<script type="text/babel">
  import homeNav from './../../components/nav'

  export default {
    data: function () {
      return {}
    },
    components: {
      homeNav
    }
  }
</script>
<style lang="less" scoped>

</style>
