import request from '@/utils/request'
// 获取权限
export const GetPermissionList = () => request.get('sys/permission')
// 添加权限
export const postpermission = (obj) => request.post('/sys/permission', obj)
export const putpermission = (id, obj) => request.put(`sys/permission/${id}`, obj)
export const deletepermission = (id) => request.delete(`/sys/permission/${id}`)
