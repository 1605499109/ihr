import request from '@/utils/request'
// 查新申请列表
export const getinstance = (page, size) => request.put(`/user/process/instance/${page}/${size}`)
// 查询审批单的详情数据
export const getasks = (id) => request.get(`/user/process/instance/${id}`)
// 查询审批单审批明细
export const getasksinfo = (id) => request.get(`/user/process/instance/tasks/${id}`)
