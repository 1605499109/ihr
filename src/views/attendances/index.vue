<template>
  <div>
    {{ tableData.attendanceRecord }}
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
        <el-checkbox
          v-for="(item, i) in checkList"
          :key="i"
          :label="item.name"
        >{{ item.name }}</el-checkbox>
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
    <el-table class="table" :data="tableData">
      <el-table-column label="序号" type="index" />
      <el-table-column prop="username" label="姓名" />
      <el-table-column prop="workNumber" label="工号" />
      <el-table-column prop="departmentName" label="部门" />
      <el-table-column prop="mobile" label="手机" />
      <template v-for="item1 in tableData">
        <el-table-column
          v-for="(item, index) in tableData[0].attendanceRecord"
          :key="item1.id + item.day"
          :label="item.day.slice(-2)"
        >
          <template slot-scope="scope">
            <span>{{
              scope.row.attendanceRecord[index].adtStatu | statuss
            }}</span>
          </template>
        </el-table-column>
      </template>
    </el-table>
    <!-- 第一次测试（失败） -->
    <!-- <template v-for="item,index in tableData.attendanceRecord">
      <el-table-column :key="index">
        <div>{{ item }}</div>
      </el-table-column>
    </template> -->
    <!-- 第二次测试(失败) -->
    <!-- <el-table-column v-for="item,index in tableData.attendanceRecord" :key="index" :label="index"> dadadadd</el-table-column> -->

    <!-- <div v-for="(item, i) in checkList" :key="i">{{ checkList }}</div> -->
  </div>
</template>

<script>
import { getreports } from '@/api/attendances/attendances'
import { getdepart } from '@/api/departments'
export default {
  filters: {
    statuss(v) {
      const arr = [
        {
          statu: 1,
          lable: '正常'
        },
        {
          statu: 2,
          lable: '旷工'
        },
        {
          statu: 3,
          lable: '迟到'
        },
        {
          statu: 4,
          lable: '早退'
        },
        {
          statu: 5,
          lable: '外出'
        },
        {
          statu: 6,
          lable: '出差'
        },
        {
          statu: 7,
          lable: '年假'
        },
        {
          statu: 8,
          lable: '事假'
        },
        {
          statu: 9,
          lable: '病假'
        },
        {
          statu: 10,
          lable: '婚假'
        },
        {
          statu: 11,
          lable: '丧假'
        },
        {
          statu: 12,
          lable: '产假'
        },
        {
          statu: 13,
          lable: '奖励产假'
        },
        {
          statu: 14,
          lable: '陪产假'
        },
        {
          statu: 15,
          lable: '探亲假'
        },
        {
          statu: 16,
          lable: '工伤假'
        },
        {
          statu: 17,
          lable: '调休'
        },
        {
          statu: 18,
          lable: '产检假'
        },
        {
          statu: 19,
          lable: '流产假'
        },
        {
          statu: 20,
          lable: '长期病假'
        },
        {
          statu: 21,
          lable: '测试架'
        },
        {
          statu: 22,
          lable: '补签'
        }
      ]
      const ous = arr.filter(item => item.statu === v)
      return ous[0].lable
    }
  },

  data() {
    return {
      checkList: ['widhag'],
      radio: 3,
      tableData: [],
      integer: [
        {
          statu: 1,
          lable: '正常'
        },
        {
          statu: 2,
          lable: '旷工'
        },
        {
          statu: 3,
          lable: '迟到'
        },
        {
          statu: 4,
          lable: '早退'
        },
        {
          statu: 5,
          lable: '外出'
        },
        {
          statu: 6,
          lable: '出差'
        },
        {
          statu: 7,
          lable: '年假'
        },
        {
          statu: 8,
          lable: '事假'
        },
        {
          statu: 9,
          lable: '病假'
        },
        {
          statu: 10,
          lable: '婚假'
        },
        {
          statu: 11,
          lable: '丧假'
        },
        {
          statu: 12,
          lable: '产假'
        },
        {
          statu: 13,
          lable: '奖励产假'
        },
        {
          statu: 14,
          lable: '陪产假'
        },
        {
          statu: 15,
          lable: '探亲假'
        },
        {
          statu: 16,
          lable: '工伤假'
        },
        {
          statu: 17,
          lable: '调休'
        },
        {
          statu: 18,
          lable: '产检假'
        },
        {
          statu: 19,
          lable: '流产假'
        },
        {
          statu: 20,
          lable: '长期病假'
        },
        {
          statu: 21,
          lable: '测试架'
        },
        {
          statu: 22,
          lable: '补签'
        }
      ]

    }
  },
  created() {
    this.runder()
  },
  methods: {
    demo(data) {
      console.log(data)
    },
    async runder() {
      const res = await getreports(1, 10)
      const { data } = await getdepart()
      // console.log(data)
      this.checkList = data.depts
      this.tableData = res.data.data.rows
      // const arr = []
      // console.log(this.tableData)

      console.log(this.tableData)
      // console.log(111111, this.filtername(data.deps))
      // console.log(data.depts)
    },
    filtername(arr) {
      // console.log(arr)
      return arr.map((item) => item.name)
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
.table {
  overflow: auto;
  width: 700px;
}
</style>
