<script setup lang="ts">
import Demo from '@com/Demo.vue'
const showMsg = () => {
  const {message} = createDiscreteApi(['message'])
  message.success('Hello World')
}
</script>

<template>
  <div class="border p-4">
    测试  windicss
  </div>

  <n-button @click="showMsg">naive-ui</n-button>
  <Demo />
</template>

<style scoped>
</style>
