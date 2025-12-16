<script>
import { defineAsyncComponent } from 'vue'

const work = defineAsyncComponent(() => import('./work/index.vue'))
const widgets = defineAsyncComponent(() => import('./widgets/index.vue'))

export default {
  name: 'Dashboard',
  components: {
    Work: work,
    Widgets: widgets,
  },
  data() {
    return {
      pageLoading: true,
      dashboard: '0',
    }
  },
  created() {
    this.dashboard = this.$TOOL.data.get('USER_INFO').dashboard || '0'
  },
  mounted() {

  },
  methods: {
    onMounted() {
      this.pageLoading = false
    },
  },
}
</script>

<template>
  <div v-if="pageLoading">
    22
    <el-main>
      <el-card shadow="never">
        <el-skeleton :rows="1" />
      </el-card>
      <el-card shadow="never" style="margin-top: 15px;">
        <el-skeleton />
      </el-card>
    </el-main>
  </div>
  <Work v-if="dashboard == '1'" @on-mounted="onMounted" />
  <Widgets v-else @on-mounted="onMounted" />
</template>

<style>
</style>
