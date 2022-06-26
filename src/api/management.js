import request from '@/utils/request'
export const getManagement = (page) => request.get('/sys/user', { params: {
  page: page,
  size: 10
}})
// 删除员工
export const deleteuser = (id) => request.delete(`/sys/user/${id}`)
export const adduser = (obj) => request.post(`/sys/user`, obj)
// 获取用户详情
export const userinfo = (id) => request.get(`sys/user/${id}`)
// 获取角色列表
export const rolelist = () => request.get('/sys/role')
// 分配角色
export const putrole = (obj) => request.put('/sys/user/assignRoles', obj)
