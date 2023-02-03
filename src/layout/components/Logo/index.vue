<template>
  <div class="flex items-center justify-center leading-none overflow-hidden whitespace-nowrap h-16">
    <img src="@/assets/images/logo.png" alt="" class="w-auto h-8 mr-2" />
    <h2 v-show="!collapsed" class="m-0">栗子后台</h2>
  </div>
</template>

<script setup>
defineProps({
  collapsed: {
    type: Boolean,
    default: false,
  },
})
</script>

<style scoped>
</style>
