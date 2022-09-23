import { createRouter, createWebHashHistory, type RouteRecordRaw } from 'vue-router'

import NotFoundVue from '@/components/NotFound.vue';
import DashBoardVue from '@/views/dashboard/DashBoard.vue';
import ServerListVue from '@/views/serverlist/ServerList.vue';
import ServerStartVue from '@/views/serverstart/ServerStart.vue';
import ChangeNameVue from '@/views/changeName/ChangeName.vue';

// 我们后面再讨论嵌套路由。
let routes: RouteRecordRaw[] = [
	{
		name: "404",
		path: '/:pathMatch(.*)*',
		component: NotFoundVue
	},
	{
		name: "dashboard",
		path: '/',
		component: DashBoardVue
	},
	{
		name: "changename",
		path: '/changename',
		component: ChangeNameVue,
	},
	{
		name: "login",
		path: '/login',
		component:  () => import('@/views/login/login.vue')
	},
	{
		path: '/serverinfo',
		children: [
			{
				path: 'list',
				component: ServerListVue
			},
			{
				path: 'action',
				children: [
					{
						path: 'start',
						component: ServerStartVue
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