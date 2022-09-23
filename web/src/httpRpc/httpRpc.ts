import axios from 'axios'
import { ElMessageBox, ElMessage } from 'element-plus'
import store from '@/store/store';
import { createHttpRpcClient } from 'i-http-rpc';
import router from "../router/router";
import type { httpRpc_admin } from "./httpRpc_admin";

// create an axios instance
const service = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
    timeout: 5000 // request timeout
})

// request interceptor
service.interceptors.request.use(
    (config) => {
        // do something before request is sent
        let token = store.getToken()
        if (token) {
            // let each request carry token
            // ['X-Token'] is a custom headers key
            // please modify it according to the actual situation
            if (config.headers) {
                config.headers['X-Token'] = token;
            }
        }
        return config;
    },
    (error) => {
        // do something with request error
        console.log(error) // for debug
        return Promise.reject(error);
    }
)

// response interceptor
service.interceptors.response.use(response => {
    const res: { "code": number, "errMsg"?: string, "data": any } = response.data;
    if (res.code !== 0) {
        ElMessage({
            message: res.errMsg || 'Error',
            type: 'error',
            duration: 5 * 1000
        })

        // token not ok;
        if (res.code === 80004) {
            store.setToken("");
            store.setUser(null as any);
            router.push({ "path": "/login" });
        }
        return Promise.reject(new Error(res.errMsg || 'Error'))
    } else {
        return res.data;
    }
},
    error => {
        console.log('err' + error) // for debug
        ElMessage({
            message: error.message,
            type: 'error',
            duration: 5 * 1000
        })
        return Promise.reject(error)
    }
)


/**  http 发送函数 */
async function httpRequest(initOptions: any, options: any, cmds: string[], args: any[]): Promise<any> {
    return service.request({
        "method": "POST",
        "data": {
            "file": cmds[0],
            "method": cmds[1],
            "args": args
        },
    });
}

export let httpClient = createHttpRpcClient<httpRpc_admin>({ "url": "", "httpRequest": httpRequest });
