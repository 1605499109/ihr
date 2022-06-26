import request from '@/utils/request'

export const postuser = (data) => request.post('/sys/user/batch', data)

