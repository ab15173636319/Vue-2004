<template>
  <div
    >{{ title }}

    <hr />
    <input type="text" v-model="info" placeholder="路由参数" />
    <hr />
    <input type="text" v-model="qs" placeholder="查询字符串" />
    <hr />
    <input type="text" v-model="hash" placeholder="hash" />
    <hr />
    <el-button type="warning" @click="toInfo">提交</el-button>
  </div>
</template>

<script>
let app
export default {
  name: 'RouterView',
  data() {
    return {
      title: '路由参数提交界面',
      info: '',
      qs: '',
      hash: '',
    }
  },
  methods: {
    toInfo() {
      app.$router.push({
        path: '/test/router/' + app.info,
        query: {
          info: app.qs,
          // query不可以二级json
          'page.pageNumber': 1,
        },
        hash: app.hash,
      })
    },
  },
  created() {
    app = this
    console.log(app.title)
  },
}
</script>
<style scoped></style>
