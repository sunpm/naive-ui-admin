<template>
  <n-layout  position="absolute" has-sider>
    <n-layout-sider
        content-style="padding: 24px;"
        :native-scrollbar="false"
        bordered
    >
      <Logo />
      <AsideMenu />
    </n-layout-sider>
    <n-layout content-style="padding: 24px;">
      <router-view />

    </n-layout>
  </n-layout>
</template>

<script setup>
import {AsideMenu} from './components/Menu'
import {Logo} from './components/Logo'
</script>

<style scoped>

</style>
