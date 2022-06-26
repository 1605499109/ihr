<template>
  <div class="center">
    <h2>工作日历</h2>
    <div class="flex">
      <!-- 年份 -->
      <el-select
        v-model="currentYear"
        placeholder="请选择年份"
        @change="yearChange"
      >
        <el-option
          v-for="item in yearlist"
          :key="item"
          :label="item"
          :value="item"
        />

      </el-select>
      <!-- 月份 -->
      <el-select
        v-model="currentMonth"
        placeholder="请选择"
        @change="yearChange"
      >
        <el-option v-for="item in 12" :key="item" :label="item" :value="item" />
      </el-select>
    </div>
    <el-calendar v-model="currentDate">
      <!-- 这里使用的是 2.5 slot 语法，对于新项目请使用 2.6 slot 语法-->

      <template slot="dateCell" slot-scope="{ date, data }">
        <div class="date-connt">
          <span>{{ data.day | getday }}</span>
          <span v-if="isrest(date)" class="rest">休</span>
        </div>

        <!-- <p :class="data.isSelected ? 'is-selected' : ''">
          {{ date.getDate() }}
          {{ data.day.split('-').slice(1).join('-') }} {{ data.isSelected ? '✔️' : '' }}
        </p> -->
      </template>
    </el-calendar>
  </div>
</template>

<script>
export default {
  filters: {
    getday(value) {
      const day = value.split('-')[2]
      return day
    }
  },
  props: {
    startdate: {
      type: Date,
      default: function() {
        return new Date()
      }
    }
  },
  data() {
    return {
      value: ' ',
      // 当前年份列表
      yearlist: [],
      currentMonth: null, // 当前月份
      currentYear: null, // 当前年份
      currentDate: null
    }
  },
  created() {
    this.currentYear = this.startdate.getFullYear()
    this.currentMonth = this.startdate.getMonth() + 1
    // // 年份前后各加5年
    for (let i = 0; i < 5; i++) {
      this.yearlist.unshift(this.currentYear - i)

      this.yearlist.push(this.currentYear + i)
    }
    this.yearlist = [...new Set(this.yearlist)]
    // console.log(this.yearlist)
  },
  methods: {
    // 判断是否是休息日
    isrest(value) {
      const rest = new Date(value).getDay()
      // console.log(rest)
      if (rest === 0 || rest === 6) {
        return true
      }
    },
    // 年份改变的话
    yearChange() {
      console.log(this.currentYear, this.currentMonth)
      this.currentDate = new Date(`${this.currentYear}-${this.currentMonth}-1`)
    }
  }
}
</script>

<style>
.flex {
  display: flex;
  justify-content: end;
  width: 200px;
}
.rest{
  background: orange;
  height: 20px;
  /* width: 20px; */
  border-radius: 30%;
  color: #fff;
}
.el-calendar-table__row{
  height: 30px;
}
.date-connt .current{
  width: 30px;

}
.center{
border: 1px solid #000;
width: 400px;
/* height: 400px; */
margin: 20px;
}
.el-button-group{
  display: none;
}
.el-calendar-table .el-calendar-day {
    /* -webkit-box-sizing: border-box; */
    box-sizing: border-box;
    padding: 8px;
    /* height: 85px; */
}
</style>
