import request from '@/utils/request'
// 获取校色的基本信息
export const getuserlist = (obj) => request.get('/sys/role', { params: obj })
// 添加角色
export const addusers = (obj) => request.post('/sys/role', obj)
// 删除角色
export const deleteusers = (id) => request.delete(`/sys/role/${id}`)
// 根据id获取角色详情
export const getuserdetail = (id) => request.get(`/sys/role/${id}`)
// 编辑角色
export const putusers = (id, obj) => request.put(`/sys/role/${id}`, obj)
// 获取权限详情
export const getpermission = () => request.get(`/sys/permission`)
// 根据id获取权限详情
export const getpermissiondetail = (id) => request.get(`/sys/role/${id}`)
// 添加权限
export const putpermission = (id, arr) => request.put(`sys/role/assignPrem`, { id: id, permIds: arr })
// 获取公司信息
export const getcompany = () => request.get(`/company/1`)
