import { createApp } from 'vue';
import { createUI } from '../main';

import App from './App.vue';

createApp(App).use(createUI()).mount('#app');
