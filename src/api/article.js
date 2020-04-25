// 文章相关请求模块
import request from '@/utils/request'
// 获取文章列表
// 封转函数
export const getArticle = params => {
  return request({
    method: 'GET',
    url: '/mp/v1_0/articles',
    params
  })
}
