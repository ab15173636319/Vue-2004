<template>
  <div>
    <div>{{ title }}</div>
    {{ userinfo }}
  </div>
</template>
<script>
import logger from '@/js/logger'
// import tools from "../../js/tools";
let app
export default {
  name: 'UserView',
  data() {
    return {
      title: '用户信息界面',
    }
  },
  computed: {
    userinfo() {
      return this.$store.state.loginUser
    },
  },
  methods: {},
  created() {
    app = this
    logger.debug(app)
  },
}
</script>
<style scoped>
a {
  display: inline-block;
  margin: 0.5rem;
}
a:not(:last-child)::after {
  content: '  |  ';
  display: inline-block;
  margin: 0.2rem;
}
</style>
