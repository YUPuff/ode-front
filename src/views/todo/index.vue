<template>
  <div class="dashboard-container">
    <WebSocket style="display: none;" v-on:IsRefresh="IsRefresh"></WebSocket>
    <el-row :gutter="20" style="margin-bottom: 40px;display: flex;">
      <el-col :span="8" style="margin: 15px;">
        <el-card>
          <div class="title" style="color:#F56C6C">未烹饪</div>
          <!--列表-->
          <el-table
            v-loading="listLoading"
            :data="list1"
            element-loading-text="Loading"
            border
            fit
            highlight-current-row
          >
            <el-table-column label="桌号">
              <template slot-scope="scope">
                {{ scope.row.tableId }}
              </template>
            </el-table-column>
            <el-table-column label="菜品名">
              <template slot-scope="scope">
                {{ scope.row.name }}
              </template>
            </el-table-column>

            <el-table-column label="数量">
              <template slot-scope="scope">
                {{ scope.row.amount }}
              </template>
            </el-table-column>
            <el-table-column v-if="role != 1" label="操作" align="center" class-name="small-padding fixed-width">
              <template slot-scope="scope">
                <el-button type="danger" size="mini" @click="updateStatus(scope.row.id)">
                  烹饪
                </el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-card>
      </el-col>
      <el-col :span="8" style="margin: 15px;">
        <el-card>
          <div class="title" style="color:#E6A23C">烹饪中</div>
          <!--列表-->
          <el-table
            v-loading="listLoading"
            :data="list2"
            element-loading-text="Loading"
            border
            fit
            highlight-current-row
          >
            <el-table-column label="桌号">
              <template slot-scope="scope">
                {{ scope.row.tableId }}
              </template>
            </el-table-column>
            <el-table-column label="菜品名">
              <template slot-scope="scope">
                {{ scope.row.name }}
              </template>
            </el-table-column>

            <el-table-column label="数量">
              <template slot-scope="scope">
                {{ scope.row.amount }}
              </template>
            </el-table-column>
            <el-table-column v-if="role != 1" label="操作" align="center" class-name="small-padding fixed-width">
              <template slot-scope="scope">
                <el-button type="warning" size="mini" @click="updateStatus(scope.row.id)">
                  结束
                </el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-card>
      </el-col>
      <el-col :span="8" style="margin: 15px;">
        <el-card>
          <div class="title" style="color:#409EFF">待上菜</div>
          <!--列表-->
          <el-table
            v-loading="listLoading"
            :data="list3"
            element-loading-text="Loading"
            border
            fit
            highlight-current-row
          >
            <el-table-column label="桌号">
              <template slot-scope="scope">
                {{ scope.row.tableId }}
              </template>
            </el-table-column>
            <el-table-column label="菜品名">
              <template slot-scope="scope">
                {{ scope.row.name }}
              </template>
            </el-table-column>

            <el-table-column label="数量">
              <template slot-scope="scope">
                {{ scope.row.amount }}
              </template>
            </el-table-column>
            <el-table-column v-if="role != 2" label="操作" align="center" class-name="small-padding fixed-width">
              <template slot-scope="scope">
                <el-button type="primary" size="mini" @click="updateStatus(scope.row.id)">
                  上菜
                </el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import { getToDoDish, updateDishStatus } from '@/api/dish'
import { mapGetters } from 'vuex'
import WebSocket from '@/components/WebSocket'

export default {
  components: {
    WebSocket
  },
  computed: {
    ...mapGetters([
      'role'
    ])
  },
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
    }
  },
  data() {
    return {
      listLoading: false,
      list1: [],
      list2: [],
      list3: []
    }
  },
  created() {
    this.initData()
  },
  methods: {
    IsRefresh(e) {
      var that = this
      if (e === 'new_order') {
        this.$message({
          message: '您有新的订单！'
        })
      } else if (e === 'cancel') {
        this.$message({
          message: '有菜品被取消！'
        })
      }
      setTimeout(function() {
        that.initData()
      }, 2000)
    },
    initData() {
      this.listLoading = true
      getToDoDish().then(res => {
        this.list1 = res.data['waitToCook']
        this.list2 = res.data['cooking']
        this.list3 = res.data['waitToServe']
        this.listLoading = false
      })
    },
    updateStatus(id) {
      updateDishStatus(id).then(() => {
        this.initData()
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
.title{
  font-size: larger;
  font-weight: bold;
  text-align: center;
  margin-bottom: 20px;
}
</style>
