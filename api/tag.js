/**
 * tag apis
 */

import request from '@/utils/request'

// get public articles
export const getTags = () => {
  return request({
    method: 'GET',
    url: '/api/tags',
  })
}
