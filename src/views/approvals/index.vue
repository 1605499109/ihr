<template>
  <!-- 审批 -->
  <div>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span>当前审批中 0 本月审批通过 1 本月审批驳回 0</span>
        <el-button
          style="float: right; padding: 3px 0"
          type="primary"
        >流程设置</el-button>
      </div>
    </el-card>
    <el-table
      ref="multipleTable"
      :data="tableData"
      tooltip-effect="dark"
      style="width: 100%"
    >
      <el-table-column type="selection" width="55" />
      <el-table-column label="序号" width="55" type="index" />
      <el-table-column label="审批类型" width="120" prop="processName" />
      <el-table-column prop="username" label="申请人" width="120" />
      <el-table-column
        prop="procCurrNodeUserName"
        label="当前审批人"
        show-overflow-tooltip
      />
      <el-table-column
        label="审批发起时间"
        show-overflow-tooltip
      >
        <template slot-scope="scope">
          <span>{{ scope.row.procApplyTime |formatDate }}</span>
        </template></el-table-column>
      <el-table-column
        prop="process_state"
        label="审批状态"
        show-overflow-tooltip
      >
        <template slot-scope="scope">
          <span v-if="scope.row.processState==='0'">
            <em class="sub" />已提交
          </span>
          <span v-if="scope.row.processState==='1'">
            审批中
          </span>
          <span v-if="scope.row.processState==='2'">
            审批通过
          </span>
          <span v-if="scope.row.processState==='3'">
            审批不通过
          </span>
          <span v-if="scope.row.processState==='4'">
            撤销
          </span>
        </template>
      </el-table-column><el-table-column
        label="操作"
        show-overflow-tooltip
      >
        <template slot-scope="scope">
          <el-button type="text" size="mini" @click="toDetail(scope.row)">
            查看
          </el-button>
        </template></el-table-column>
    </el-table>
    <!-- 分页 -->
    <el-row type="flex" align="middle" justify="center" style="height: 60px">
      <el-pagination
        :total="page.total"
        :page-size="page.pagesize"
        layout="prev, pager, next"
        @current-change="changePage"
      />
    </el-row>
  </div>
</template>

<script>
const dayjs = require('dayjs')
import { getinstance } from '@/api/approvals'
export default {
  filters: {
    formatDate(v) {
      return dayjs(v).format('YYYY/MM/DD')
    }
  },
  data() {
    return {
      tableData: [],
      page: {
        page: 1,
        total: null,
        pageSize: 10
      }
    }
  },
  created() {
    this.runder()
  },
  methods: {
    async runder() {
      const { data } = await getinstance(this.page.page, 10)
      this.tableData = data.rows
      // console.log(data)
      this.page.total = data.total
    },
    toDetail(obj) {
      console.log(obj)
      this.$router.push({ name: 'detali', query: { id: obj.processId }})
    },
    changePage(v) {
      this.page.page = v
      this.runder()
    }
  }
}
</script>

<style>
</style>
