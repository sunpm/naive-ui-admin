<script setup lang="ts">
import {useDemoStore} from "@/store/demo";

const demoStore = useDemoStore();

const showMsg = () => {
  const {message} = createDiscreteApi(['message'])
  message.success('Hello World')
}

const add = () => {
  demoStore.count += 1
}

</script>

<template>
  <div class="border p-4">
    测试  windicss
  </div>

  <n-button @click="showMsg">naive-ui</n-button>
  <n-button @click="add">Store count +1</n-button>
  <div>{{ demoStore.count}}</div>
  <router-view />
</template>

<style scoped>
</style>
