<!--创建layout并配置路由-->
<template>
  <div class="layout-container">
    <div>顶部导航栏</div>
    <div>侧边导航栏</div>
    <!-- 子路由器 -->
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'LayoutIndex',
  data () {
    return {}
  }
}
</script>

<style lang="less" scoped>
</style>
