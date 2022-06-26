<template>
  <div>
    <el-tabs v-model="activeName">
      <el-tab-pane label="角色管理" name="first">
        <el-button
          icon="el-icon-plus"
          size="small"
          type="primary"
          @click="addVisible = true"
        >
          添加角色</el-button>
        <!-- table -->
        <el-table :data="tableData" style="width: 100%">
          <el-table-column label="序号" width="180" prop="companyId" />
          <el-table-column label="角色名" width="180" prop="name" />
          <el-table-column label="描述" width="180" prop="description" />
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button
                size="mini"
                @click="peess(scope.$index, scope.row)"
              >分配权限</el-button>
              <el-button
                size="mini"
                @click="handleEdit(scope.$index, scope.row)"
              >编辑</el-button>
              <el-button
                size="mini"
                type="danger"
                @click="handleDelete(scope.$index, scope.row)"
              >删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <!-- 分页组件 -->
        <el-pagination
          layout="prev, pager, next"
          :total="total"
          :size="10"
          @current-change="handleCurrentChange"
        />
        <!-- 公司信息 -->
      </el-tab-pane>
      <el-tab-pane label="公司信息" name="second">
        <el-alert
          title="对公司名称、公司地址、营业执照、公司地区的更新，将使得公司资料被重新审核，请谨慎修改"
          type="info"
          show-icon
          :closable="false"
        />
        <el-form label-width="120px" style="margin-top: 50px">
          <el-form-item label="公司名称">
            <el-input disabled style="width: 400px" :value="company.name" />
          </el-form-item>
          <el-form-item label="公司地址">
            <el-input
              disabled
              style="width: 400px"
              :value="company.companyAddress"
            />
          </el-form-item>
          <el-form-item label="邮箱">
            <el-input disabled style="width: 400px" :value="company.mailbox" />
          </el-form-item>
          <el-form-item label="备注">
            <el-input
              type="textarea"
              :rows="3"
              disabled
              style="width: 400px"
              :value="company.remarks"
            />
          </el-form-item>
        </el-form>
      </el-tab-pane>
    </el-tabs>
    <!-- 添加弹出框 -->
    <el-dialog title="添加角色" :visible.sync="addVisible">
      <el-form :model="addform">
        <el-form-item label="角色名称">
          <el-input v-model="addform.name" autocomplete="off" />
        </el-form-item>

        <el-form-item label="角色描述">
          <el-input v-model="addform.description" autocomplete="off" />
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addVisible = false">取 消</el-button>
        <el-button type="primary" @click="adduser">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 编辑弹出框 -->
    <el-dialog title="编辑角色" :visible.sync="putVisible">
      <el-form :model="putform">
        <el-form-item label="角色名称">
          <el-input v-model="putform.name" autocomplete="off" />
        </el-form-item>

        <el-form-item label="角色描述">
          <el-input v-model="putform.description" autocomplete="off" />
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="putVisible = false">取 消</el-button>
        <el-button type="primary" @click="putuser">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 权限分配 -->
    <el-dialog title="权限分配" :visible.sync="permissionVisible">
      <el-tree
        ref="tree"
        :data="data"
        show-checkbox
        node-key="id"
        :default-expanded-keys="[2, 3]"
        :default-checked-keys="checkedKeys"
        :props="defaultProps"
      />

      <span slot="footer" class="dialog-footer">
        <el-button @click="putVisible = false">取 消</el-button>
        <el-button type="primary" @click="putpermission">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import {
  getuserlist,
  addusers,
  deleteusers,
  getuserdetail,
  putusers,
  getpermission,
  getpermissiondetail,
  putpermission,
  getcompany
} from '@/api/setting'
import { tranListToTreeData } from '@/utils/filters'
export default {
  data() {
    return {
      activeName: 'first',
      // 页数
      total: null,
      tableData: [],
      // 添加弹出框
      addVisible: false,
      // 编辑弹出框
      putVisible: false,
      // 权限分配
      permissionVisible: false,
      addform: {
        name: '',
        description: ''
      },
      putform: {
        name: '',
        region: '',
        description: ''
      },
      row: '',
      data: [],
      defaultProps: {
        children: 'children',
        label: 'name'
      },
      checkedKeys: [],
      // 公司信息
      company: {}
    }
  },
  created() {
    this.runder()
  },

  methods: {
    // 渲染函数
    async runder(page) {
      const { data } = await getuserlist({ page: page ?? 1, pagesize: 10 })
      this.tableData = data.rows
      this.total = data.total
      const companys = await getcompany()
      this.company = companys.data
    },
    // 页面发生改变
    handleCurrentChange(v) {
      this.runder(v)
    },
    // 编辑角色
    handleEdit(index, row) {
      this.putVisible = true
      this.putform.name = row.name
      this.putform.description = row.description
      this.row = row
    },
    // 添加角色
    async adduser() {
      const { success } = await addusers(this.addform)
      console.log(this.addform)
      if (success) {
        this.addVisible = false
        this.addform = {
          name: '',
          region: ''
        }
        this.$message({
          message: '添加成功',
          type: 'success'
        })
        this.runder()
      }
    },
    // 删除角色
    async handleDelete(index, row) {
      const { success } = await deleteusers(row.id)
      if (success) {
        this.$message({
          message: '删除成功',
          type: 'success'
        })
        this.runder()
      }
    },
    // 编辑角色
    async putuser() {
      // console.log(v)
      const { data } = await getuserdetail(this.row.id)

      const { success } = await putusers(this.row.id, {
        ...data,
        ...this.putform
      })
      if (success) {
        this.$message({
          message: '编辑成功',
          type: 'success'
        })
        this.putVisible = false
        this.runder()
      }
    },
    // 分配权限
    // 获取权限
    async peess(index, row) {
      const { data } = await getpermission()
      const arrdata = tranListToTreeData(data, '0')
      this.data = arrdata
      this.label = arrdata.name
      const detail = await getpermissiondetail(row.id)
      this.row = row
      this.checkedKeys = detail.data.permIds

      this.permissionVisible = true
      // 还未完善
    },
    // 通过id获取权限
    async putpermission() {
      const arr = this.$refs.tree.getCheckedKeys()
      console.log(this.row)
      const { success } = await putpermission(this.row.id, arr)
      if (success) {
        this.$message({
          message: '分配权限成功',
          type: 'success'
        })
        this.permissionVisible = false
        this.runder()
      }
    }
  }
}
</script>

<style>
</style>
