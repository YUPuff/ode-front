<template>
  <div>
    <el-row :gutter="10" style="margin-bottom: 40px;">
      <el-col :span="6" style="margin: 30px;">
        <el-card>
          <div class="title">员工总数</div>
          <div class="number">
            100
          </div>
        </el-card>
      </el-col>
      <el-col :span="6" style="margin: 30px;">
        <el-card>
          <div class="title">本周订单数</div>
          <div class="number">
            <div style="margin-right: 20px;">100</div>
            <img src="https://bpic.51yuansu.com/pic2/cover/00/52/89/5816d964517c0_610.jpg" class="pic"/>
            <div class="number_compare">较上周</div>
          </div>
        </el-card>
      </el-col>
      <el-col :span="6" style="margin: 30px;">
        <el-card>
          <div class="title">本周营业额</div>
          <div class="number">
            <div style="margin-right: 20px;">100</div>
            <img src="https://bpic.51yuansu.com/pic2/cover/00/52/89/5816d964517c0_610.jpg" class="pic"/>
            <div class="number_compare">较上周</div>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>
<script>

export default {
  data() {
    return {
      order: 0
    }
  },
  created() {
    this.initData()
  },
  methods: {
    initData() {}
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
    font-size: xx-large;
    margin-bottom: 30px;
  }
  .pic{
    width: 20px;
    height: 20px;
  }
</style>

