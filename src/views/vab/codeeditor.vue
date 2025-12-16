<!-- eslint-disable style/no-tabs -->
<script>
import { defineAsyncComponent } from 'vue'

const scCodeEditor = defineAsyncComponent(() => import('@/components/scCodeEditor/index.vue'))

export default {
  name: 'Codeeditor',
  components: {
    ScCodeEditor: scCodeEditor,
  },
  data() {
    return {
      json:
`{
	"name": "SCUI",
	"menu": [
		{
			"title": "VUE 3",
			"type": true,
			"link": "https://v3.cn.vuejs.org"
		},
		{
			"title": "elementplus",
			"type": false,
			"link": "https://element-plus.gitee.io"
		}
	]
}`,
      js:
`// Demo code (the actual new parser character stream implementation)
function StringStream(string) {
	this.pos = 0;
	this.string = string;
}`,
      sql:
`SELECT \`author\`, \`title\` FROM \`posts\`
WHERE \`status\` = 'draft' AND \`author\` IN('author1','author2')
ORDER BY \`created_at\` DESC, \`id\` DESC LIMIT 0, 10;`,
    }
  },
  methods: {
    getCode() {
      this.$message('请查看控制台')
      console.log(this.json)
    },
    getValue() {
      this.$message('请查看控制台')
      const v = this.$refs.editor.coder.getValue()
      console.log(v)
    },
    setValue() {
      const v = `{"key":"newValue"}`
      this.$refs.editor.coder.setValue(v)
    },
  },
}
</script>

<template>
  <el-main>
    <el-alert title="感谢codeMirror组件" type="success" style="margin-bottom:20px;" />
    <el-row :gutter="15">
      <el-col :lg="24">
        <el-card shadow="never" header="JSON">
          <ScCodeEditor ref="editor" v-model="json" mode="javascript" :height="200" />
          <div style="margin-top: 15px;">
            <el-button type="primary" @click="getCode">
              获取v-model
            </el-button>
            <el-button type="primary" @click="getValue">
              getValue()
            </el-button>
            <el-button type="primary" @click="setValue">
              setValue()
            </el-button>
          </div>
        </el-card>
      </el-col>
      <el-col :lg="12">
        <el-card shadow="never" header="javascript Darcula主题">
          <ScCodeEditor v-model="js" mode="javascript" theme="darcula" />
        </el-card>
      </el-col>

      <el-col :lg="12">
        <el-card shadow="never" header="SQL">
          <ScCodeEditor v-model="sql" mode="sql" />
        </el-card>
      </el-col>
    </el-row>
  </el-main>
</template>

<style>
</style>
