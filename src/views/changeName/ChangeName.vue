<template>
    <el-form>
        <el-form-item>
            <el-col :span="6">
                <el-input v-model="input" placeholder="请输入昵称" />
            </el-col>
        </el-form-item>

        <el-form-item>
            <el-button type="primary" @click="onSubmit">修改</el-button>
        </el-form-item>
    </el-form>
</template>

<script lang="ts" setup>
import store from '@/store/store';
import { ref } from 'vue'
const input = ref('')

function onSubmit() {
    let user = store.getUser();
    if (user) {
        user.name = input.value;
        store.setUser(user);
        input.value = "";
    }
}

</script>