<template>
	<el-dialog v-model="dialogFormVisible" title="后台管理系统" :show-close="constFalse" :close-on-press-escape="constFalse"
		:close-on-click-modal="constFalse" width="500px" center>
		<el-form :model="form">
			<el-form-item label="账号" :label-width="formLabelWidth">
				<el-input v-model="form.username" placeholder="admin" />
			</el-form-item>
			<el-form-item label="密码" :label-width="formLabelWidth">
				<el-input v-model="form.password" type="password" show-password />
			</el-form-item>
		</el-form>
		<template #footer>
			<span class="dialog-footer">
				<el-button type="primary" @click="btnLogin">登录</el-button>
			</span>
		</template>
	</el-dialog>
</template>

<script lang="ts" setup>
import { reactive, ref } from 'vue'
import store from '@/store/store';
import { useRouter } from 'vue-router';
import { httpClient } from '@/httpRpc/httpRpc';
import { ElMessage } from 'element-plus';

let router = useRouter();
const dialogFormVisible = ref(true);
const constFalse = ref(false);
const formLabelWidth = '100px'

const form = reactive({
	username: 'admin',
	password: '',
})

async function btnLogin() {
	let res = await httpClient.rpc().main.login(null, form.username);
	if (res.code === 0) {
		store.setToken(res.data.token);
		store.setUser({ "name": form.username });
		router.push("/");
	} else {
		ElMessage.error(res.errMsg);
	}

}
</script>


<style scoped>
.el-input {
	width: 300px;
}

.dialog-footer button:first-child {
	margin-right: 10px;
}
</style>