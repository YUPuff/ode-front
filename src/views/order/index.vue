<template>
  <div class="app-container">
    <!--搜索框-->
    <div class="filter-container" style="margin-bottom: 30px;">
      订单号
      <el-input v-model="listForm.id" placeholder="请输入" style="width: 200px;margin-right: 30px;margin-bottom: 30px;" class="filter-item" />
      桌号
      <el-select v-model="listForm.tableId" placeholder="全部" clearable style="width: 90px;margin-right: 30px;margin-bottom: 30px;" class="filter-item">
        <el-option v-for="item in 10" :key="item" :label="item" :value="item" />
      </el-select>
      订单状态
      <el-select v-model="listForm.status" placeholder="全部" clearable style="width: 90px;margin-right: 30px;margin-bottom: 30px;" class="filter-item">
        <el-option v-for="item in statusList" :key="item" :label="item.name" :value="item.id" />
      </el-select>
      <br>
      订单金额
      <el-input v-model="listForm.minTotal" placeholder="最低金额" style="width: 200px;" class="filter-item" />
      -
      <el-input v-model="listForm.maxTotal" placeholder="最高金额" style="width: 200px;margin-right: 30px;" class="filter-item" />
      起止时间
      <el-date-picker
        v-model="listForm.start"
        value-format="MM/dd/yyyy HH:mm:ss"
        type="datetime"
        placeholder="起始时间"
        align="right"
        :picker-options="pickerOptions"/>
      -
      <el-date-picker
        v-model="listForm.end"
        value-format="MM/dd/yyyy HH:mm:ss"
        type="datetime"
        placeholder="结束时间"
        align="right"
        :picker-options="pickerOptions"/>
      <el-button v-waves class="filter-item" type="primary" icon="el-icon-search" @click="fetchData" style="margin-left: 30px;">
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
      <el-table-column label="订单号">
        <template slot-scope="scope">
          {{ scope.row.id }}
        </template>
      </el-table-column>
      <el-table-column label="桌号">
        <template slot-scope="scope">
          {{ scope.row.tableId }}
        </template>
      </el-table-column>
      <el-table-column label="订单状态" width="110" align="center">
        <template slot-scope="scope">
          <el-tag :type="scope.row.status | statusTypeFilter">
            {{ scope.row.status | statusFilter }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column label="总金额">
        <template slot-scope="scope">
          {{ scope.row.total }}
        </template>
      </el-table-column>
      <el-table-column label="创建时间">
        <template slot-scope="scope">
          <span>{{ scope.row.addTime | dateFormat }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center" width="300" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" @click="handleUpdate(scope.row.id)">
            查看详情
          </el-button>
          <el-button v-if="scope.row.status == 0" size="mini" type="danger" @click="handleDelete1(scope.row.id)">
            取消
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
      <span>您确认要取消当前订单吗？</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleDelete2">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { getOrders, cancelOrder } from '@/api/order'
import Pagination from '@/components/Pagination' // secondary package based on el-pagination
import { isNumber, isNotSeq } from '@/utils/validate'

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
    statusFilter(status) {
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
      listForm: {
        id: null,
        tableId: null,
        status: null,
        minTotal: '',
        maxTotal: '',
        start: null,
        end: null,
        pageNum: 1,
        pageSize: 10
      },
      statusList: [
        { id: 0, name: '未开始' },
        { id: 1, name: '进行中' },
        { id: 2, name: '待评价' },
        { id: 3, name: '已完成' },
        { id: 4, name: '已取消' }],
      dialogVisible: false,
      deleteId: null,
      total: 0
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    // 获取列表
    fetchData() {
      this.listLoading = true
      var minT = this.listForm.minTotal
      var maxT = this.listForm.maxTotal
      var minD = this.listForm.start
      var maxD = this.listForm.end
      if (isNumber(minT) && isNumber(maxT)) {
        if (isNotSeq(minT, maxT)) {
          this.$message.error('最高金额不能低于最低金额')
        } else {
          if (isNotSeq(minD, maxD)) {
            this.$message.error('结束时间不能早于起始时间')
          } else {
            getOrders(this.listForm).then(response => {
              this.list = response.data.list
              this.total = response.data.totalNum
              this.listLoading = false
            })
          }
        }
      } else {
        this.$message.error('金额只能是数字')
      }
    },
    // 跳转到详情页
    handleUpdate(id) {
      this.$router.push('/order/detail/' + id)
    },
    handleDelete1(id) {
      this.deleteId = id
      this.dialogVisible = true
    },
    handleDelete2() {
      cancelOrder(this.deleteId).then(response => {
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
