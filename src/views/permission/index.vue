<template>
  <!-- 权限管理 -->
  <div>
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <el-button
          style="float: right; padding: 3px 0"
          type="primary"
          @click="ischelcn(1)"
        >添加权限</el-button>
      </div>
    </el-card>
    <el-table
      :data="tableData"
      style="width: 100%"
      row-key="id"
      :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
    >
      <el-table-column prop="name" label="名称" width="180" />
      />
      <el-table-column prop="code" label="标识" width="180" />
      <el-table-column prop="description" label="描述" />
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button type="text" @click="ischelcn(scope.row)">添加</el-button><el-button
            type="text"
            @click="editpermission(scope.row)"
          >编辑</el-button><el-button type="text" @click="removepermissions(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 增加权限弹出框 -->
    <el-dialog title="添加权限" :visible.sync="dialogVisible">
      <el-form :model="form">
        <el-form-item label="权限名称">
          <el-input v-model="form.name" autocomplete="off" />
        </el-form-item>
        <el-form-item
          label="权限标识"
        ><el-input
          v-model="form.identification"
          autocomplete="off"
        /></el-form-item>
        <el-form-item
          label="权限描述"
        ><el-input
          v-model="form.describe"
          autocomplete="off"
        /></el-form-item>
        <el-form-item label="开启">
          <el-switch
            v-model="form.ison"
            active-color="#13ce66"
            inactive-color="#ccc"
          />
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addpermission">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 编辑的窗口 -->、
    <el-dialog title="编辑权限" :visible.sync="editvisible">
      <el-form :model="editform">
        <el-form-item label="权限名称">
          <el-input v-model="editform.name" />
        </el-form-item>
        <el-form-item
          label="权限标识"
        ><el-input
          v-model="editform.code"
        /></el-form-item>
        <el-form-item
          label="权限描述"
        ><el-input
          v-model="editform.description"
        /></el-form-item>
        <el-form-item label="开启">
          <el-switch
            v-model="editform.ison"
            active-color="#13ce66"
            inactive-color="#ccc"
          />
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="editvisible = false">取 消</el-button>
        <el-button type="primary" @click="putpermissions">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import {
  GetPermissionList,
  postpermission,
  putpermission,
  deletepermission
} from '@/api/permission/permission'
import { tranListToTreeData } from '@/utils/filters'
export default {
  data() {
    return {
      tableData: [],
      dialogVisible: false,
      form: {
        name: '',
        identification: '', // 标识
        describe: '', // 描述
        ison: false // 开关
      },
      // 编辑弹框
      editvisible: false,
      editform: {
        name: '',
        code: '', // 标识
        description: '', // 描述
        ison: false // 开关
      },
      row: '' // 临时存储的对象,
    }
  },
  created() {
    this.runder()
  },
  methods: {
    async runder() {
      // GetPermissionList
      const { data } = await GetPermissionList()
      this.tableData = tranListToTreeData(data, '0')
      // console.log(this.tableData)
    },
    // 添加权限
    async addpermission() {
      if (this.row === 1) {
        const { success } = await postpermission({ name: this.form.name,
          code: this.form.identification,
          description: this.form.describe,
          enVisible: this.form.ison, pid: '0',
          type: 1 })
        if (success) {
          this.dialogVisible = false
          this.$message({
            message: '修改成功',
            type: 'success'
          })
          this.runder()
        }
      } else if (this.row.type) {
        const { success } = await postpermission({ name: this.form.name,
          code: this.form.identification,
          description: this.form.describe,
          enVisible: this.form.ison,
          pid: this.row.id,
          type: this.row.type })
        if (success) {
          this.dialogVisible = false
          this.$message({
            message: '修改成功',
            type: 'success'
          })
          this.runder()
        }
      }
    },
    editpermission(row) {
      this.editvisible = true
      this.editform.name = row.name
      this.editform.identification = row.code
      this.editform.describe = row.description
      this.row = row
      // console.log(row)
    },
    async putpermissions() {
      // console.log('qqqqqqqqqqqqqqq')
      const { success } = await putpermission(this.row.id, { ...this.editform })
      if (success) {
        this.editvisible = false
        this.$message({
          message: '修改成功',
          type: 'success'
        })
        this.runder()
      }
    },
    ischelcn(row) {
      this.dialogVisible = true
      // console.log(row)

      this.row = row// 临时存储
    },

    async removepermissions(v) {
      const { success } = await deletepermission(v.id)
      if (success) {
        this.$message({
          message: '删除成功',
          type: 'success'
        })
        this.runder()
      }
    }
  }
}
</script>

<style>
</style>
