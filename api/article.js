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