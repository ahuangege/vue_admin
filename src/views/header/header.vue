<template>
    <div class="toolbar">
        <el-dropdown @command="command">
            <el-icon style="margin-right: 8px; margin-top: 1px" size="30px">
                <setting />
            </el-icon>
            <template #dropdown>
                <el-dropdown-menu>
                    <el-dropdown-item command="meInfo">个人信息</el-dropdown-item>
                    <el-dropdown-item command="logout">登出</el-dropdown-item>
                </el-dropdown-menu>
            </template>
        </el-dropdown>
        <span>Tom99999</span>
    </div>
</template>

<script lang="ts" setup>
import { Setting } from '@element-plus/icons-vue';
import { useRouter } from 'vue-router';
let router = useRouter();

function command(cmd: string) {
    if (cmd === "meInfo") {
        router.push({ "path": "/" });
    } else if (cmd === "logout") {
        // router.push({ "path": "/" });
    }
}

</script>

<style scoped>
.toolbar {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    right: 20px;
}
</style>
      