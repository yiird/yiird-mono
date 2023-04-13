import { createApp } from 'vue';
import { YE } from '../packages';
import App from './App.vue';
import './assets/main.css';

const app = createApp(App);
app.use(YE, {});
app.mount('#app');
