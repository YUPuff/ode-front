<template>
	<div class="board-wrap">
	</div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'WebSocket',
  computed: {
    ...mapGetters([
      'name',
      'role'
    ])
  },
  async mounted() {
    this.wsIsRun = true
    this.wsInit()
  },
  data() {
    return {
      // ws是否启动
      wsIsRun: false,
      // 定义ws对象
      webSocket: null,
      // ws请求链接（类似于ws后台地址）
      ws: '',
      // ws定时器
      wsTimer: null
    }
  },
  methods: {
    wsInit() {
      const wsuri = 'ws://43.143.29.193:8080/websocket/' + this.$store.getters.name + '/' + this.$store.getters.role
      // const wsuri = 'ws://127.0.0.1:8080/websocket/' + this.$store.getters.name + '/' + this.$store.getters.role
      this.ws = wsuri
      if (!this.wsIsRun) return
      // 销毁ws
      this.wsDestroy()
      // 初始化ws
      this.webSocket = new WebSocket(this.ws)
      // ws连接建立时触发
      this.webSocket.addEventListener('open', this.wsOpenHanler)
      // ws服务端给客户端推送消息
      this.webSocket.addEventListener('message', this.wsMessageHanler)
      // ws通信发生错误时触发
      this.webSocket.addEventListener('error', this.wsErrorHanler)
      // ws关闭时触发
      this.webSocket.addEventListener('close', this.wsCloseHanler)
      // 检查ws连接状态,readyState值为0表示尚未连接，1表示建立连接，2正在关闭连接，3已经关闭或无法打开
      clearInterval(this.wsTimer)
      this.wsTimer = setInterval(() => {
        if (this.webSocket.readyState === 1) {
          clearInterval(this.wsTimer)
        } else {
          this.wsInit()
        }
      }, 3000)
    },
    sendDataToServer() {
      if (this.webSocket.readyState === 1) {
        this.webSocket.send('来自前端的数据')
      } else {
        throw Error('服务未连接')
      }
    },
    wsOpenHanler(event) {
    },
    wsMessageHanler(e) {
      this.$emit('IsRefresh', e.data)
    },
    /**
     * ws通信发生错误
     */
    wsErrorHanler(event) {
      this.wsInit()
    },
    /**
     * ws关闭
     */
    wsCloseHanler(event) {
      this.wsInit()
    },
    /**
     * 销毁ws
     */
    wsDestroy() {
      if (this.webSocket !== null) {
        this.webSocket.removeEventListener('open', this.wsOpenHanler)
        this.webSocket.removeEventListener('message', this.wsMessageHanler)
        this.webSocket.removeEventListener('error', this.wsErrorHanler)
        this.webSocket.removeEventListener('close', this.wsCloseHanler)
        this.webSocket.close()
        this.webSocket = null
        clearInterval(this.wsTimer)
      }
    }
  }
}
</script>

<style scoped>

</style>

