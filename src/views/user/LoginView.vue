<template>
  <div>
    <div>{{ title }}</div>
    <div>
      <el-form :inline="true" :rules="rules">
        <el-form-item prop="username">
          <el-input v-model="user.username"></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input v-model="orgpwd" show-password></el-input>
        </el-form-item>
        <el-form-item>
          <el-button @click="login">登录</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
import logger from '@/js/logger'
import tools from '@/js/tools'
// import tools from "../../js/tools";
let app
export default {
  name: 'TestLogin',
  data() {
    return {
      title: 'ajax测试页面',
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
    login() {
      this.user.password = tools.md5(this.orgpwd)
      tools.ajax('/user/auth/login', this.user, (data) => {
        logger.debug(data)
        this.$router.push('/message')
      })
    },
  },
  created() {
    app = this
    logger.debug(app)
  },
}
</script>
<style scoped></style>
