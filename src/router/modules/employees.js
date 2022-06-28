// 员工
import Layout from '@/layout'
export default {
  path: '/employees',
  name: 'employees',
  component: Layout,
  children: [
    {
      path: '',
      component: () => import('@/views/employees'),
      name: 'settings',
      meta: {
        title: '公司管理',
        icon: 'people'
      }
    }]
}
