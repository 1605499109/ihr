<template>
  <div>
    <el-row
      type="flex"
      justify="space-between"
      align="middle"
      style="height: 40px; width: 100%"
    >
      <el-col :span="6">
        <!-- 名称应该变成 对应的节点中的name -->
        <span>{{ treeAll.name }}</span>
      </el-col>
      <el-col :span="4">
        <el-row class="row">

          <el-col class="right">{{ treeAll.manager }}</el-col>

          <el-col>
            <el-dropdown @command="change">
              <span> 操作<i class="el-icon-arrow-down" /> </span>

              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item command="add">添加子部门</el-dropdown-item>
                <el-dropdown-item v-if="!isroot" command="put">编辑部门</el-dropdown-item>
                <el-dropdown-item v-if="!isroot" command="delete"> 删除部门</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </el-col>
        </el-row>
      </el-col>
    </el-row>
    <!-- 删除弹出框 -->
    <el-dialog
      title="提示"
      :visible.sync="dialogVisible"
      width="30%"
      :before-close="handleClose"
    >
      <span>是否删除</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="removetrree">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 添加弹框 -->
    <el-dialog
      :title=" '添加部门'"
      :visible.sync="adddepartVisible"
      :before-close="handleClose"
    >
      <el-form :model="form">
        <el-form-item label="部门名称">
          <el-input v-model="form.name" autocomplete="off" />
        </el-form-item>

        <el-form-item label="部门编码">
          <el-input v-model="form.code" autocomplete="off" />
        </el-form-item>

        <el-form-item label="部门负责人">

          <el-select v-model="form.manager" placeholder="请选择部门负责人">
            <el-option label="管理员" value="管理员" />
            <el-option label="wwww" value="beijing" />
          </el-select>
          <el-form-item label="部门介绍">
            <el-input
              v-model=" form.introduce"
              type="textarea"
              autosize
              placeholder="请输入内容"
            />
          </el-form-item>
        </el-form-item>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button @click="adddepartVisible = false">取 消</el-button>
        <el-button type="primary" @click="addtrree">确 定</el-button>
      </div>
    </el-dialog>

    <!-- 修改部门 -->
    <el-dialog
      :title=" '修改部门'"
      :visible.sync="edtpartVisible"
      :before-close="handleClose"
    >
      <el-form :model="putform">
        <el-form-item label="部门名称">
          <el-input v-model="putform.name" autocomplete="off" />
        </el-form-item>

        <el-form-item label="部门编码">
          <el-input v-model="putform.code" autocomplete="off" />
        </el-form-item>

        <el-form-item label="部门负责人">

          <el-select v-model="putform.manager" placeholder="请选择部门负责人">
            <el-option label="管理员" value="管理员" />
            <el-option label="wwww" value="beijing" />
          </el-select>
          <el-form-item label="部门介绍">
            <el-input
              v-model=" putform.introduce"
              type="textarea"
              autosize
              placeholder="请输入内容"
            />
          </el-form-item>
        </el-form-item>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button @click="edtpartVisible = false">取 消</el-button>
        <el-button type="primary" @click="putrree">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { deletepart, addpart, editpart } from '@/api/departments'
export default {
  props: {
    treeAll: {
      type: Object,
      required: true
    },
    isroot: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      dialogVisible: false,
      adddepartVisible: false,
      edtpartVisible: false,
      // /from\
      form: {
        name: '',
        // 编码
        code: '',

        // 负责人
        manager: '',
        // 介绍
        introduce: '',
        pid: this.treeAll.id
      },
      // 编辑表单
      putform: {
        name: this.treeAll.name,
        // 编码
        code: this.treeAll.code,

        // 负责人
        manager: this.treeAll.manager,
        // 介绍
        introduce: this.treeAll.introduce,
        pid: this.treeAll.id
      }
    }
  },
  computed: {
    isshow() {
      return this.dialogVisible ? this.dialogVisible : this.edtpartVisible
    }

  },
  methods: {
    // 点击删除
    async removetrree() {
      const { success } = await deletepart(this.treeAll.id)
      if (success) {
        this.dialogVisible = false
        this.$emit('delDepts')
        this.$message({
          message: '删除成功',
          type: 'success'
        })
      }
    },
    change(command) {
      console.log(command)
      if (command === 'add') {
        this.adddepartVisible = true
      } else if (command === 'put') {
        this.edtpartVisible = true
      } else if (command === 'delete') {
        this.dialogVisible = true
      }
    },
    // 确认删除
    handleClose(done) {
      this.$confirm('确认删除？')
        .then((_) => {
          done()
        })
        .catch((_) => {})
    },
    // 添加部门
    async addtrree() {
      const { success } = await addpart(this.form)
      if (success) {
        this.adddepartVisible = false
        this.$emit('delDepts')
        this.$message({
          message: '添加成功',
          type: 'success'
        })
      }
    },
    async putrree() {
      const { success } = await editpart(this.putform)
      console.log(success)
      if (success) {
        this.edtpartVisible = false
        this.$emit('delDepts')
        this.$message({
          message: '修改成功',
          type: 'success'
        })
      }
    }
  }
}
</script>

<style long="scss">
/* .el-tree-node__content{
    display: flex;

    width: 100%;
    height: 40px
} */
.right {
  margin-right: 26px;
}
.row {
  display: flex;
  justify-content: end;
}
</style>
