import request from '@/utils/request'
// 获取组织架构
export const getdepart = () => request.get('/company/department')
// 删除部门
export const deletepart = (id) => request.delete(`/company/department/${id}`)
// 添加部门

export const addpart = (obj) => request.post('/company/department', obj)
// 修改部门
export const editpart = (obj) => request.put(`/company/department/${obj.pid}`, obj)
