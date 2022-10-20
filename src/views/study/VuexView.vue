<template>
  <div>
    <div>{{ title }}</div>
    <el-button @click="changpage">切换到other页面</el-button>
    <div
      >{{ count }}
      <el-button @click="addCountInfo()">更改vuex变量的count</el-button>
      <el-button @click="updateCountVuex()">更改异步任务</el-button>
    </div>
    <hr />
    <vuex-one-comp></vuex-one-comp>
    <hr />
    <vuex-two-comp></vuex-two-comp>
  </div>
</template>
<script>
import logger from '@/js/logger'
// import tools from "../../js/tools";
import VuexOneComp from '@/components/VuexOneComp.vue'
import VuexTwoComp from '@/components/VuexTwoComp.vue'
let app
export default {
  name: 'VuewxView',
  components: { VuexOneComp, VuexTwoComp },
  data() {
    return {
      title: 'vuex演示',
    }
  },
  computed: {
    count() {
      return this.$store.state.count
    },
  },
  methods: {
    updateCountVuex() {
      return this.$store
        .dispatch('updataCount')
        .then(() => {
          logger.debug('异步操作任务完成。。。')
        })
        .catch(() => {})
    },
    addCountInfo() {
      this.$store.commit('addCount')
    },
    changpage() {
      this.$router.push('/study/vuexother')
    },
  },
  created() {
    app = this
    logger.debug(app)
  },
}
</script>
<style scoped></style>
