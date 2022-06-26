
// 社保
import Layout from '@/layout'
export default {
  path: '/fileupload',
  // name: 'scocial',
  component: Layout,
  children: [
    {
      path: '',
      component: () => import('@/views/management/components/FileUpload.vue'),
      name: 'fileupload',
      hidden: true,
      meta: {
        title: 'fileupload'
      }
    }]
}
