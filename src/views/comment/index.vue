<template>
  <!--为echarts准备一个容器dom-->
  <div>
    <!--服务和环境评价图表-->
    <div class="charts">
      <div id="service" class="charts_item" />
      <div id="environment" class="charts_item" />
    </div>
    <!--评价内容列表-->
    <div class="title">评价内容</div>
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
          {{ scope.row.orderId }}
        </template>
      </el-table-column>
      <el-table-column label="评价内容">
        <template slot-scope="scope">
          {{ scope.row.content }}
        </template>
      </el-table-column>
      <el-table-column label="评价时间">
        <template slot-scope="scope">
          <span>{{ scope.row.addTime | dateFormat }}</span>
        </template>
      </el-table-column>
      <!-- <el-table-column label="操作" align="center" width="300" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" @click="handleUpdate(scope.row.id)">
            查看详情
          </el-button>
          <el-button v-if="scope.row.status == 0" size="mini" type="danger" @click="handleDelete1(scope.row.id)">
            取消
          </el-button>
        </template>
      </el-table-column> -->
    </el-table>
    <!--分页-->
    <pagination v-show="total>0" :total="total" :page.sync="pageNum" :limit.sync="pageSize" @pagination="fetchComment" />

  </div>
</template>
<script>
import * as echarts from 'echarts'
import { getSEComment, getCommentDetail } from '@/api/comment'
import Pagination from '@/components/Pagination'

export default {
  name: '',
  components: { Pagination },
  data() {
    return {
      pageNum: 1,
      pageSize: 10,
      total: 0,
      service: null,
      environment: null,
      list: [],
      listLoading: true,
      requested: false
    }
  },
  created() {
    this.initCharts()
    this.fetchComment()
  },
  methods: {
    // 初始化饼状图数据
    initCharts() {
      this.requested = true
      // eslint-disable-next-line no-undef
      getSEComment({ pageNum: this.pageNum, pageSize: this.pageSize }).then((res) => {
        var getService = []
        var getEnvironment = []
        this.service = res.data['service']
        this.environment = res.data['environment']
        getService[0] = { name: '好', value: this.service['good'] }
        getService[1] = { name: '中', value: this.service['mid'] }
        getService[2] = { name: '差', value: this.service['bad'] }
        getEnvironment[0] = { name: '好', value: this.environment['good'] }
        getEnvironment[1] = { name: '中', value: this.environment['mid'] }
        getEnvironment[2] = { name: '差', value: this.environment['bad'] }
        // for (let i = 0; i < res.data.length; i++) {
        //   // eslint-disable-next-line no-new-object
        //   var obj = new Object()
        //   obj.name = res.data[i].answer// 回答调查问卷的答案
        //   obj.value = res.data[i].sum// 回答调查问卷的人数
        //   getData[i] = obj
        // }
        // 基于准备好的dom，初始化echarts实例
        var service = echarts.init(document.getElementById('service'))
        var environment = echarts.init(document.getElementById('environment'))
        // 绘制图表
        service.setOption({
          title: {
            text: '服务评价情况',
            x: 'center'
          },
          tooltip: {
            trigger: 'item',
            formatter: '{a} <br/>{b} : {c} ({d}%)'
          },
          legend: {
            orient: 'vertical',
            bottom: 'bottom',
            data: getService
          },
          series: [
            {
              name: '选项内容',
              type: 'pie',
              radius: '55%',
              center: ['50%', '50%'], // 位置
              label: {
                // echarts饼图内部显示百分比设置
                show: true,
                position: 'inside', // outside 外部显示  inside 内部显示
                formatter: `{d}%`,
                color: '#ffffff', // 颜色
                fontSize: 12 // 字体大小
              },
              data: getService,
              itemStyle: {
                emphasis: {
                  shadowBlur: 10,
                  shadowOffsetX: 0,
                  shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
              }
            }
          ]
        })
        environment.setOption({
          title: {
            text: '环境评价情况',
            x: 'center'
          },
          tooltip: {
            trigger: 'item',
            formatter: '{a} <br/>{b} : {c} ({d}%)'
          },
          legend: {
            orient: 'vertical',
            bottom: 'bottom',
            data: getEnvironment
          },
          series: [
            {
              name: '选项内容',
              type: 'pie',
              radius: '55%',
              center: ['50%', '50%'], // 位置
              label: {
                // echarts饼图内部显示百分比设置
                show: true,
                position: 'inside', // outside 外部显示  inside 内部显示
                formatter: `{d}%`,
                color: '#ffffff', // 颜色
                fontSize: 12 // 字体大小
              },
              data: getEnvironment,
              itemStyle: {
                emphasis: {
                  shadowBlur: 10,
                  shadowOffsetX: 0,
                  shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
              }
            }
          ]
        })
      })
        .finally(() => {
          this.requested = false
        })
    },
    fetchComment() {
      this.listLoading = true
      getCommentDetail({ pageNum: this.pageNum, pageSize: this.pageSize }).then(response => {
        this.list = response.data.list
        this.total = response.data.totalNum
        this.listLoading = false
      })
    }
  }
}
</script>
<style scoped>
  .charts{
    display: flex;
    justify-content: center;
  }
  .charts_item{
    width: 300px;
    height: 300px;
    margin: 50px;
  }
  .title{
    font-size: large;
    font-weight: bold;
    text-align: center;
    margin: 30px;
    color: #4F4F4F;
  }
</style>
