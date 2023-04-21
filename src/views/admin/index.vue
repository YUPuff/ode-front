<template>
  <div class="app-container">
    <!--搜索框-->
    <div class="filter-container" style="margin-bottom: 30px;">
      用户名
      <el-input v-model="listForm.name" placeholder="请输入" style="width: 200px;margin-right: 30px;" class="filter-item" />
      角色
      <el-select v-model="listForm.role" placeholder="全部" clearable style="width: 90px;margin-right: 30px;" class="filter-item">
        <el-option v-for="item in roleList" :key="item" :label="item.name" :value="item.id" />
      </el-select>
      是否生效
      <el-select v-model="listForm.isVal" placeholder="全部" clearable style="width: 90px;margin-right: 30px;" class="filter-item">
        <el-option v-for="item in binList" :key="item" :label="item.name" :value="item.id" />
      </el-select>
      是否锁定
      <el-select v-model="listForm.isLock" placeholder="全部" clearable style="width: 90px;margin-right: 30px;" class="filter-item">
        <el-option v-for="item in binList" :key="item" :label="item.name" :value="item.id" />
      </el-select>
      <el-button v-waves class="filter-item" type="primary" icon="el-icon-search" @click="fetchData">
        搜索
      </el-button>
    </div>
    <!--列表-->
    <el-table
      v-loading="listLoading"
      :data="list"
      element-loading-text="Loading"
      border
      fit
      highlight-current-row
    >
      <el-table-column align="center" label="头像" width="95">
        <template slot-scope="scope">
          <el-avatar shape="square" size="large" :src="scope.row.pic"></el-avatar>
        </template>
      </el-table-column>
      <el-table-column label="用户名">
        <template slot-scope="scope">
          {{ scope.row.name }}
        </template>
      </el-table-column>
      <el-table-column label="角色" width="110" align="center">
        <template slot-scope="scope">
          <el-tag v-if="scope.row.role != null" :type="scope.row.role | statusFilter">
            {{ scope.row.role | roleFilter }}
          </el-tag>
          <el-tag v-else type="info">
            待审核
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column label="是否生效">
        <template slot-scope="scope">
          <el-tag :type="scope.row.isVal | valFilter">
            {{ scope.row.isVal | binFilter }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column label="是否锁定">
        <template slot-scope="scope">
          <el-tag :type="scope.row.isLock | lockFilter">
            {{ scope.row.isLock | binFilter }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" width="300" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" @click="handleUpdate(scope.row.id)">
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
    <!--对话框-->
    <el-dialog
      title="提示"
      :visible.sync="dialogVisible"
      width="30%">
      <span>您确认要删除当前用户吗？</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleDelete2">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { getAdmins, deleteAdmin } from '@/api/admin'
import Pagination from '@/components/Pagination' // secondary package based on el-pagination

export default {
  components: { Pagination },
  filters: {
    statusFilter(status) {
      const statusMap = {
        0: 'warning',
        1: null,
        2: null
      }
      return statusMap[status]
    },
    valFilter(status) {
      const statusMap = {
        0: 'danger',
        1: 'success'
      }
      return statusMap[status]
    },
    lockFilter(status) {
      const statusMap = {
        0: 'success',
        1: 'danger'
      }
      return statusMap[status]
    },
    roleFilter(role) {
      const roleMap = {
        0: '管理员',
        1: '服务员',
        2: '后厨'
      }
      return roleMap[role]
    },
    binFilter(bin) {
      const binMap = {
        0: '否',
        1: '是'
      }
      return binMap[bin]
    }
  },
  data() {
    return {
      // 菜品列表
      list: null,
      // 是否开启延迟效果
      listLoading: true,
      listForm: {
        name: null,
        role: null,
        isLock: null,
        isVal: null,
        pageNum: 1,
        pageSize: 10
      },
      roleList: [{ id: 0, name: '管理员' }, { id: 1, name: '服务员' }, { id: 2, name: '后厨' }],
      binList: [{ id: 0, name: '否' }, { id: 1, name: '是' }],
      dialogVisible: false,
      deleteId: [],
      total: 0
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    // 获取菜品列表
    fetchData() {
      this.listLoading = true
      getAdmins(this.listForm).then(response => {
        this.list = response.data.list
        this.total = response.data.totalNum
        this.listLoading = false
      })
    },
    // 跳转到编辑页
    handleUpdate(id) {
      this.$router.push('/admin/edit/' + id)
    },
    handleDelete1(id) {
      this.deleteId = []
      this.deleteId.push(id)
      this.dialogVisible = true
    },
    handleDelete2() {
      deleteAdmin(this.deleteId).then(response => {
        this.dialogVisible = false
        this.$message({
          message: response.message
        })
        // 更新列表
        this.fetchData()
      })
    }
  }
}
</script>
