<template>
  <div>
    <!-- <span>属性信息：{{ page }}</span> -->
    <!-- :layout="layout" :page-sizes="sizes" @current-change="changePage" @size-change="changeSize" :page-size="page.pageSize" :page-count="page.pageCount" :current-page="page.pageNumber" :total="page.total"     -->
    <el-pagination @current-change="changePage" @size-change="changeSize" :current-page="page.pageNumber" :page-size="page.pageSize" :page-sizes="sizes" :total="page.total" :layout="layout"></el-pagination>
  </div>
</template>
<script>
// import logger from '@/js/logger'
export default {
  name: 'PageComp',
  data() {
    return {}
  },
  // 定义组件的属性
  props: {
    page: {
      default() {
        return {}
      },
    },
    sizes: {
      default() {
        return [10, 20, 30, 40]
      },
    },
    layout: {
      default() {
        return 'sizes, prev, pager, next'
      },
    },
  },
  computed: {
    pageInfo() {
      return this.page
    },
  },
  methods: {
    changePage(pn) {
      this.pageInfo.pageNumber = pn
      // this.$logger.debug('组件的page信息：', this.pageInfo)
      this.$emit('change-page')
    },
    changeSize(ps) {
      this.pageInfo.pageSize = ps
      // this.$logger.debug('组件的page信息：', this.pageInfo)
      this.$emit('change-page')
    },
  },
  created() {
    // logger.debug('page属性：', this.page)
  },
}
</script>
<style scoped></style>
