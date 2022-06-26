<template>
  <div ref="mydiv" class="echarts">雷达图sdadad</div>
</template>

<script>
import * as echarts from 'echarts/core'
import { RadarChart } from 'echarts/charts'
// const echarts = require('echarts/lib/echarts')
// // 引入柱状图组件
// require('echarts/lib/chart/radar')
// // 引入提示框和title组件
// require('echarts/lib/component/tooltip')
// require('echarts/lib/component/title')
import {
  LegendComponent,
  TitleComponent,
  TooltipComponent
} from 'echarts/components'
import { CanvasRenderer } from 'echarts/renderers'
echarts.use([LegendComponent, TitleComponent, TooltipComponent, RadarChart, CanvasRenderer])
export default {
  mounted() {
    const myChart = echarts.init(this.$refs.mydiv)
    myChart.setOption({
      title: {
        text: '基础雷达图'
      },
      tooltip: {},
      //   legend: {
      //     data: ['预算分配（Allocated Budget）', '实际开销（Actual Spending）']
      //   },
      radar: {
        // shape: 'circle',
        indicator: [
          { name: '工作效率', max: 100 },
          { name: '考勤', max: 100 },
          { name: '积极性', max: 100 },
          { name: '帮助同事', max: 100 },
          { name: '自主学习', max: 100 },
          { name: '正确率', max: 100 }
        ]
      },
      series: [
        {
          name: 'Budget vs spending',
          type: 'radar',
          data: [
            {
              value: [50, 30, 20, 35, 50, 100],
              name: ' 张三'
            },
            {
              value: [50, 10, 28, 26, 40, 100],
              name: ' 里斯'
            }
          ]
        }
      ]
    })
  }
}
</script>

<style>
.echarts {
  width: 300px;
  height: 300px;
}
</style>
