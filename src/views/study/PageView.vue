<template>
  <div>
    <div>{{ title }}</div>
    <div>{{ now | formatDate('hh:mm:ss') }}</div>
    <hr />
    {{ clist }}
    <br />
    <!-- 调用组件 -->
    <!-- 调用组件，props定义属性会出现在组件中 -->
    <!-- @自定义事件名称=“处理函数"，可以接受组件.$emit(自定义事件名称) -->
    <!-- 参数列表就是传递给处理函数的信息值 -->
    <page-comp :page="cpage" @change-page="pageCompMethod"></page-comp>
    <page-comp :page="spage" @change-page="pageStundent"></page-comp>
  </div>
</template>
<script>
import logger from '@/js/logger'
import tools from '../../js/tools'
import PageComp from '@/components/PageComp.vue'
let app
let timer
export default {
  components: { PageComp },
  name: 'PageView',
  data() {
    return {
      title: '分页组件演示',
      now: new Date(),
      cpage: { pageSize: 5 },
      clist: [],
      spage: { pageSize: 5 },
      slist: [],
    }
  },
  methods: {
    // 处理分页组件的事件
    pageCompMethod(info) {
      logger.debug('分页组件自定义事件处理', info)
      this.queryCLass()
    },
    pageStundent(info) {
      this.queryStudent(info)
    },
    queryStudent() {
      tools.ajax('/manage/student/queryAll', tools.concatJson(this.spage), (data) => {
        this.spage = data.page
        this.slist = data.list
      })
    },
    queryCLass() {
      tools.ajax('/manage/class/queryAll', tools.concatJson(this.cpage), (data) => {
        this.cpage = data.page
        this.clist = data.list
      })
    },
  },
  created() {
    //#region 折叠代码功能
    app = this
    logger.debug(app)
    // this.$logger.debug(this.title, this.$md5('abcd'))
    this.queryCLass()
    this.queryStudent()
    timer = setInterval(() => {
      this.now = new Date()
    }, 1000)
    //#endregion
  },
  destroyed() {
    if (timer) {
      clearInterval(timer)
    }
  },
}
</script>
<style scoped></style>
