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
// 获取文章频道
// 封转函数
export const getArticleChannels = params => {
  return request({
    method: 'GET',
    url: '/mp/v1_0/channels',
    params
  })
}
// 删除
export const deleteArticle = articleId => {
  return request({
    method: 'DELETE',
    url: `/mp/v1_0/articles/${articleId}`
  })
}
