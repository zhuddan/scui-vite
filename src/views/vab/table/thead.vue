<script>
export default {
  name: 'TableThead',
  data() {
    return {
      list: {
        apiObj: this.$API.demo.list,
      },
    }
  },
}
</script>

<template>
  <el-container>
    <el-header>
      <div class="left-panel">
        <el-button type="primary" icon="el-icon-plus" />
        <el-button type="danger" plain icon="el-icon-delete" />
      </div>
    </el-header>
    <el-main class="nopadding">
      <scTable ref="table" :api-obj="list.apiObj" row-key="id" stripe>
        <el-table-column type="selection" width="50" />
        <el-table-column label="个人信息">
          <el-table-column label="姓名" prop="name" width="150" />
          <el-table-column label="性别" prop="sex" width="150" />
          <el-table-column label="邮箱" prop="email" width="250" />
        </el-table-column>
        <el-table-column label="评分" prop="num" width="150" />
        <el-table-column label="注册时间" prop="datetime" width="150" />
      </scTable>
    </el-main>
  </el-container>
</template>

<style>
</style>
