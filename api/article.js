/**
 * article apis
 */

import request from '@/utils/request'

// get public articles
export const getArticles = params => {
  return request({
    method: 'GET',
    url: '/api/articles',
    params
  })
}

// get public articles
export const getYourFeedArticles = params => {
  return request({
    method: 'GET',
    url: '/api/articles/feed',
    params,
    // 请求头: "Authorization" 文档要求; Value数据格式 `Token value`
    headers: {
      Authorization: `Token "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6MTA3MzI4LCJ1c2VybmFtZSI6Ikxlc2xpZTE5ODkiLCJleHAiOjE2MDEzOTA4ODZ9.StA1aR80m1HpktpAAnfORh9ejBjyZeWOD6kfeP3YMS0"`
    }
  })
}
