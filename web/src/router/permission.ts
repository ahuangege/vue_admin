import router from './router'
import { ElMessage } from 'element-plus'
import store from '@/store/store';
import { httpClient } from '@/httpRpc/httpRpc';

const whiteList = ['/login'] // no redirect whitelist

router.beforeEach(async (to, from, next) => {

    // determine whether the user has logged in
    const token = store.getToken()

    if (token) {
        if (to.path === '/login') {
            // if is logged in, redirect to the home page
            next({ "path": "/" });
        } else {
            const user = store.getUser();
            if (user) {
                next();
            } else {
                let res = await httpClient.rpc().main.loginByToken(null, token);
                if (res.code === 0) {
                    store.setUser(res.data);
                    next();
                } else {
                    store.setToken("");
                    ElMessage.error(res.errMsg);
                    next({ path: '/login' });
                }
            }
        }
    } else {
        /* has no token*/
        if (whiteList.includes(to.path)) {
            // in the free login whitelist, go directly
            next()
        } else {
            // other pages that do not have permission to access are redirected to the login page.
            next({ path: '/login' });
        }
    }
})

router.afterEach(() => {

})
