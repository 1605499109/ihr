// 员工
import Layout from '@/layout'
export default {
  path: '/management',
  name: 'employees',
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
    },
    {
      path: '',
      component: () => import('@/views/management/DetailView.vue'),
      name: 'details',
      hidden: true,
      meta: {

      }
    },
    {
      path: 'print/:id', // 二级默认路由
      component: () => import('@/views/management/PrintView.vue'), // 按需加载
      hidden: true,
      name: 'print',
      meta: {
        title: '打印', // 标记当前路由规则的中文名称 后续在做左侧菜单时 使用
        icon: 'people'
      }
    }

  ]
}
