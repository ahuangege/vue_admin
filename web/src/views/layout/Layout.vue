<template>
    <el-container>
        <el-aside width="250px">
            <SidebarVue></SidebarVue>
        </el-aside>
        <el-container>
            <el-header style="text-align: right;" height="50px">
                <HeaderVue></HeaderVue>
            </el-header>

            <el-main>
                <router-view></router-view>
            </el-main>
        </el-container>
    </el-container>
</template>
  
<script lang="ts" setup>
import { ref } from 'vue';
import SidebarVue from '@/views/sidebar/Sidebar.vue';
import HeaderVue from '@/views/header/header.vue';
</script>

<style scoped>
.el-header {
    position: relative;
    background-color: var(--el-color-primary-light-7);
    color: var(--el-text-color-primary);
}

.el-main {
    padding-left: 20px;
    padding-right: 20px;
}
</style>
  