<template>
  <div class="app-container">
    <!--搜索框-->
    <div class="filter-container" style="margin-bottom: 30px;">
      分类名
      <el-input v-model="listForm.name" style="width: 200px;margin-right: 30px;" class="filter-item" />
      <el-button v-waves class="filter-item" type="primary" icon="el-icon-search" @click="fetchData">
        搜索
      </el-button>
      <el-button class="filter-item" style="margin-left: 10px;" type="primary" icon="el-icon-edit" @click="handleCreate">
        添加
      </el-button>
    </div>
    <!--列表-->
    <el-table
      v-loading="listLoading"
      :data="list"
      style="width: 70%;"
      element-loading-text="Loading"
      border
      fit
      highlight-current-row
    >
      <el-table-column label="分类名" align="center">
        <template slot-scope="scope">
          {{ scope.row.name }}
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" @click="handleUpdate(scope.row)">
            编辑
          </el-button>
          <el-button size="mini" type="danger" @click="handleDelete1(scope.row.id)">
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <!--分页-->
    <pagination v-show="total>0" :total="total" :page.sync="listForm.pageNum" :limit.sync="listForm.pageSize" @pagination="fetchData" />
    <!--新建或编辑对话框-->
    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">
      <el-form :rules="rules" :model="temp" label-position="left" label-width="70px" style="width: 400px; margin-left:50px;">
        <el-form-item label="分类名" prop="name">
          <el-input v-model="temp.name" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">
          取消
        </el-button>
        <el-button type="primary" @click="dialogStatus==='create'?createData():updateData()">
          确认
        </el-button>
      </div>
    </el-dialog>
      <!--删除对话框-->
    <el-dialog
      title="提示"
      :visible.sync="dialogVisible"
      width="30%">
      <span>您确认要删除当前菜品吗？</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleDelete2">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { getTypes, addType, updateType, deleteType } from '@/api/type'
import Pagination from '@/components/Pagination' // secondary package based on el-pagination

export default {
  components: { Pagination },
  data() {
    return {
      // 分类列表
      list: null,
      // 是否开启延迟效果
      listLoading: true,
      listForm: {
        name: null,
        pageNum: 1,
        pageSize: 10
      },
      typeList: [],
      dialogVisible: false,
      deleteId: null,
      total: 0,
      dialogFormVisible: false,
      dialogStatus: '',
      textMap: {
        update: '编辑',
        create: '新建'
      },
      temp: {
        id: null,
        name: ''
      }
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    // 获取列表
    fetchData() {
      this.listLoading = true
      getTypes(this.listForm).then(response => {
        this.list = response.data.list
        this.total = response.data.totalNum
        this.listLoading = false
      })
    },
    // 打开对话框
    handleUpdate(row) {
      this.temp = Object.assign({}, row) // copy obj
      this.dialogStatus = 'update'
      this.dialogFormVisible = true
    },
    handleCreate() {
      this.resetTemp()
      this.dialogStatus = 'create'
      this.dialogFormVisible = true
    },
    handleDelete1(id) {
      this.deleteId = id
      this.dialogVisible = true
    },
    handleDelete2() {
      deleteType(this.deleteId).then(response => {
        this.dialogVisible = false
        this.$message({
          message: response.message
        })
        // 更新列表
        this.fetchData()
      })
    },
    resetTemp() {
      this.temp = {
        id: null,
        name: ''
      }
    },
    createData() {
      addType(this.temp).then(() => {
        this.fetchData()
        this.dialogFormVisible = false
        this.$notify({
          title: '成功',
          message: '创建成功！',
          type: 'success',
          duration: 2000
        })
      })
    },
    updateData() {
      updateType(this.temp).then(() => {
        const index = this.list.findIndex(v => v.id === this.temp.id)
        this.list.splice(index, 1, this.temp)
        this.dialogFormVisible = false
        this.$notify({
          title: '成功',
          message: '更新成功！',
          type: 'success',
          duration: 2000
        })
      })
    }
  }
}
</script>
