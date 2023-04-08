<template>
  <div>
    <div class="charts">
      <div id="order" class="charts_item" />
      <div id="total" class="charts_item" />
    </div>
    <div>
      <el-row :gutter="10" style="margin-bottom: 40px;">
        <el-col :span="5" style="margin: 20px;">
          <el-card>
            <div class="title">员工总数</div>
            <div class="number">
              {{ admin }}
            </div>
          </el-card>
        </el-col>
        <el-col :span="5" style="margin: 20px;">
          <el-card>
            <div class="title">本周订单数</div>
            <div class="number">
              <div style="margin-right: 20px;">{{ order }}</div>
              <img v-if="order > lastOrder" src="../../image/up.png" class="pic">
              <img v-else-if="order == lastOrder" src="../../image/same.png" class="pic">
              <img v-else src="../../image/down.png" class="pic">
              <div class="number_compare">较上周</div>
            </div>
          </el-card>
        </el-col>
        <el-col :span="5" style="margin: 20px;">
          <el-card>
            <div class="title">本周营业额</div>
            <div class="number">
              <div style="margin-right: 20px;">{{ total }}</div>
              <img v-if="total > lastTotal" src="../../image/up.png" class="pic">
              <img v-else-if="total == lastTotal" src="../../image/same.png" class="pic">
              <img v-else src="../../image/down.png" class="pic">
              <div class="number_compare">较上周</div>
            </div>
          </el-card>
        </el-col>
        <el-col :span="6" style="margin: 20px;">
          <el-card>
            <div class="title" style="font-size: xx-large;color: red;">当月热销菜品</div>
            <el-collapse v-model="list" :data="list">
              <div v-for="(value, key) in list">
                <el-collapse-item :title="value.name">
                  <div><el-avatar shape="square" size="large" :src="value.pic"></el-avatar></div>
                  <div>价格：{{ value.price }}</div>
                  <div>简介：{{ value.intro }}</div>
                </el-collapse-item>
              </div>
              <!-- <el-collapse-item title="123" name="1">
                  <div>与现实生活一致：与现实生活的流程、逻辑保持一致，遵循用户习惯的语言和概念；</div>
                  <div>在界面中一致：所有的元素和结构需保持一致，比如：设计样式、图标和文本、元素的位置等。</div>
                </el-collapse-item> -->
            </el-collapse>
          </el-card>
        </el-col>
      </el-row>
    </div>
  </div>
</template>
<script>
import { getStatistics } from '@/api/admin'
import { getHotDishes } from '@/api/order'
import * as echarts from 'echarts'

export default {
  data() {
    return {
      order: 0,
      lastOrder: 0,
      admin: 0,
      total: 0,
      lastTotal: 0,
      orderList: [],
      totalList: [],
      monthList: [],
      list: []
    }
  },
  created() {
    this.initData()
  },
  methods: {
    initData() {
      getStatistics().then(res => {
        this.admin = res.data['admin']
        this.order = res.data['order']
        this.lastOrder = res.data['lastOrder']
        this.total = res.data['total']
        this.lastTotal = res.data['lastTotal']
        var map = res.otherData['12Data']
        this.orderList = map['order']
        this.totalList = map['total']
        for (let i = 1; i <= 12; i++) {
          this.monthList.push(i + '月')
        }
        var orderChart = echarts.init(document.getElementById('order'))
        var totalChart = echarts.init(document.getElementById('total'))
        // 绘制图表
        orderChart.setOption({
          title: {
            text: '年度订单统计',
            left: 'center'
          },
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'shadow'
            }
          },
          grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
          },
          xAxis: {
            type: 'category',
            data: this.monthList,
            axisTick: {
              alignWithLabel: true
            }
          },
          yAxis: {
            type: 'value'
          },
          series: [
            {
              data: this.orderList,
              type: 'bar',
              barWidth: '60%'
            }
          ]
        })
        totalChart.setOption({
          title: {
            text: '年度营业额统计',
            left: 'center'
          },
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              type: 'shadow'
            }
          },
          grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
          },
          xAxis: {
            type: 'category',
            data: this.monthList,
            axisTick: {
              alignWithLabel: true
            }
          },
          yAxis: {
            type: 'value'
          },
          series: [
            {
              data: this.totalList,
              type: 'bar',
              barWidth: '60%'
            }
          ]
        })
      })
      getHotDishes().then(res => {
        this.list = res.data
      })
    },
    collopseChanged(){
      console.log("he")
    }
  }
}
</script>
<style scoped>
  .number{
    padding: 10px 0;
    text-align: center;
    font-weight: bold;
    font-size: larger;
    display: flex;
    justify-content: center;
  }
  .number_compare{
    font-size: x-small;
    text-align: center;
    margin-left: 5px;
  }
  .title{
    color: #E6A23C;
    text-align: center;
    font-size: x-large;
    margin-bottom: 30px;
  }
  .pic{
    width: 20px;
    height: 20px;
  }
  .charts{
    display: flex;
    justify-content: center;
  }
  .charts_item{
    width: 600px;
    height: 400px;
    margin: 50px;
  }
</style>

