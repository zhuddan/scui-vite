<!--
 * @Descripttion: 处理iframe持久化，涉及store(VUEX)
 * @version: 1.0
 * @Author: sakuya
 * @Date: 2021年6月30日13:20:41
 * @LastEditors:
 * @LastEditTime:
-->

<script>
import { mapStores } from 'pinia'
import { useGlobalStore } from '@/store/global'
import { useIframeStore } from '@/store/iframe'

export default {
  data() {
    return {

    }
  },
  watch: {
    $route(e) {
      this.push(e)
    },
  },
  created() {
    this.push(this.$route)
  },
  computed: {
    ...mapStores(useGlobalStore, useIframeStore),
    iframeList() {
      return this.iframeStore.iframeList
    },
    ismobile() {
      return this.globalStore.ismobile
    },
    layoutTags() {
      return this.globalStore.layoutTags
    },
  },
  mounted() {

  },
  methods: {
    push(route) {
      if (route.meta.type == 'iframe') {
        if (this.ismobile || !this.layoutTags) {
          this.iframeStore.setIframeList(route)
        }
        else {
          this.iframeStore.pushIframeList(route)
        }
      }
      else {
        if (this.ismobile || !this.layoutTags) {
          this.iframeStore.clearIframeList()
        }
      }
    },
  },
}
</script>

<template>
  <div v-show="$route.meta.type == 'iframe'" class="iframe-pages">
    <iframe v-for="item in iframeList" v-show="$route.meta.url == item.meta.url" :key="item.meta.url" :src="item.meta.url" frameborder="0" />
  </div>
</template>

<style scoped>
	.iframe-pages {
  width: 100%;
  height: 100%;
  background: #fff;
}
iframe {
  border: 0;
  width: 100%;
  height: 100%;
  display: block;
}
</style>
