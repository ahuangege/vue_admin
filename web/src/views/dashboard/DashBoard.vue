

<template>
    <p>Hello {{username}}!</p>
</template>

<script lang="ts" setup>
import { useRouter } from 'vue-router';
import store, { I_user } from '@/store/store';
import { onMounted, onUnmounted, ref } from 'vue';
import { eventOff, eventOn, e_eventT } from '@/utils/eventUtil';
let router = useRouter();

let username = ref("");

let userInfo = store.getUser();
if (!userInfo) {
    router.push("/login");
} else {
    username.value = userInfo.name;
}

function onUserInfoChanged(user: I_user) {
    if (user) {
        username.value = user.name;
    }
}

onMounted(() => {
    eventOn(e_eventT.userInfo, onUserInfoChanged);
});

onUnmounted(() => {
    eventOff(e_eventT.userInfo, onUserInfoChanged);
});

</script>