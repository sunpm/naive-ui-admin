<script setup lang="ts">
const {message} = createDiscreteApi(['message'])
const showMsg = () => {
  message.info('Hello World')
}
</script>

<template>
  <div class="border p-4">
    测试  windicss
  </div>

  <n-button @click="showMsg">naive-ui</n-button>
</template>

<style scoped>
</style>
