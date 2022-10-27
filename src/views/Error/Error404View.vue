<template>
  <div>{{ title }}</div>
</template>

<script>
let app
export default {
  name: 'Error404View',
  data() {
    return {
      title: '页面不存在',
    }
  },
  methods: {},
  created() {
    app = this
    console.log(app.title)
  },
}
</script>
<style scoped></style>
