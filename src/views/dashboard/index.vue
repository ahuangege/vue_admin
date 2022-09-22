

<template>

</template>

<script lang="ts" setup>
import { useRouter } from 'vue-router';
import store from '@/store/store';
let router = useRouter();

let userInfo = store.getUser();
if (!userInfo) {
    router.push("/login");
}

</script>