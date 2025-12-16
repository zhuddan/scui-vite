import { markRaw } from 'vue'

// import.meta.glob 返回对象，key = 路径，value = 异步导入函数
const modules = import.meta.glob('./*.vue', { eager: true }) // eager: 同步导入

const resultComps = {}

Object.entries(modules).forEach(([path, module]) => {
  // 提取文件名作为组件名
  const name = path.replace(/^\.\/(.*)\.vue$/, '$1')
  // 取默认导出
  resultComps[name] = module.default
})

export default markRaw(resultComps)
