import { createApp } from 'vue'
import installRouter from './router.js';
import App from './App.vue'

const app = createApp(App);

installRouter(app);

app.mount('#app');
