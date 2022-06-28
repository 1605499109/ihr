// 社保
import Layout from '@/layout'
export default {
  path: '/detail',
  name: 'detail',
  component: Layout,
  children: [
    {
      path: '',
      component: () => import('@/views/management/DetailView.vue'),
      name: '',

      meta: {
        title: 'detail'

      }
    }]
}
