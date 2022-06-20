import vue from '@vitejs/plugin-vue';
import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [
		vue()
		// Components({
		// 	resolvers: [
		// 		// example of importing Vant
		// 		(componentName) => {
		// 			// where `componentName` is always CapitalCase
		// 			if (componentName.startsWith('O')) return { name: componentName.slice(1), from: '@yiird/owl' };
		// 		}
		// 	]
		// })
	]
});
