// 用户相关请求模块
import request from '@/utils/request'
export const login1 = data => {
  return request({
    method: 'POST',
    url: 'mp/v1_0/authorizations',
    data
  })
}
// 获取用户信息
export const getUserProfile = () => {
  const user = JSON.parse(window.localStorage.getItem('user'))
  // console.log(user)
  return request({
    method: 'GET',
    url: '/mp/v1_0/user/profile',
    headers: {
      Authorization: `Bearer ${user.token}`
    }
  })
}
// 修改用户信息
