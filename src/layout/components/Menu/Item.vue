<template>
  <!-- 有子节点渲染这个 -->
  <el-sub-menu :index="menu.url" v-if="menu?.children">
    <template #title>
      <el-icon>
        <component :is="elementIcon2elementPlusIcon(menu?.icon)"></component>
      </el-icon>
      <span>{{menu?.title}}</span>
    </template>
    <!-- 递归调用本身，该组件在index.ts中全局注册了 -->
    <AsideMenuItem v-for="item in menu.children" :menu="item" :isCollapse="isCollapse"/>
  </el-sub-menu>
  <!-- 没有子节点渲染这个 -->
  <el-menu-item v-else :index="menu?.url">
    <el-icon>
      <component :is="elementIcon2elementPlusIcon(menu?.icon)"></component>
    </el-icon>
    <span slot="title">{{menu?.title}}</span>
  </el-menu-item >
</template>

<script setup>
import {AsideMenuItem} from './index'
import { elementIcon2elementPlusIcon } from '@/utlis/index.js'
const props = defineProps({
  menu: {
    type: Object,
    default: () => ({}),
  },
  isCollapse: {
    type: Boolean,
    default: '',
  },
})
// console.log(props.menu)
</script>

<style scoped>

</style>
