<template>
  <div>
    <div>{{ title }}</div>
    <div>get请求:{{ getData }}</div>
    <div>post请求:{{ postData }}</div>
    <div>错误请求:{{ errprData }}</div>
    <div>信息:{{ info }}</div>
  </div>
</template>
<script>
import logger from '@/js/logger'
import tools from '@/js/tools'
// let app
export default {
  name: 'HomeView',
  data() {
    return {
      title: 'ajax测试页面',
      getData: {},
      postData: {},
      errprData: {},
      info: tools.getBrowserInfo(),
    }
  },
  methods: {
    testGet() {
      tools.ajax(
        '/',
        { echo: '黑暗骑士' },
        (data) => {
          this.getData = data
        },
        false,
        'get'
      )
    },
    testPost() {
      // ajax方法参数
      // 1、请求的path
      // 2、请求的参数
      // 3、银达的回调处理函数
      // 4、当应答结果的success值weifalse的时候是否自己处理错误默认值为false，系统是自动淡出错误的信息框
      // 5、请求的模式，默认为post
      // 6、是否返回ajax亲求的promise对象，如果为true，则需要自己处理；应答和错误，34参数将会无效
      tools.ajax('/api/amap/weatherInfo', { city: '430702' }, (data) => {
        this.postData = data.data.lives
      })
    },
    testError1() {
      tools.ajax('/user/auth/login', {}, (data) => {
        logger.debug(data)
      })
    },
    testError2() {
      tools.ajax(
        '/user/auth/login',
        {},
        (data) => {
          this.errprData = data
        },
        true
      )
    },
  },
  created() {
    // app = this
    this.testGet()
    this.testPost()
    // this.testError1()
    this.testError2()
    logger.debug('测试是否是浏览器', tools.isMobile())
  },
}
</script>
<style scoped></style>
