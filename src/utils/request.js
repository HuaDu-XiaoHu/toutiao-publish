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
  baseURL: 'http://ttapi.research.itcast.cn'
})
// 请求拦截器
// 响应拦截器
// 导出请求方法
export default request
