<template>
  <div>
    <div>{{ title }}</div>
    <hr />
    <div v-if="isConnect">
      <input type="text" v-model="echo" />
      <el-button @click="send()">发送</el-button>
      <hr />
      服务消息:{{ info }}
    </div>
    <div v-else> 正在连接服务器，请稍后。。。。。。 </div>
  </div>
</template>
<script>
import logger from '@/js/logger'
import AutoWebSocket from '@/js/AutoWebSocket'
import serverInfo from '@/js/server'
// import tools from "../../js/tools";
let app
let ws
export default {
  name: 'WsView',
  data() {
    return {
      title: 'websocket测试',
      info: '',
      echo: '',
      isConnect: false,
    }
  },
  methods: {
    mapDemo() {
      let map = new Map()
      // map是键值对数据结构
      map.set('one', '数值一'), map.set('date', '日期，约会')
      map.set('michael', '人名迈克尔，天使米迦勒')
      // 可以通过key快速获取到值
      logger.debug('one', map.get('one'))
      logger.debug('michael', map.get('michael'))
    },
    send() {
      ws.send(this.echo)
    },
    onckose(ev) {
      logger.debug('服务器断开连接', ev)
    },
    onmessage(data) {
      this.info = data
    },
    onopen(ev) {
      logger.debug('连接到webscoket服务', ev)
      this.isConnect = ws.isConnect
    },
    initWs() {
      // 初始化webscoket
      ws = new AutoWebSocket(serverInfo.websocketUrl + 'echo')
      // 监听连接打开事件
      ws.addListener('open', app.onopen)
      // 监听消息接受时间
      ws.addListener('message', app.onmessage)
      // 监听断开连接事件
      ws.addListener('close', app.onclose)
      // 启动服务器连接
      ws.connect()
    },
  },
  created() {
    app = this
    logger.debug(app)
    this.initWs()
    this.mapDemo()
  },
  destroyed() {
    // 销毁webscoket对象
    ws = null
  },
}
</script>
<style scoped></style>
