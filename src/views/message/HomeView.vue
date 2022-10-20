<template>
  <div>
    <div>{{ title }}</div>
    <div>
      <div v-if="isLogin">
        {{ tbUser }}
        <hr />
        {{ tbUserInfo }}
        <hr />
        {{ userOtherInfo }}
        <hr />
        <el-button @click="logout">安全退出</el-button>
      </div>
      <div v-else>需要登录</div>
    </div>
  </div>
</template>
<script>
import logger from '@/js/logger'
import tools from '../../js/tools'
let app
export default {
  name: 'userInfo',
  data() {
    return {
      title: 'ajax测试页面',
      isLogin: false,
      tbUser: {},
      tbUserInfo: {},
      userOtherInfo: {},
    }
  },
  methods: {
    getUserInfo() {
      tools.ajax(
        '/user/auth/getUserInfo',
        {},
        (data) => {
          this.isLogin = data.success
          if (data.success) {
            this.tbUser = data.tbUser
            this.tbUserInfo = data.tbUserInfo
            this.userOtherInfo = data.userOtherInfo
          }
        },
        true
      )
    },
    logout() {
      tools.ajax('/user/auth/logout', {}, () => {})
      this.isLogin = false
    },
  },
  created() {
    app = this
    logger.debug(app)
    this.getUserInfo()
  },
}
</script>
<style scoped></style>
