import { createApp } from 'vue';
import { ElementOptions, YE } from '../packages';
import App from './App.vue';
const app = createApp(App);
const options: ElementOptions = {
    prefix: 'y'
};
app.use(YE, options);

app.mount('#app');
