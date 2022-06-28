<template>
  <div>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <span> 共{{ tatal }}条记录</span>
        <el-button
          style="float: right; padding: 3px 0"
          type="danger"
          @click="exportExcel"
        >普通excel导出</el-button>
        <el-button
          style="float: right; padding: 3px 0"
          type="info"
        >复杂表头excel导出</el-button>
        <el-button
          style="float: right; padding: 3px 0"
          type="success"
          @click="inputupload"
        >excel导入</el-button>
        <el-button
          style="float: right; padding: 3px 5px"
          type="primary"
          @click="adduserVisible = true"
        >新增员工</el-button>
      </div>
    </el-card>
    <!-- table部分 -->
    <el-table :data="tableData" style="width: 100%">
      <el-table-column label="序号" type="index" />
      <el-table-column label="姓名" prop="username" />
      <el-table-column label="头像" prop="staffPhoto">
        <template slot-scope="scope">
          <img
            :src="scope.row.staffPhoto"
            style="width: 50px; height: 50px"
            @click="showimgs(scope.row.staffPhoto)"
          >
        </template>
      </el-table-column>
      <el-table-column label="手机号" prop="mobile" />
      <el-table-column label="工号" prop="workNumber" />
      <el-table-column label="聘用形式">正式</el-table-column>
      <el-table-column label="部门" prop="departmentName" />
      <el-table-column label="入职时间" prop="timeOfEntry" />
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            size="mini"
            @click="routersee(scope.$index, scope.row)"
          >查看</el-button>
          <el-button size="mini">转正</el-button>
          <el-button size="mini">调岗</el-button>
          <el-button size="mini">离职</el-button>
          <el-button
            size="mini"
            @click="handlerouse(scope.$index, scope.row)"
          >角色</el-button>
          <el-button
            size="mini"
            @click="handleDelete(scope.$index, scope.row)"
          >删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      :page-size="10"
      layout="total, prev, pager, next"
      :total="tatal"
      @current-change="handleCurrentChange"
    />

    <!-- 删除弹框 -->
    <el-dialog title="提示" :visible.sync="dialogVisible" width="30%">
      <span>是否删除？</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="removeuser">确 定</el-button>
      </span>
    </el-dialog>
    <!-- //新增加员工弹出框 -->
    <!-- 删除弹框 -->
    <el-dialog title="新增员工" :visible.sync="adduserVisible">
      <div />
      <el-form :model="adduserfrom">
        <el-form-item label="姓名">
          <el-input v-model="adduserfrom.username" />
        </el-form-item>
        <el-form-item label="手机号">
          <el-input v-model="adduserfrom.mobile" />
        </el-form-item>
        <el-form-item label="入职时间">
          <el-date-picker
            v-model="adduserfrom.timeOfEntry"
            type="date"
            placeholder="时间"
            style="width: 100%"
          />
        </el-form-item>
        <el-form-item label="聘用形式">
          <el-select
            v-model="adduserfrom.formOfEmployment"
            placeholder="请选择聘用"
          >
            <el-option label="正式" value="1" />
            <el-option label="非正式" value="2" />
          </el-select>
        </el-form-item>
        <el-form-item label="工号">
          <el-input v-model="adduserfrom.workNumber" />
        </el-form-item>
        <el-form-item label="部门">
          <el-select
            v-model="adduserfrom.departmentName"
            @focus="getDepartment"
          ><div slot="empty">
            <el-tree
              v-loading="isloading"
              :data="depts"
              :props="{ children: 'children', label: 'name' }"
              show-checkbox
              @check="handleNodeClick"
            /></div></el-select>
        </el-form-item>
        <el-form-item label="转正时间">
          <el-date-picker
            v-model="adduserfrom.correctionTime"
            type="date"
            placeholder="时间"
            style="width: 100%"
          />
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="adduserVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitadduser">确 定</el-button>
      </span>
    </el-dialog>

    <!-- 二维码弹框 -->
    <el-dialog title="图片二维码" :visible.sync="imgvisble" width="30%">
      <vueQr :size="200" :text="bagsrc ? bagsrc : '1'" />
    </el-dialog>
    <!-- 角色弹框 -->
    <el-dialog title="角色管理" :visible.sync="rolevisble">
      <el-form ref="form" :model="from" label-width="80px">
        <el-form-item label="活动性质" prop="type">
          <el-checkbox-group v-model="from.type">
            <el-checkbox
              v-for="(item, i) in rolelist"
              :key="i"
              :label="item.id"
              @change="changeclick(item.id)"
            >{{ item.name }}</el-checkbox>
          </el-checkbox-group>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="rolevisble = false">取 消</el-button>
        <el-button type="primary" @click="putroles">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { getManagement, deleteuser, adduser, userinfo, rolelist, putrole } from '@/api/management'
