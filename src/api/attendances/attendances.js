import request from '@/utils/request'
// 查询考勤数据列表

export const getreports = (page, pagesize) => request.get('/attendances', { params: { page: page, pagesize: pagesize }})
