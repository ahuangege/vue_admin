<script setup lang="ts">
import { useRoute } from 'vue-router';

let route = useRoute();


</script>

<template>
    <h1>about id:{{route.params.id}}  query:{{route.query}}</h1>
</template>
    