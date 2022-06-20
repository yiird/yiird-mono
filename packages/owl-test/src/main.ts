import { createUI, ThemeNormal } from '@yiird/owl';
import '@yiird/owl/style';
import { createApp } from 'vue';
import App from './App.vue';

createApp(App).use(createUI(ThemeNormal)).mount('#app');
