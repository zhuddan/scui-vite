<script>
export default {
  name: 'Qrcode',
  data() {
    return {
      qrcode: 'scui',
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
    <el-row :gutter="15">
      <el-col :lg="8">
        <el-card shadow="never" header="常用">
          <sc-qr-code text="scui" />
        </el-card>
      </el-col>
      <el-col :lg="8">
        <el-card shadow="never" header="带Logo">
          <sc-qr-code text="scui" logo="/img/logo.png" />
        </el-card>
      </el-col>
      <el-col :lg="8">
        <el-card shadow="never" header="自定义颜色大小">
          <sc-qr-code text="scui" :size="100" color-dark="#088200" color-light="#fff" />
        </el-card>
      </el-col>
      <el-col :lg="8">
        <el-card shadow="never" header="动态">
          <sc-qr-code :text="qrcode" />
          <el-input v-model="qrcode" placeholder="Please input" style="margin-top: 20px;" />
        </el-card>
      </el-col>
    </el-row>
  </el-main>
</template>

<style>
</style>
