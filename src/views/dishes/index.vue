<template>
  <div class="app-container">
    <!--搜索框-->
    <div class="filter-container" style="margin-bottom: 30px;">
      菜品名
      <el-input v-model="listForm.name" style="width: 200px;margin-right: 30px;" class="filter-item" />
      价格
      <el-input v-model="listForm.minPrice" placeholder="最低价格" style="width: 200px;" class="filter-item" />
      -
      <el-input v-model="listForm.maxPrice" placeholder="最高价格" style="width: 200px;margin-right: 30px;" class="filter-item" />
      分类
      <el-select v-model="listForm.type" placeholder="全部" clearable style="width: 90px;margin-right: 30px;" class="filter-item">
        <el-option v-for="item in typeList" :key="item" :label="item.name" :value="item.id" />
      </el-select>
      <el-button v-waves class="filter-item" type="primary" icon="el-icon-search" @click="fetchData">
        搜索
      </el-button>
      <el-button v-if="role === 0" class="filter-item" style="margin-left: 10px;" type="primary" icon="el-icon-edit" @click="handleCreate">
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
          <el-button type="primary" size="mini" @click="seeDetail(scope.row.id)">查看</el-button>
          <el-button v-if="role === 0" type="warning" size="mini" @click="handleUpdate(scope.row.id)">
            编辑
          </el-button>
          <el-button v-if="role === 0" size="mini" type="danger" @click="handleDelete1(scope.row.id)">
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
    <!--查看详情对话框-->
    <el-dialog :visible.sync="dialogFormVisible">
      <el-form :model="temp" label-position="left" label-width="70px" style="width: 400px; margin-left:50px;">
        <el-form-item label="图片" prop="pic">
          <el-image
            style="width: 100px; height: 100px"
            :src="temp.pic"
            fit="fill"/>
        </el-form-item>
        <el-form-item label="菜品名" prop="name">
          {{temp.name}}
        </el-form-item>
        <el-form-item label="价格" prop="name">
          {{temp.price}}
        </el-form-item>
        <el-form-item label="简介" prop="name">
          {{temp.intro}}
        </el-form-item>
        <el-form-item label="详细介绍" prop="name">
          {{temp.detail}}
        </el-form-item>
        <el-form-item label="评价情况">
          <el-tag type="success" style="margin-right: 30px;font-size: large;">好：{{ temp.good }}</el-tag>
          <el-tag type="info" style="margin-right: 30px;font-size: large;">中：{{ temp.mid }}</el-tag>
          <el-tag type="danger" style="font-size: large;">差：{{ temp.bad }}</el-tag>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import { getDishes, deleteDish, getDishById } from '@/api/dish'
import { getTypes } from '@/api/type'
import Pagination from '@/components/Pagination' // secondary package based on el-pagination
import { isNumber, isNotSeq } from '@/utils/validate'
import { mapGetters } from 'vuex'

export default {
  components: { Pagination },
  computed: {
    ...mapGetters([
      'role'
    ])
  },
  data() {
    return {
      // 菜品列表
      list: null,
      // 是否开启延迟效果
      listLoading: true,
      listForm: {
        name: null,
        minPrice: '',
        maxPrice: '',
        type: null,
        pageNum: 1,
        pageSize: 10
      },
      typeList: [],
      dialogVisible: false,
      deleteId: [],
      total: 0,
      dialogFormVisible: false,
      temp: {}
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    // 获取菜品列表
    fetchData() {
      this.listLoading = true
      var min = this.listForm.minPrice
      var max = this.listForm.maxPrice
      if (isNumber(min) && isNumber(max)) {
        if (!isNotSeq(min, max)) {
          getDishes(this.listForm).then(response => {
            this.list = response.data.list
            this.total = response.data.totalNum
            this.listLoading = false
          })
          getTypes({ pageNum: 1, pageSize: 20 }).then(response => {
            this.typeList = response.data.list
          })
        } else {
          this.$message.error('最高价格不能低于最低价格')
        }
      } else {
        this.$message.error('价格只能是数字')
      }
    },
    seeDetail(id) {
      getDishById(id).then(response => {
        this.temp = response.data
        this.temp.good = this.temp.comments.good
        this.temp.mid = this.temp.comments.mid
        this.temp.bad = this.temp.comments.bad
        this.dialogFormVisible = true
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
