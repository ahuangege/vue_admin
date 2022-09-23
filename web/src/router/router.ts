import { createRouter, createWebHashHistory, type RouteRecordRaw } from 'vue-router'

// 我们后面再讨论嵌套路由。
let routes: RouteRecordRaw[] = [
	{
		name: "404",
		path: '/:pathMatch(.*)*',
		component: () => import('@/components/NotFound.vue')
	},
	{
		name: "dashboard",
		path: '/',
		component: () => import('@/views/dashboard/DashBoard.vue')
	},
	{
		name: "login",
		path: '/login',
		component: () => import('@/views/login/login.vue')
	},
	{
		path: '/serverinfo',
		children: [
			{
				path: 'list',
				component: () => import('@/views/serverlist/ServerList.vue')
			},
			{
				path: 'action',
				children: [
					{
						path: 'start',
						component: () => import('@/views/serverstart/ServerStart.vue')
					}
				]
			}
		]
	},
]

// 3. 创建路由实例并传递 `routes` 配置
// 你可以在这里输入更多的配置，但我们在这里
// 暂时保持简单
const router = createRouter({
	// 4. 内部提供了 history 模式的实现。为了简单起见，我们在这里使用 hash 模式。
	history: createWebHashHistory(),
	routes, // `routes: routes` 的缩写
});

export default router;