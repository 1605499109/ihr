
// 审批

import Layout from '@/layout'
// import { Icon } from 'element-ui'
export default {
  path: '/appprovals',
  // name: 'approvals',
  component: Layout,
  children: [
    {
      path: ' appprovals',
      name: 'approvals',
      component: () => import('@/views/approvals'),
      meta: {
        title: '审批',
        icon: 'tree-table'
      }
    }]
}
