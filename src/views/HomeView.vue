<template>
  <div>
    首页
    <a v-for="p in pages" :key="p.path" @click="toPage(p.path)" href="javascript:viod(0)">{{ p.title }}</a>
  </div>
</template>

<script>
export default {
  name: 'HomeView',
  data() {
    return {
      pages: [
        { title: '关于', path: '/about' },
        { title: '留言板首页', path: '/message/main' },
        { title: 'websocket测试', path: '/test/ws' },
      ],
    }
  },
  methods: {
    toAbout() {
      //编程式路由跳转
      this.$router.push('/about')
    },
    toPage(page) {
      this.$router.push(page.path)
    },
  },
}
</script>
