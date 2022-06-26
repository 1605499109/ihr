<template>
  <div>
    <el-card class="box-card">
      <div slot="header" class="clearfix flex">
        <div>
          <span>你有{{ tableData.length }}条考勤审批尚未处理</span>

          <el-button type="danger">导入</el-button>
          <el-button type="warning">提醒</el-button>
          <el-button type="primary">设置</el-button>
          <el-button plain>历史归档</el-button>
          <el-button type="primary">202203报表</el-button>
        </div>
      </div>
    </el-card>
    <!-- 复选框 -->
    <el-card class="box-card">
      部门：
      <el-checkbox-group v-model="tableData">

        <el-checkbox v-for="(item,i) in checkList" :key="i" :label="item.name">{{ item.name }}</el-checkbox>
      </el-checkbox-group>
      <!-- 单选 -->
      考勤状态：
      <el-radio-group v-model="radio">
        <el-radio :label="1">正茶</el-radio>
        <el-radio :label="2">矿工</el-radio>
        <el-radio :label="3">事假</el-radio>
        <el-radio :label="4">调休</el-radio>
        <el-radio :label="5">迟到</el-radio>
        <el-radio :label="6">早退</el-radio>
      </el-radio-group>
    </el-card>
    <el-table
      class="table"
      :data="tableData"
    >
      <el-table-column

        label="序号"
        type="index"
      />
      <el-table-column
        prop="username"
        label="姓名"
      />
      <el-table-column
        prop="workNumber"
        label="工号"
      />
      <el-table-column
        prop="departmentName"
        label="部门"
      />
      <el-table-column
        prop="mobile"
        label="手机"
      />
      <el-table-column
        v-for="(item,i) in tableData "
        :key="i"
        :label="` 3/${i}` "
      >
        <span slot="header" />
        <span @click="onchange(item)"> {{ item.attendanceRecord[i+1].adtStatu }}</span>
        <!-- <span>{{ item.attendanceRecord.adtStatu }}</span> -->
      </el-table-column>

    </el-table>
    <!-- <div v-for="(item, i) in checkList" :key="i">{{ checkList }}</div> -->
  </div>
</template>

<script>
import { getreports } from '@/api/attendances/attendances'
import { getdepart } from '@/api/departments'
export default {

  // filters: {
  //   filtername(arr) {
  //     return arr.filte((item) => item.name)
  //   }
  // },
  data() {
    return {
      checkList: ['widhag'],
      radio: 3,
      tableData: []
    }
  },
  created() {
    this.runder()
  },
  methods: {
    async runder() {
      const res = await getreports(1, 10)
      const { data } = await getdepart()
      // console.log(data)
      this.checkList = data.depts
      this.tableData = res.data.data.rows

      console.log(this.tableData)
      // console.log(111111, this.filtername(data.deps))
      // console.log(data.depts)
    },
    filtername(arr) {
      // console.log(arr)
      return arr.map((item) => item.name)
    },
    onchange(v) {
      console.log(v)
    }

  }
}
</script>

<style>
.text {
  font-size: 14px;
}

.item {
  margin-bottom: 18px;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}
.clearfix:after {
  clear: both;
}
.table{
  overflow: auto;
  width: 700px;
}
</style>
