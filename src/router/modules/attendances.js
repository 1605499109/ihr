// 考勤
import Layout from '@/layout'
export default {
  path: '/attendances',
  // name: 'attendances',
  component: Layout,
  children: [
    {
      path: '',
      name: 'attendances',
      component: () => import('@/views/attendances'),
      meta: {
        title: '考勤管理',
        icon: 'skill'
      }
    }]
}
