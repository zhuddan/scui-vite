<script>
export default {
  name: 'Fullpage',
  data() {
    return {

    }
  },
  mounted() {

  },
  methods: {
    goBack() {
      this.$router.go(-1)
    },
  },
}
</script>

<template>
  <el-container>
    <el-header>
      <el-page-header content="FullPage" @back="goBack" />
    </el-header>
    <el-main>
      <el-empty description="FullPageMain" />
    </el-main>
  </el-container>
</template>

<style>
</style>
