<template>
  <div class="app-container">
    <!--搜索框-->
    <div class="filter-container" style="margin-bottom: 30px;">
      <span style="width: 200px;margin-right: 30px;margin-bottom: 50px;">订单号：
        <span style="font-weight: bold;font-size: large;">{{ order.id }}</span>
      </span>
      <span style="width: 200px;margin-right: 30px;margin-bottom: 50px;">桌号：
        <span style="font-weight: bold;font-size: large;">{{ order.tableId }}</span>
      </span>
      <span style="width: 200px;margin-right: 30px;margin-bottom: 50px;">下单用户：
        <span style="font-weight: bold;font-size: large;">{{ order.name }}</span>
      </span>
      <span style="width: 200px;margin-right: 30px;margin-top: 30px;">总金额：
        <span style="font-weight: bold;font-size: large;">{{ order.total }}</span>
      </span>
      <span style="width: 200px;margin-right: 30px;margin-bottom: 30px;">就餐人数：
        <span v-if="order.people != null" style="font-weight: bold;font-size: large;">{{ order.people }}</span>
        <span v-else style="font-weight: bold;font-size: large;">未填写</span>
      </span>
      <span style="width: 200px;margin-right: 30px;margin-bottom: 30px;">订单备注：
        <span v-if="order.remark != null" style="font-weight: bold;font-size: large;">{{ order.remark }}</span>
        <span v-else style="font-weight: bold;font-size: large;">暂无</span>
      </span>
      <span style="width: 200px;margin-right: 30px;margin-bottom: 30px;">创建时间：
        <span style="font-weight: bold;font-size: large;">{{ order.addTime | dateFormat }}</span>
      </span>
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
      <el-table-column label="菜品名">
        <template slot-scope="scope">
          {{ scope.row.name }}
        </template>
      </el-table-column>
      <el-table-column label="价格">
        <template slot-scope="scope">
          {{ scope.row.price }}
        </template>
      </el-table-column>
      <el-table-column label="数量">
        <template slot-scope="scope">
          {{ scope.row.amount }}
        </template>
      </el-table-column>
      <el-table-column label="菜品状态" width="110" align="center">
        <template slot-scope="scope">
          <el-tag :type="scope.row.status | statusTypeFilter">
            {{ scope.row.status | dishStatusFilter }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" width="300" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" @click="handleUpdate(scope.row.dishId)">
            查看菜品详情
          </el-button>
          <el-button v-if="scope.row.status == 0" size="mini" type="danger" @click="handleDelete1(scope.row.id)">
            取消菜品
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <!--分页-->
    <pagination v-show="total>0" :total="total" :page.sync="pageNum" :limit.sync="pageSize" @pagination="fetchData" />
    <!--删除对话框-->
    <el-dialog
      title="提示"
      :visible.sync="dialogVisible"
      width="30%">
      <span>您确认要取消当前菜品吗？</span>
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
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import { getOrderById } from '@/api/order'
import { cancelDish, getDishById } from '@/api/dish'
import Pagination from '@/components/Pagination' // secondary package based on el-pagination

export default {
  components: { Pagination },
  filters: {
    statusTypeFilter(status) {
      const statusMap = {
        0: 'danger',
        1: 'warning',
        2: '',
        3: 'success',
        4: 'info'
      }
      return statusMap[status]
    },
    dishStatusFilter(status) {
      const statusMap = {
        0: '未烹饪',
        1: '烹饪中',
        2: '待上菜',
        3: '已完成',
        4: '已取消'
      }
      return statusMap[status]
    },
    orderStatusFilter(status) {
      const statusMap = {
        0: '未开始',
        1: '进行中',
        2: '待评价',
        3: '已完成',
        4: '已取消'
      }
      return statusMap[status]
    }
  },
  data() {
    return {
      // 列表
      list: null,
      // 是否开启延迟效果
      listLoading: true,
      order: {
        id: null,
        name: null,
        tableId: null,
        status: null,
        total: '',
        remark: '',
        people: '',
        addDate: null
      },
      pageNum: 1,
      pageSize: 10,
      dialogVisible: false,
      deleteId: null,
      total: 0,
      dialogFormVisible: false,
      temp: {}
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    // 获取列表
    fetchData() {
      var id = this.$route.params.id
      getOrderById({ id: id, pageNum: this.pageNum, pageSize: this.pageSize }).then(response => {
        this.order = response.data
        this.list = response.data.dishes.list
        this.pageNum = response.data.dishes.pageNum
        this.pageSize = response.data.dishes.pageSize
        this.total = response.data.dishes.totalNum
        this.listLoading = false
      })
    },
    // 打开详情
    handleUpdate(id) {
      getDishById(id).then(response => {
        this.temp = response.data
        console.log(this.temp)
        this.dialogFormVisible = true
      })
    },
    handleDelete1(id) {
      this.deleteId = id
      this.dialogVisible = true
    },
    handleDelete2() {
      cancelDish(this.deleteId).then(response => {
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
