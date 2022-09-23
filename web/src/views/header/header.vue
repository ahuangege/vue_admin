<template>
    <div class="toolbar">
        <el-dropdown @command="command">
            <el-icon style="margin-right: 8px; margin-top: 1px" size="30px">
                <setting />
            </el-icon>
            <template #dropdown>
                <el-dropdown-menu>
                    <el-dropdown-item command="meInfo">个人信息</el-dropdown-item>
                    <el-dropdown-item command="changeName">改名</el-dropdown-item>
                    <el-dropdown-item command="logout">登出</el-dropdown-item>
                </el-dropdown-menu>
            </template>
        </el-dropdown>
        <span>{{username}}</span>
    </div>
</template>

<script lang="ts" setup>
import store, { I_user } from '@/store/store';
import { eventOff, eventOn, e_eventT } from '@/utils/eventUtil';
import { Setting } from '@element-plus/icons-vue';
import { onMounted, onUnmounted, ref } from 'vue';
import { useRouter } from 'vue-router';

let router = useRouter();

let username = ref("");

function onUserInfoChanged(user: I_user) {
    if (user) {
        username.value = user.name;
    }
}

if (!store.getUser()) {
    router.push("/login");
} else {
    username.value = store.getUser().name;
}

onMounted(() => {
    eventOn(e_eventT.userInfo, onUserInfoChanged);
});

onUnmounted(() => {
    eventOff(e_eventT.userInfo, onUserInfoChanged);
});



function command(cmd: string) {
    if (cmd === "meInfo") {
        router.push({ "path": "/" });
    } else if (cmd === "changeName") {
        router.push({ "path": "/changename" });
    } else if (cmd === "logout") {
        store.setUser(null as any);
        router.push({ "path": "/login" });
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
      