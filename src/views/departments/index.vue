<template>
  <!-- 组织架构 -->
  <div>
    <treeAll :tree-all="company" :isroot="true" />
    <el-tree :data="departs" :props="defaultProps" default-expand-all>
      <tree-All slot-scope="{ data }" :tree-all="data" @delDepts="runder" />
    </el-tree>
  </div>
</template>

<script>
import { getdepart } from '@/api/departments'
import treeAll from './TreeItem.vue'
import { tranListToTreeData } from '@/utils/filters'
export default {
  components: {
    treeAll
  },
  data() {
    return {
      company: { name: '江苏传智播客教育科技股份有限公司', manager: '负责人' },
      departs: [
        {
          name: '总裁办',
          manager: '曹操',
          children: [{ name: '董事会', manager: '曹操' }]
        },
        { name: '行政部', manager: '曹操' },
        { name: '人事部', manager: '曹操' }
      ],
      defaultProps: {
        children: 'children',
        label: 'name'
      }
    }
  },
  created() {
    // 获取组织架构
    this.runder()
  },
  methods: {
    // 渲染函数
    async runder() {
      const { data } = await getdepart()
      this.company.name = data.companyName
      this.departs = tranListToTreeData(data.depts, '')
      // console.log(this.departs)
    }
    // 让父组件渲染函数

  }
}
</script>

<style>
.tree-card {
  padding: 30px 140px;
  font-size: 14px;
}
</style>
