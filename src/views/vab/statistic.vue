<!--
 * @Descripttion: 统计数值组件演示
 * @version: 1.0
 * @Author: sakuya
 * @Date: 2021年6月23日10:28:17
 * @LastEditors:
 * @LastEditTime:
-->

<script>
import scStatistic from '@/components/scStatistic/index.vue'

export default {
  name: 'Statistic',
  components: {
    ScStatistic: scStatistic,
  },
  data() {
    return {
      trendValue1: 7.7,
      trendValue2: -18.9,
    }
  },
  mounted() {

  },
  methods: {

  },
}
</script>

<template>
  <el-main>
    <el-alert title="一个非常简单的组件, 目的就是省去重复写样式, 支持千分符/前后缀等." type="success" style="margin-bottom:20px;" />
    <el-row :gutter="15">
      <el-col :lg="8">
        <el-card shadow="never">
          <ScStatistic title="Title" value="112893" description="Description" tips="Tips" group-separator />
        </el-card>
      </el-col>
      <el-col :lg="8">
        <el-card shadow="never">
          <ScStatistic title="今日净利润" value="112893.00" prefix="¥" group-separator>
            <sc-trend v-model="trendValue1" />
          </ScStatistic>
        </el-card>
      </el-col>
      <el-col :lg="8">
        <el-card shadow="never">
          <ScStatistic title="留言" value="112893" suffix="条" group-separator>
            <sc-trend v-model="trendValue2" />
          </ScStatistic>
        </el-card>
      </el-col>
    </el-row>
  </el-main>
</template>

<style scoped>
	.el-card {
  margin-bottom: 15px;
}
.up {
  color: #f56c6c;
  margin-left: 5px;
}
.down {
  color: #67c23a;
  margin-left: 5px;
}
</style>
