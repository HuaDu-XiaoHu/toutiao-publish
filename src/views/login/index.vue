<template>
  <div class="login-container">
    <div class="login-header">
      <div class="logo"></div>
    </div>
    <!-- 配置form表单验证：
1.给el-from组件绑定model为表单数据对象
2.给需要验证的表单项el-form-item绑定prop属性
pron属性需要制定表单对象中的数据名称
3.通过el-from组件的rules属性配置验证规则
4.ref的作用主要用来获取表单组件手动触发验证
手动触发表单验证：
 -->
    <div class="login-form-warp">
      <el-form class="login-from"
               :rules="formRules"
               ref="login-form"
               :model="user">
        <el-form-item prop="mobile">
          <el-input v-model="user.mobile"
                    placeholder="请输入手机号"></el-input>
        </el-form-item>
        <el-form-item prop="code">
          <el-input v-model="user.code"
                    placeholder="请输入验证码"></el-input>
        </el-form-item>
        <el-form-item prop="agree">
          <el-checkbox v-model="user.agree">我已阅读并同意用户协议和隐私条款</el-checkbox>
        </el-form-item>
        <el-form-item>
          <el-button class="login-btn"
                     type="primary"
                     :loading="loginLoading"
                     @click="onLogin()">登录</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { login1 } from '@/api/user.js'
// import axios from 'axios'
export default {
  name: 'LoginIndex',
  // components: {},
  // props: {},
  data () {
    return {
      user: {
        mobile: '13911111111',
        code: '246810',
        agree: false // 是否同意协议
      },

      // checked: false,
      loginLoading: false,
      // 表单验证规则配置
      formRules: {
        mobile: [
          { required: true, message: '请输入手机号', trigger: 'change' },
          { pattern: /^1[3|5|7|8|9]\d{9}$/, message: '请输入正确的号码格式', trigger: 'change' }
        ],
        code: [
          { required: true, message: '请选择活动区域', trigger: 'change' },
          { pattern: /^\d{6}$/, message: '请输入正确格式的验证码', trigger: 'change' }
        ],
        agree: [
          {
            validator: (rule, value, callback) => {
              if (value) {
                callback()
              } else {
                callback(new Error('请同意用户协议'))
              }
            },
            trigger: 'blur'
          }
        ]
      }
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
      // const user = this.user
      // 表单验证
      // console.log(this.$refs['login-form'])
      this.$refs['login-form'].validate(valid => {
        // console.log(valid)
        if (!valid) {
          return
        }
        // 验证通过，提交登录
        // alert('登录成功')
        this.login()
      })
    },
    login () {
      // 开启登录中loading...
      // console.log(0)
      this.loginLoading = true
      console.log(this.user, login1)
      login1(this.user).then(res => {
        // console.log(res)
        // console.log(err)
        this.$message({
          message: '登录成功',
          type: 'success'
        })
        // 关闭loading...
        this.loginLoading = false
        // 跳转到首页
        this.$router.push({
          name: 'home'
        })
      }).catch(() => {
        // 失败
        // console.log(err)
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
  .login-header {
    height: 57px;
    background: url("./logo_index.png") no-repeat;
    width: 300px;
  }
  .login-from {
    padding: 30px 50px 10px;
    min-width: 300px;
    background-color: #ffffff;
    .login-btn {
      width: 100%;
    }
  }
}
</style>
