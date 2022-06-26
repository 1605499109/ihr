import request from '@/utils/request'
export const putuser = (id, obj) => request.put(`sys/user/${id}`, obj)
// 保存员工个人信息
export const putpersonallnfo = (id, obj) => request.put(` /employees/${id}/personalInfo`, obj)
