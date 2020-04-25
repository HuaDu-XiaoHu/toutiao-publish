<!--创建layout并配置路由-->
<template>
  <el-container class="layout-container">
    <el-aside class="aside"
              width="auto">
      <app-aside class="aside-menu"
                 :is-collapse="isCollapse" />
    </el-aside>
    <el-container>
      <el-header class="header">
        <div> <i :class="{'el-icon-s-fold':isCollapse,
        'el-icon-s-unfold':!isCollapse
        }"
             @click="isCollapse=!isCollapse"></i>
          <span>XXX有限公司</span>
        </div>
        <el-dropdown :hide-on-click="false">
          <div class="avatar-warp"><img class="avatar"
                 :src="user.photo">
            <span>{{user.name}}</span>
            <i class="el-icon-arrow-down el-icon--right"></i></div>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>个人设置</el-dropdown-item>
            <el-dropdown-item @click.native="onLogout">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>

      </el-header>
      <el-main class="main">
        <router-view />
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import AppAside from './components/aside'
import { getUserProfile } from '@/api/user'
export default {
  name: 'LayoutIndex',
  components: { AppAside },
  data () {
    return {
      user: {},
      isCollapse: true
    }
  },
  created () {
    this.loadUserProfile()
  },
  methods: {
    loadUserProfile () {
      getUserProfile().then(res => {
        // console.log(res)
        this.user = res.data.data
      })
    },
    onLogout () {
      this.$confirm('确认退出吗？', '退出提示', {
        confimButtonTexr: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        // 退出index页面,跳转到login页面
        window.localStorage.removeItem('user')
        this.$router.push('/login')
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消退出'
        })
      })
    }
  }
}
</script>

<style lang="less" scoped>
.layout-container {
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
}
.aside {
  background-color: #d3dce6;
  .aside-menu {
    height: 100%;
  }
}
.header {
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid #cccccc;
  align-items: center;
}
.main {
  background-color: #e9eef3;
}
.avatar-warp {
  display: flex;
  align-items: center;
  .avatar {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    margin-right: 10px;
  }
}
</style>
