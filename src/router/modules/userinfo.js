// 社保
import Layout from '@/layout'
export default {
  path: '/userinfo',
  // name: 'scocial',
  component: Layout,
  children: [
    {
      path: '',
      component: () => import('@/views/management/UserInfo.vue'),
      name: 'scocial',
      hidden: true,
      meta: {
        title: 'userinfo'

      }
    }]
}