import { getdepart } from '@/api/departments'
import { tranListToTreeData } from '@/utils/filters'
import vueQr from 'vue-qr'
// 导出

export default {
  components: {
    vueQr
  },
  data() {
    return {
      tableData: [],
      // 条数
      tatal: null,
      page: 1,
      // 删除弹框
      dialogVisible: false,
      // id 临时储存
      row: '',
      // 新增加员工弹出框
      adduserVisible: false,
      adduserfrom: {
        username: '', // 姓名
        mobile: '', // 手机号
        departmentName: '', // 组织名称
        workNumber: '', // 工号
        formOfEmployment: null, // 聘用形式
        timeOfEntry: '', // 入职时间
        correctionTime: '' // 转正时间，
      },
      // 角色管理弹窗
      rolevisble: false,
      // 组织架构
      depts: [],
      isloading: false,
      // 二维码弹框
      imgvisble: false,
      bagsrc: '',
      from: {
        type: []
      },
      rolelist: []
    }
  },
  created() {
    this.runder()
  },
  methods: {
    handleEdit(index, row) {
      console.log(index, row)
    },
    handleDelete(index, row) {
      this.dialogVisible = true
      this.row = row
    },
    // 获取数据
    async runder() {
      const { data } = await getManagement(this.page)
      this.tableData = data.rows
      this.tatal = data.total
      this.bagsrc = data.rows.staffPhoto
      const res = await rolelist()
      this.rolelist = res.data.rows
    },
    async handleCurrentChange(page) {
      this.page = page
      this.runder()
    },
    async removeuser() {
      const { success } = await deleteuser(this.row.id)
      if (success) {
        this.$message({
          message: '删除消息',
          type: 'success'
        })
        this.runder()
        this.dialogVisible = false
      }
    },
    // 新增加员工
    async submitadduser() {
      const { success } = await adduser(this.adduserfrom)
      if (success) {
        this.$message({
          message: '添加成功',
          type: 'success'
        })
        this.runder()
        this.adduserVisible = false
      }
    },
    // 当点击次级懒加载
    async getDepartment() {
      this.isloading = true
      const { data, success } = await getdepart()
      if (success) {
        this.isloading = false

        const res = tranListToTreeData(data.depts, '')
        this.depts = res
        console.log(res)
      }
    },
    handleNodeClick(data) {
      this.departmentName = data.name
    },

    showimgs(img) {
      this.bagsrc = img
      this.imgvisble = true
    },
    async handlerouse(index, row) {
      this.rolevisble = true
      const { data } = await userinfo(row.id)
      this.from.type = data.roleIds
      this.row = row
      // console.log(index, data)
      console.log(this.tableData)
    },
    changeclick(value) {
      console.log(this.from.type)
    },
    // 分配角色
    async  putroles() {
      const { success } = await putrole({ id: this.row.id, roleIds: this.from.type })
      if (success) {
        this.$message({
          message: '分配成功',
          type: 'success'
        })
        this.rolevisble = false
        this.runder()
      }
    },
    // 导出
    exportExcel() {
      import('@/vendor/Export2Excel').then(excel => {
        const tHeader = ['姓名', '手机号', '入职日期', '转正日期', '工号', '部门']
        const fileterval = ['username', 'mobile', 'timeOfEntry', 'correctionTime', 'workNumber', 'departmentName']
        const data = this.formatJson(fileterval, this.tableData)
        excel.export_json_to_excel({
          header: tHeader, // 表头 必填
          data, // 具体数据 必填
          filename: '人力资源表', // 非必填
          autoWidth: true, // 非必填
          bookType: 'xlsx' // 非必填
        })
      })
    },
    formatJson(headers, rows) {
      return rows.map(v => headers.map(j => v[j]))
    },
    // 查看跳转
    routersee(index, row) {
      this.$router.push({ name: 'details', query: { id: row.id }})
    },
    inputupload() {
      this.$router.push({ name: 'fileupload', query: { type: 'user' }})
    }
  }
}
</script>

<style>
</style>
