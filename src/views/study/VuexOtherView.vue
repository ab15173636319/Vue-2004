<template>
  <div>
    <div>{{ title }}=={{ compCount }}</div>
    <el-button @click="changpage">切换到vuex页面</el-button>
  </div>
</template>
<script>
import logger from '@/js/logger'
// import tools from "../../js/tools";
let app
export default {
  name: 'TestAjaxView',
  data() {
    return {
      title: 'ajax测试页面',
    }
  },
  methods: {
    changpage() {
      this.$router.push('/study/vuex')
    },
  },
  computed: {
    compCount() {
      return this.$store.state.count
    },
  },
  created() {
    app = this
    logger.debug(app)
  },
}
</script>
<style scoped></style>
