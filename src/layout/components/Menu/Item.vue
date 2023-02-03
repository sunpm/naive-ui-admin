<template>
  <!-- 有子节点渲染这个 -->
  <el-sub-menu :index="menu.url" v-if="menu?.children">
    <template #title>
      <component :is="menu?.icon"></component>
      <span>{{menu?.title}}</span>
    </template>
    <!-- 递归调用本身，该组件在index.ts中全局注册了 -->
    <AsideMenuItem v-for="item in menu.children" :menu="item" :isCollapse="isCollapse"/>
  </el-sub-menu>
  <!-- 没有子节点渲染这个 -->
  <el-menu-item  v-else  :index="menu?.url">
    <component :is="menu?.icon"></component>
    <span slot="title">{{menu?.title}}</span>
  </el-menu-item >
</template>

<script setup>
import {AsideMenuItem} from './index'
const props = defineProps({
  menu: {
    type: Object,
    default: () => ({}),
  },
  isCollapse: {
    type: String,
    default: '',
  },
})
console.log(props.menu)
</script>

<style scoped>

</style>
