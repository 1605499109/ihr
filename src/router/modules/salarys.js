// 工资
import Layout from '@/layout'
export default {
  path: '/salarys',
  name: 'salarys',
  component: Layout,
  children: [
    {
      path: 'salarys',
      component: () => import('@/views/salarys'),
      name: '',
      meta: {
        title: '工资管理',
        icon: 'money'
      }
    }]
}
