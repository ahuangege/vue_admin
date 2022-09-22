<script setup lang="ts">
import { onBeforeRouteUpdate, useRoute, useRouter } from 'vue-router';

onBeforeRouteUpdate((to, from) => {

})
let route = useRoute()
let router = useRouter()

function toAbout() {
    router.push({ "path": "/about/3", "query": {"id": 4} })
}

</script>



<template>
    <h1>home</h1>
    <el-button type="primary" @click="toAbout">点击去about</el-button>
</template>
    