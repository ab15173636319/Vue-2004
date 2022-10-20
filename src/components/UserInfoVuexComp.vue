<template>
  <div>
    <div v-if="userinfo.isLogin">
      {{ userinfo.tbUser.nickname }}
      <el-button @click="logout()">安全退出</el-button>
    </div>
    <div v-else>
      <el-button @click="loginVisible = true">登录</el-button>
    </div>
    <el-dialog :visible.sync="loginVisible" title="登录">
      <div>
        <el-form>
          <el-form-item prop="username">
            <el-input v-model="user.username"></el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input v-model="orgpwd" show-password></el-input>
          </el-form-item>
          <el-form-item>
            <el-button @click="login">登录</el-button>
            <el-button @click="loginVisible = false">关闭</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import logger from '@/js/logger'
import tools from '@/js/tools'
// import tools from "../../js/tools";
let app
export default {
  name: 'UserInfoVuexComp',
  data() {
    return {
      loginVisible: false,
      user: {
        username: '',
        password: '',
      },
      orgpwd: '',
    }
  },
  computed: {
    userinfo() {
      return this.$store.state.loginUser
    },
  },
  methods: {
    logout() {
      tools.ajax('/user/auth/logout', {}, () => {
        this.$store.dispatch('updateUserInfo').then(this.changeInfo()).catch(this.changeInfo())
      })
    },
    login() {
      this.user.password = tools.md5(this.orgpwd)
      tools.ajax('/user/auth/login', this.user, () => {
        this.$store.dispatch('updateUserInfo').then(this.changeInfo()).catch(this.changeInfo())
      })
    },
    changeInfo() {
      this.$emit('status-chang')
    },
  },
  created() {
    app = this
    logger.debug(app)
  },
}
</script>
<style scoped></style>
