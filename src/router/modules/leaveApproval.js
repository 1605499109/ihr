import Layout from '@/layout'
export default {
  path: '/leaveApproval',
  name: 'leaveApproval',
  component: Layout,
  children: [
    {
      path: '',
      name: 'leaveApproval',
      component: () => import('@/views/approvals/DetaView.vue')
    }]
}
