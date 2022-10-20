<template>
  <div>
    <div>{{ title }}=={{ compCount }}</div>
  </div>
</template>
<script>
import logger from '@/js/logger'
// import tools from "../../js/tools";
let app
export default {
  name: 'VuexTwoVopm',
  data() {
    return {
      title: '另外一个vuex组件',
    }
  },
  computed: {
    compCount() {
      return this.$store.state.count
    },
  },
  methods: {},
  created() {
    app = this
    logger.debug(app)
  },
}
</script>
<style scoped></style>
