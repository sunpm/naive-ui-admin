<script setup lang="ts">
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
</template>

<style scoped>
</style>
