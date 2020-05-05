// 文章相关请求模块
import request from '@/utils/request'
// 获取文章列表
// 封转函数
export const getArticles = params => {
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
// 删除文章
export const deleteArticle = articleId => {
  return request({
    method: 'DELETE',
    url: `/mp/v1_0/articles/${articleId}`
  })
}
// 新建文章
export const addArticle = (data, draft = false) => {
  return request({
    method: 'POST',
    url: '/mp/v1_0/articles',
    params: {
      // 是否存为草稿（true 为草稿）
      draft
    },
    data
  })
}
// 编辑文章
export const updateArticle = (articleId, data, draft = false) => {
  return request({
    method: 'PUT',
    url: `/mp/v1_0/articles/${articleId}`,
    params: {
      // 是否存为草稿（true 为草稿）
      draft
    },
    data
  })
}
// 获取文章
export const getArticle = articleId => {
  return request({
    method: 'GET',
    url: `/mp/v1_0/articles/${articleId}`
  })
}
