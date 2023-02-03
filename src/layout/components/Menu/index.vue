<template>
  <el-menu
      :collapse="isCollapse"
      :unique-opened="false"
      :collapse-transition="false"
      mode="vertical"
      :default-active="activeMenu()"
  >
    <slot />
  </el-menu>
</template>

<script setup>
import { useRoute } from 'vue-router'

const props = defineProps({
  isCollapse: {
    type: Boolean,
    default: false,
  },
})

const route = useRoute()

const activeMenu = () => {
  const { meta, path } = route
  // if set path, the sidebar will highlight the path you set
  if (meta.activeMenu) {
    return meta.activeMenu
  }
  return path
}

</script>

<style scoped>

</style>
