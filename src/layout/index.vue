<template>
  <el-container class="h-full">
    <el-aside
        content-style="padding: 24px;"
        :native-scrollbar="false"
        bordered
    >
      <el-scrollbar>
        <Logo/>
        <AsideMenu :isCollapse="false">
          <AsideMenuItem v-for="route in menuOptions" :key="route.id" :menu="route" :base-path="route.path"
                         :isCollapse="false"/>
        </AsideMenu>
      </el-scrollbar>
    </el-aside>
    <el-container>
      <el-header>123</el-header>
      <el-main>
        <el-scrollbar>
          <router-view/>
        </el-scrollbar>
      </el-main>
    </el-container>
  </el-container>
</template>

<script setup>
import { AsideMenu, AsideMenuItem } from './components/Menu'
import { Logo } from './components/Logo'
import { useAuthStore } from '@/store/modules/index.js'
import { ref } from 'vue'


const useAuth = useAuthStore()

const menuOptions = ref(useAuth.userInfo?.menu || [])
console.log(menuOptions.value)
</script>

<style scoped>

</style>
