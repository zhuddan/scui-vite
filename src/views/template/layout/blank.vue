<script>
export default {
  name: 'Blank',
  data() {
    return {
      title: 'BLANK PAGE :)',
    }
  },
}
</script>

<template>
  <el-empty :image-size="200" :description="title" />
</template>

<style>
</style>
