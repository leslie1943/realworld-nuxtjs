/**
 * profile apis
 */

// import request from '@/utils/request'
import { request } from '@/plugins/request'

// add favorite
export const followingUser = username => {
  return request({
    method: 'POST',
    url: `/api/profiles/${username}/follow`,
  })
}

// delete favorite
export const unfollowingUser = username => {
  return request({
    method: 'DELETE',
    url: `/api/profiles/${username}/follow`,
  })
}

// get user profile
export const getProfile = username => {
  return request({
    method: 'GET',
    url: `/api/profiles/${username}`
  })
}