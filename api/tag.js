/**
 * tag apis
 */

// import request from '@/utils/request'
import { request } from '@/plugins/request'

// get public articles
export const getTags = () => {
  return request({
    method: 'GET',
    url: '/api/tags',
  })
}
