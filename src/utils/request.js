// 给予axios封装的请求模块
// 导入axios
import axios from 'axios'
// import Axios from 'axios'

// axios ()
// axios.get()
// axios.post()

// 创建一个axios实例，说白就是复制一个axios
// 我们通过这个实例去发送请求，把需要的配置配置给这个实例来处理
// 请求的基础路径
const request = axios.create({
  baseURL: 'http://ttapi.research.itcast.cn/'
})
// 请求拦截器
request.interceptors.request.use(
  function (config) {
    const user = JSON.parse(window.localStorage.getItem('user'))
    // 如果邮登录用户信息，则统一设置token
    if (user) {
      config.headers.Authorization = `Bearer ${user.token}`
      // 然后我们就可以在允许请求除去之后定制统一业务功能处理
      // 当这里return config之后请求会在真正发出去
    }
    return config
  },
  // 请求失败，会经过这里
  function (error) {
    return Promise.reject(error)
  }
)
// 响应拦截器
// 导出请求方法
export default request
