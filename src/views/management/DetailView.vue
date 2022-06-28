<template>
  <div>
    <el-tabs v-model="activeName">
      <el-tab-pane label="登录账户设置" name="first">
        <el-form label-width="120px" style="margin-left: 120px; margin-top:30px">
          <el-form-item label="姓名:">
            <el-input v-model="useradmin.username" style="width:300px" />
          </el-form-item>
          <el-form-item label="密码:">
            <el-input v-model="useradmin.password" style="width:300px" type="password" />
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="updateduser">更新</el-button>
          </el-form-item>
        </el-form>
      </el-tab-pane>
      <el-tab-pane label="个人详情" name="second">
        <userdetal v-if="firsetata.mobile" :firsetata="firsetata" @runder="runder" />
      </el-tab-pane>
      <el-tab-pane label="岗位信息" name="third">角色管理</el-tab-pane>

    </el-tabs>
  </div>
</template>

<script>
import { userinfo } from '@/api/management'
import { putuser } from '@/api/userinfo/userinfo'
import userdetal from './components/UserDetal.vue'
var dayjs = require('dayjs')
var utc = require('dayjs/plugin/utc')
dayjs.extend(utc)
export default {
  components: {
    userdetal
  },
  data() {
    return {
      firsetata: {},
      activeName: 'first',
      useradmin: {
        username: '',
        password: ''
      }

    }
  },
  created() {
    // console.log(this.$route.query.id)
    this.runder()
  },
  methods: {
    async runder() {
      const { data } = await userinfo(this.$route.query.id)
      this.useradmin.username = data.username
      this.useradmin.password = data.password
      this.firsetata = data
      //   const day = this.firsetata.correctionTime
      //   .utc().format()
      this.firsetata.correctionTime = new Date(this.firsetata.correctionTime)
      //   const day2 = dayjs.utc().format()
      this.firsetata.timeOfEntry = new Date(this.firsetata.timeOfEntry)
      //
      // console.log(this.firsetata.timeOfEntry)
      //   dayjs.utc().format(this.firsetata.timeOfEntry)
      // console.log(this.firsetata)
    },
    // 更新用户
    async updateduser() {
      const { success } = await putuser(this.$route.query.id, { ...this.firsetata, ...this.useradmin, password: this.useradmin.password, password2: this.useradmin.password })
      if (success) {
        this.$message({
          message: '更新成功',
          type: 'success'
        })
        // this.runder()
      }
    }
  }
}
</script>

<style>

</style>
