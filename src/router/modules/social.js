// 社保
import Layout from '@/layout'
export default {
  path: '/scocial',
  // name: 'scocial',
  component: Layout,
  children: [
    {
      path: '',
      component: () => import('@/views/scocial'),
      name: 'scocial',
      meta: {
        title: '社保管理',
        icon: 'table'
      }
    }]
}
