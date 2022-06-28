import request from '@/utils/request'
// 查新申请列表
export const getinstance = (page, size) => request.put(`/user/process/instance/${page}/${size}`)
