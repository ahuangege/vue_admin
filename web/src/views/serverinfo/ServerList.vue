<template>
    <h1>服务器列表 (每5秒自动刷新)</h1>
    <el-table :data="tableData" style="width: 100%">
        <el-table-column prop="i" label="序号" />
        <el-table-column prop="id" label="服务器" />
        <el-table-column prop="startTime" label="启动时长" />
    </el-table>
</template>
  
<script lang="ts" setup>
import { httpClient } from '@/httpRpc/httpRpc';
import { ElMessage } from 'element-plus';

import { onMounted, onUnmounted, reactive } from 'vue';
let tableData: { "i": number, "id": string, "startTime": string }[] = reactive([]);

let requestTimeout: any = null;
async function getServerList() {
    let res = await httpClient.rpc().main.getServerList(null);
    if (res.code !== 0) {
        ElMessage.error(res.errMsg);
    } else {
        tableData.splice(0, tableData.length, ...res.data.list);
    }
    requestTimeout = setTimeout(getServerList, 5000);
}

onMounted(() => {
    getServerList();
});

onUnmounted(() => {
    clearTimeout(requestTimeout);
});

</script>
  