<template>
  <div>
    <!-- 已经登录的情况 -->
    <div style="display: flex">
      <div v-if="isLogin">
        <el-button>{{ tbUser.nickname }}</el-button>
      </div>
      <!-- 需要登陆的情况 -->
      <div v-else><el-button @click="loginVisible = true"> 登录</el-button> </div>
      <!-- 登录表单 -->
      <div v-if="isLogin"><el-button @click="logout()">退出登录</el-button></div>
    </div>
    <el-dialog :visible.sync="loginVisible" title="登录">
      <div>
        <el-form :rules="rules">
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
let app
export default {
  name: 'TestAjaxView',
  data() {
    return {
      loginVisible: false,
      isLogin: false,
      tbUser: {},
      tbUserInfo: {},
      userOtherInfo: {},
      user: {
        username: '',
        password: '',
      },
      orgpwd: '',
      rules: {
        username: [
          {
            validator: (r, v, cb) => {
              tools.regValidate(r, v, cb, /^[a-zA-Z][\S]{3,15}$/g, '用户名必须以字母且开头长度为4-16')
            },
          },
        ],
        password: [{ required: true, message: '密码必须填写' }],
      },
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
    login() {
      this.user.password = tools.md5(this.orgpwd)
      tools.ajax(
        '/user/auth/login',
        this.user,
        (data) => {
          this.loginVisible = false
          if (data.success) {
            // 成功获取用户信息
            this.getUserInfo()
          } else {
            this.isLogin = false
            this.$message.error(data.$message)
          }
        },
        true
      )
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
