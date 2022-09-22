<template>
    <p>server 1</p>
    <p>server 2</p>
    <p>server 3</p>
    <p>server 4</p>
</template>

<script lang="ts" setup>
import { onUnmounted } from 'vue';

let timeout = setInterval(() => {
    console.log("server list")
}, 3000);

onUnmounted(() => {
    console.log("onUnmounted")
    clearInterval(timeout)
})
</script>