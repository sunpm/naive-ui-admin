<script setup>
import { dateZhCN, zhCN } from 'naive-ui';

const showMsg = () => {
  const {message} = createDiscreteApi(['message'])
  message.success('Hello World')
}

</script>

<template>
  <n-config-provider
      :locale="zhCN"
      :date-locale="dateZhCN"
      class="h-full"
  >
    <router-view />
  </n-config-provider>
</template>

<style scoped>
</style>
