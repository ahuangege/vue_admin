import { createApp } from 'vue'
import App from './App.vue'
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';
import router from './router/router';
import '@/router/permission';



let app = createApp(App);
app.use(ElementPlus);
app.use(router);

app.config.errorHandler = function (err) {
    console.error(err);
}

app.mount('#app');
