<template>
  <div class="app-container">
    <!--搜索框-->
    <div class="filter-container" style="margin-bottom: 30px;">
      菜品名
      <el-input v-model="listForm.name" placeholder="菜品名" style="width: 200px;margin-right: 30px;" class="filter-item" />
      价格
      <el-input v-model="listForm.minPrice" placeholder="最低价格" style="width: 200px;" class="filter-item" />
      -
      <el-input v-model="listForm.maxPrice" placeholder="最高价格" style="width: 200px;margin-right: 30px;" class="filter-item" />
      分类
      <el-select v-model="listForm.type" placeholder="分类" clearable style="width: 90px;margin-right: 30px;" class="filter-item">
        <el-option v-for="item in typeList" :key="item" :label="item.name" :value="item.number" />
      </el-select>
      <el-button v-waves class="filter-item" type="primary" icon="el-icon-search" @click="fetchData">
        搜索
      </el-button>
      <el-button class="filter-item" style="margin-left: 10px;" type="primary" icon="el-icon-edit" @click="handleCreate">
        添加
      </el-button>
    </div>
    <!--菜品列表-->
    <el-table
      v-loading="listLoading"
      :data="list"
      element-loading-text="Loading"
      border
      fit
      highlight-current-row
    >
      <el-table-column align="center" label="图片" width="95">
        <template slot-scope="scope">
          <el-avatar shape="square" size="large" :src="scope.row.pic"></el-avatar>
        </template>
      </el-table-column>
      <el-table-column label="菜品名">
        <template slot-scope="scope">
          {{ scope.row.name }}
        </template>
      </el-table-column>
      <el-table-column label="价格" width="110" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.price }}</span>
        </template>
      </el-table-column>
      <el-table-column label="简介">
        <template slot-scope="scope">
          {{ scope.row.intro }}
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" width="230" class-name="small-padding fixed-width">
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
      <span>您确认要删除当前菜品吗？</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleDelete2">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { getDishes, deleteDish } from '@/api/dish'
import { getTypes } from '@/api/type'
import Pagination from '@/components/Pagination' // secondary package based on el-pagination

export default {
  components: { Pagination },
  data() {
    return {
      // 菜品列表
      list: null,
      // 是否开启延迟效果
      listLoading: true,
      listForm: {
        name: null,
        minPrice: null,
        maxPrice: null,
        type: null,
        pageNum: 1,
        pageSize: 10
      },
      typeList: [],
      listQuery: {
        page: 1,
        limit: 20,
        importance: undefined,
        title: undefined,
        type: undefined,
        sort: '+id'
      },
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
      getDishes(this.listForm).then(response => {
        this.list = response.data.list
        this.total = response.data.totalNum
        this.listLoading = false
      })
      getTypes({ pageNum: 1, pageSize: 20 }).then(response => {
        this.typeList = response.data.list
      })
    },
    // 跳转到编辑页
    handleUpdate(id) {
      this.$router.push('/dish/edit/' + id)
    },
    handleCreate() {
      this.$router.push('/dish/add')
    },
    handleDelete1(id) {
      this.deleteId = []
      this.deleteId.push(id)
      this.dialogVisible = true
    },
    handleDelete2() {
      deleteDish(this.deleteId).then(response => {
        this.dialogVisible = false
        this.$message({
          message: response.message
        })
        // 更新菜品列表
        this.fetchData()
      })
    }
  }
}
</script>
