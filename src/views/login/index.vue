<template>
  <div class="login-container">
    <div class="login-header">
      <div class="logo"></div>
    </div>
    <div class="login-form-warp">
    <el-form class="login-from" ref="form" :model="user" >
      <el-form-item>
        <el-input v-model="user.mobile" placeholder="请输入手机号"></el-input>
      </el-form-item>
      <el-form-item>
        <el-input v-model="user.code" placeholder="请输入验证码"></el-input>
      </el-form-item>
      <el-form-item>
        <el-checkbox v-model="checked">我已阅读并同意用户协议和隐私条款</el-checkbox>
      </el-form-item>
      <el-form-item>
        <el-button class="login-btn" type="primary" :loading="loginLoading"
         @click="onLogin">登录</el-button>
      </el-form-item>
    </el-form>
    </div>
  </div>
</template>

<script>
import request from '@/utils/request'
export default {
  name: 'LoginIndex',
  // components: {},
  // props: {},
  data () {
    return {
      user: {
        mobile: '',
        code: ''
      },
      checked: false,
      loginLoading: false
    }
  },
  // computed: {},
  // watch: {},
  // created: {},
  // mounted () {},
  methods: {
    onLogin () {
      // 获取表单数据
      // console.log(1)
      const user = this.user
      // 表单验证
      // 验证通过，提交登录
      // 开启登录中loading...
      this.loginLoading = true
      request({
        methods: 'POST',
        url: 'mp/v1_0/authorizations',
        data: user
      }).then(res => {
        // console.log(res)
        this.$message({
          message: '登录成功',
          type: 'success'
        })
        // 关闭loading...
        // this.loginLoading = false
      }).catch(() => {
        // 失败
        console.log('失败')
        this.$message.error('登录失败')
      })
      // 关闭loading...
      this.loginLoading = false
      // console.log('onLogin')
    }
  }
}
</script>

<style lang="less" scoped>
.login-container {
position: fixed;
left: 0;
top: 0;
right: 0;
bottom: 0;
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
background: url("./login_bg.jpg") no-repeat;
background-size: convert;
.login-header{
  height: 57px;
  background: url("./logo_index.png") no-repeat;
  width: 300px;
  }
.login-from{
  padding: 30px 50px 10px;
  min-width: 300px;
  background-color: #ffffff;
.login-btn{
  width: 100%;

}}}
</style>
