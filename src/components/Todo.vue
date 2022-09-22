<script setup  lang="ts">

import { ref } from 'vue';

defineProps({
    "name": String
})
defineEmits(["delchild"])

</script>
      
    
    
    
<template>
    <tr>
        <td style="color: red;">{{ name }}</td>
        <td> <button @click="$emit('delchild', name)">删除</button> </td>
    </tr>
    <!-- <p style="color: red;">{{ name }} <button @click="$emit('delchild', name)">删除</button> </p> -->
</template>
    

      