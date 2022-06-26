// 员工
import Layout from '@/layout'
export default {
  path: '/management',
  // name: 'employees',
  component: Layout,
  children: [
    {
      path: '',
      component: () => import('@/views/management'),
      name: 'employees',
      meta: {
        title: '员工',
        icon: 'people'
      }
    }]
}
