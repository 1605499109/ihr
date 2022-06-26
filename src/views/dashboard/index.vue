<template>
  <div class="dashboard-container">
    <!-- 个人logio 和信息 -->
    <div class="dashboard-text title">
      <el-image
        v-if="avatar"
        style="width: 100px; height: 100px"
        :src="avatar"
      />
      <el-image v-else style="width: 100px; height: 100px" :src="url" />
      <div>
        早安,{{ name }},祝你开心每一天
        <p>{{ name }}|{{ companyName }}----{{ departmentName }}</p>
      </div>
      <!-- 工作日历 -->
    </div>
    <div class="date">
      <div class="left">
        <DateView class="dateview" />
        <!-- <el-calendar v-model="value" /> -->
        <div class="right">
          <el-card class="box-card">
            <div class="header headTit">
              <span>流程申请</span>
            </div>
            <div class="sideNav">
              <el-button class="sideBtn">加班离职</el-button>
              <el-button class="sideBtn">请假调休</el-button>
              <el-button class="sideBtn">审批列表</el-button>
              <el-button class="sideBtn">我的信息</el-button>
            </div>
          </el-card>
          <!-- 放置雷达图 -->
          <el-card class="box-card">
            <div slot="header" class="header">
              <span>绩效指数</span>
            </div>
            <!-- 放置雷达图 -->
            <!-- 放置雷达图 -->
            <radar />
          </el-card>
          <!-- // -->
          <el-card class="box-card">
            <div slot="header" class="header">
              <span>帮助链接</span>
            </div>
            <div class="tisk">
              www
              <a href="#">
                <span class="icon iconGuide" />
                <p>入门指南</p>
              </a>
              <a href="#">
                <span class="icon iconGuide" />
                <p>入门指南</p>
              </a>
              <a href="#">
                <span class="icon iconGuide" />
                <p>入门指南</p>
              </a>
            </div>

          </el-card>
        </div>
        <!-- <radar /> -->
      </div>

      <!-- 公告 -->
      <h3>公告</h3>
      <ul>
        <li>
          <el-image
            v-if="avatar"
            style="width: 100px; height: 100px"
            :src="avatar"
          />
          <div>
            <h4>
              <span>{{ name }}</span> 发布了第一器“传值大讲堂互动获奖名单发布
            </h4>
            <p><span>asdadada</span> <span> 15:21</span></p>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import DateView from './componets/DateView.vue'
import radar from './componets/radar.vue'
export default {
  name: 'Dashboard',
  components: {
    DateView,
    radar
  },
  data() {
    return {
      url: require('@/assets/common/head.jpg')
      // value: new Date()
    }
  },
  computed: {
    ...mapGetters(['name', 'avatar', 'companyName', 'departmentName'])
  }
}
</script>

<style lang="scss" scoped>
.dashboard {
  &-container {
    background: rgb(237, 239, 242);
    margin: 30px;
  }
  &-text {
    margin: 23px 10px;
    font-size: 30px;
    line-height: 46px;
    display: flex;
    align-items: center;
    p {
      color: gray;
      font-size: 17px;
    }
  }
  .date {
    width: 1132px;
    height: 580px;
    border: 1px solid #000;
    display: flex;
  }
}
.dashboard-container {
  ul > li {
    width: 600px;
    border-bottom: 1px solid #000;
    display: flex;
    div {
      margin: 0 0 0 15px;
    }
    .left {
      display: flex;
      justify-content: space-around;
    }
  }
}
.dateview {
  width: 400px;
}
.left {
  display: flex;
  justify-content: space-between;
}
.task{
  display: flex;
}
a{
  display: flex;

}
.icon {
    display: inline-block;
    width: 76px;
    height: 76px;
    background: url('./../../assets/common/icon.png') no-repeat;
  }
</style>
