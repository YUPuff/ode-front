<template>
  <div class="app-container">
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
    
      <el-table-column align="center" label="操作" width="200">
        <template slot-scope="scope">
          {{ scope.row.id }}
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { getDishes } from '@/api/dish'

export default {
  data() {
    return {
      list: null,   // 菜品列表
      listLoading: true,  // 是否开启延迟效果
      listForm: {
        name: null,
        minPrice: null,
        maxPrice: null,
        type: null,
        pageNum: 1,
        pageSize: 10
      }
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      this.listLoading = true
      
      getDishes(this.listForm).then(response => {
        console.log(response);
        this.list = response.data.list
        this.listLoading = false
      })
    }
  }
}
</script>
