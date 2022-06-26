import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/sys/login',
    method: 'post',
    data
  })
}
// 用户基本信息
export function getInfo() {
  return request({
    url: '/sys/profile',
    method: 'post'

  })
}
// 用户详细信息
export function getUserInfo(id) {
  return request({
    url: `/sys/user/${id}`,
    method: 'get',
    params: { id }})
}

export function logout() {
  return request({
    url: '/vue-admin-template/user/logout',
    method: 'post'
  })
}
