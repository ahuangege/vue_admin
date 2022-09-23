import router from './router'
import { ElMessage } from 'element-plus'
import store from '@/store/store';

const whiteList = ['/login'] // no redirect whitelist

// router.beforeEach(async (to, from, next) => {

//     // determine whether the user has logged in
//     const token = store.getToken()

//     if (token) {
//         if (to.path === '/login') {
//             // if is logged in, redirect to the home page
//             next({ path: '/' });
//         } else {
//             const userINfo = store.getUser();
//             if (userINfo) {
//                 next();
//             } else {
//                 try {
//                     // get user info
//                     await store.dispatch('user/getInfo')

//                     next()
//                 } catch (error) {
//                     // remove token and go to login page to re-login
//                     await store.dispatch('user/resetToken')
//                     ElMessage.error(error || 'Has Error')
//                     next(`/login?redirect=${to.path}`)
//                     NProgress.done()
//                 }
//             }
//         }
//     } else {
//         /* has no token*/
//         if (whiteList.includes(to.path)) {
//             // in the free login whitelist, go directly
//             next()
//         } else {
//             // other pages that do not have permission to access are redirected to the login page.
//             next({ path: '/login' });
//         }
//     }
// })

// router.afterEach(() => {

// })
