<template>
  <div>
    {{ title }}
    <hr />
    路由参数：{{ info }}
    <hr />
    查询字符串：{{ qs }}
    <hr />
    hash：{{ hash }}
  </div>
</template>

<script>
import logger from '@/js/logger'
let app
export default {
  name: 'RouterInfo',
  data() {
    return {
      title: '路由参数显示页面',
      info: '',
      qs: {},
      hash: '',
    }
  },
  methods: {},
  created() {
    app = this
    console.log(app.title)
    // app.info = app.$router.params.info
    app.qs = app.$router.query
    app.hash = app.$router.hash
    logger.debug(location.href)
    logger.debug(location.pathname, location.protomal)
    logger.debug(location.search)
    let info = '黑暗骑士 DarkKnight ?:'
    logger.debug(encodeURIComponent(info))
    logger.debug(decodeURIComponent(encodeURIComponent(info)))
  },
}
</script>
<style scoped></style>
