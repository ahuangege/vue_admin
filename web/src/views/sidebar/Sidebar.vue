<template>
    <el-scrollbar max-height="800px">
        <el-menu active-text-color="#ffd04b" background-color="#545c64" text-color="#fff" @select="handleSelect">
            <el-menu-item index="">
                <template #title>
                    <el-icon>
                        <UserFilled />
                    </el-icon>dashboard
                </template>
            </el-menu-item>

            <el-sub-menu index="serverinfo">
                <template #title>
                    <el-icon>
                        <Cpu />
                    </el-icon>服务器监控
                </template>

                <el-menu-item index="list">
                    <template #title>
                        <el-icon>
                            <Document />
                        </el-icon>服务器信息
                    </template>
                </el-menu-item>

                <el-sub-menu index="action">
                    <template #title>
                        <el-icon>
                            <View />
                        </el-icon>服务器维护
                    </template>
                    <el-menu-item index="start">
                        <template #title>
                            <el-icon>
                                <CircleCheck />
                            </el-icon>启动服务器
                        </template>
                    </el-menu-item>
                    <el-menu-item index="close" disabled>
                        <template #title>
                            <el-icon>
                                <CircleClose />
                            </el-icon>关闭服务器
                        </template>
                    </el-menu-item>
                </el-sub-menu>

            </el-sub-menu>

            <el-sub-menu index="activity">
                <template #title>
                    <el-icon>
                        <IconMenu />
                    </el-icon>活动
                </template>
                <el-menu-item index="activitylist" disabled>
                    <template #title>
                        <el-icon>
                            <Document />
                        </el-icon>活动列表
                    </template>
                </el-menu-item>
                <el-menu-item index="new" disabled>
                    <template #title>
                        <el-icon>
                            <Edit />
                        </el-icon>新建活动
                    </template>
                </el-menu-item>
            </el-sub-menu>
        </el-menu>
    </el-scrollbar>
</template>


<script lang="ts" setup>
import { Menu as IconMenu, View, UserFilled, Document, Cpu, CircleCheck, CircleClose, Edit } from '@element-plus/icons-vue'
import { useRouter, useRoute } from 'vue-router';
let router = useRouter();
let route = useRoute();


function handleSelect(key: string, keyPath: string[]) {
    let tmpPath = "/" + keyPath.join("/");
    if (tmpPath === route.path) {
        return;
    }
    router.push({ "path": tmpPath });
}
</script>
      
<style scoped>

</style>
      