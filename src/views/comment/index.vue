<template>
  <!--为echarts准备一个容器dom-->
  <div>
    <div id="myChart" style="width: 100%;height: 300px;" />
  </div>
</template>
<script>
import * as echarts from 'echarts'
import { getEntireComment } from '@/api/comment'

export default {
  name: '',
  data() {
    return {
      pageNum: 1,
      pageSize: 10,
      service: null,
      environment: null,
      list: [],
      requested: false
    }
  },
  created() {
    this.initData()
  },
  methods: {
    // 初始化饼状图数据
    initData() {
      console.log('初始化评论')
      this.requested = true
      // eslint-disable-next-line no-undef
      getEntireComment({ pageNum: this.pageNum, pageSize: this.pageSize }).then((res) => {
        var getData = []
        this.service = res.data['service']
        this.environment = res.data['environment']
        getData[0] = { name: '好', value: this.service['good'] }
        getData[1] = { name: '中', value: this.service['mid'] }
        getData[2] = { name: '差', value: this.service['bad'] }
        // for (let i = 0; i < res.data.length; i++) {
        //   // eslint-disable-next-line no-new-object
        //   var obj = new Object()
        //   obj.name = res.data[i].answer// 回答调查问卷的答案
        //   obj.value = res.data[i].sum// 回答调查问卷的人数
        //   getData[i] = obj
        // }
        // 基于准备好的dom，初始化echarts实例
        var myChart = echarts.init(document.getElementById('myChart'))
        // 绘制图表
        myChart.setOption({
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
            data: getData
          },
          series: [
            {
              name: '选项内容',
              type: 'pie',
              radius: '55%',
              center: ['50%', '50%'], // 位置
              data: getData,
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
    }
  }
}
</script>
