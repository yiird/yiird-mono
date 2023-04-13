import { YE, type YEOptions } from '@yiird/elements';
import { createApp } from 'vue';

import App from './App.vue';

const options: YEOptions = {
    prefix: 'y'
};

createApp(App).use(YE, options).mount('#app');
