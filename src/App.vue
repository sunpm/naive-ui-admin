<script setup>
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
import en from 'element-plus/dist/locale/en.mjs'


</script>

<template>
  <el-config-provider
      :locale="zhCn"
      class="h-full"
  >
    <router-view />
  </el-config-provider>
</template>

<style scoped>
</style>
