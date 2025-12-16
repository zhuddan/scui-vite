<script>
import approver from './nodes/approver.vue'
import branch from './nodes/branch.vue'
import promoter from './nodes/promoter.vue'
import send from './nodes/send.vue'

export default {
  components: {
    Approver: approver,
    Promoter: promoter,
    Branch: branch,
    Send: send,
  },
  props: {
    modelValue: { type: Object, default: () => {} },
  },
  data() {
    return {
      nodeConfig: {},
    }
  },
  watch: {
    modelValue(val) {
      this.nodeConfig = val
    },
    nodeConfig(val) {
      this.$emit('update:modelValue', val)
    },
  },
  mounted() {
    this.nodeConfig = this.modelValue
  },
  methods: {

  },
}
</script>

<template>
  <Promoter v-if="nodeConfig.type == 0" v-model="nodeConfig" />

  <Approver v-if="nodeConfig.type == 1" v-model="nodeConfig" />

  <Send v-if="nodeConfig.type == 2" v-model="nodeConfig" />

  <Branch v-if="nodeConfig.type == 4" v-model="nodeConfig">
    <template #default="slot">
      <node-wrap v-if="slot.node" v-model="slot.node.childNode" />
    </template>
  </Branch>

  <node-wrap v-if="nodeConfig.childNode" v-model="nodeConfig.childNode" />
</template>

<style>
</style>
