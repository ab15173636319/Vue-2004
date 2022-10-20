<template>
  <div>
    <user-info-comp></user-info-comp>
    <div>{{ title }}</div>
    <user-info-vuex-comp @status-chang="loginChange()"></user-info-vuex-comp>
    <div v-if="userinfo.isLogin">
      {{ userinfo.tbUser }}
      <hr />
      {{ userinfo.tbUserInfo }}
      <hr />
      {{ userinfo.userOtherInfo }}
    </div>
    <el-button @click="$router.push('/message/user')">我的信息</el-button>
  </div>
</template>
<script>
import logger from '@/js/logger'
import UserInfoComp from '@/components/UserInfoComp.vue'
import UserInfoVuexComp from '@/components/UserInfoVuexComp.vue'
// import tools from '../../js/tools'

let app
export default {
  components: { UserInfoComp, UserInfoVuexComp },
  name: 'MainVuew',
  data() {
    return {
      title: 'ajax测试页面',
    }
  },
  computed: {
    userinfo() {
      return this.$store.state.loginUser
    },
  },
  methods: {
    loginChange() {
      logger.debug('收到登录状态改变的时间')
    },
  },
  created() {
    app = this
    logger.debug(app)
  },
}
</script>
