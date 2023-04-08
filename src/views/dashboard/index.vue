<template>
  <div class="dashboard-container">
    <div class="dashboard-text">欢迎您: {{ name }}</div>
    <el-row :gutter="20" style="margin-bottom: 40px;">
      <el-col :span="8" style="margin: 20px;">
        <el-card>
          <div style="display: flex;justify-content: center;"><img src="../../image/day.png" class="day_pic"></div>
          <div style="font-size: x-large;padding: 10px;">ODE系统已经陪您度过了</div>
          <div class="day">
            <div style="font-size: xx-large;font-weight: bold;margin-right: 10px;">{{ day }}</div>
            <div style="font-size: large;">天</div>
          </div>
        </el-card>
      </el-col>
      <el-col :span="10" style="margin: 20px;">
        <el-card>
          <div @click="gotoOrder">
            <div style="display: flex;justify-content: center;"><img src="../../image/order.png" class="day_pic"></div>
            <div class="order">
              <div style="font-size: x-large;padding: 10px;">待处理订单</div>
              <div class="order_number">{{ order }}</div>
            </div>
          </div>
          <div v-if="role === 0" @click="gotoPeople">
            <div style="display: flex;justify-content: center;"><img src="../../image/people.png" class="pic"></div>
            <div class="order">
              <div style="font-size: x-large;padding: 10px;">待审核人员</div>
              <div class="order_number">{{ people }}</div>
            </div>
          </div>
          <!-- <el-empty description="暂无待办" :image-size="200" image="https://img.zcool.cn/community/018331591eb2daa801216a3e734cf5.png@1280w_1l_2o_100sh.png" /> -->
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import { getDays } from '@/api/admin'

export default {
  name: 'Dashboard',
  computed: {
    ...mapGetters([
      'name',
      'id',
      'role'
    ])
  },
  // eslint-disable-next-line vue/order-in-components
  data() {
    return {
      day: 0,
      people: 0,
      order: 0
    }
  },
  mounted() {
    document.querySelector('body').setAttribute('style', 'background-color:#F0FFFF')
  },
  beforeDestroy() {
    document.querySelector('body').removeAttribute('style')
  },
  created() {
    this.initData()
  },
  methods: {
    initData() {
      getDays(this.$store.getters.id).then(res => {
        this.day = res.data['day']
        this.order = res.data['order']
        var role = this.$store.getters.role
        if (role === 0) {
          this.people = res.data['people']
        }
      })
    },
    gotoOrder() {
      this.$router.push('/order/list')
    },
    gotoPeople() {
      this.$router.push('/admin/list')
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
.day{
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 20px;
}
.day_pic{
  width: 300px;
  height: 300px;
}
.pic{
  width: 200px;
  height: 200px;
}
.order{
  text-align: center;
}
.order_number{
  font-size: xx-large;
  font-weight: bold;
  margin-right: 10px;
}
</style>
