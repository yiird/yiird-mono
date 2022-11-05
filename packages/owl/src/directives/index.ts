import { Directive } from 'vue';

export const tooltip: Directive = {
	created(el, binding, vnode, prevVnode) {
		console.log('created', el, binding, vnode, prevVnode);
		// 下面会介绍各个参数的细节
	},
	// 在元素被插入到 DOM 前调用
	beforeMount(el, binding, vnode, prevVnode) {
		console.log('beforeMount', el, binding, vnode, prevVnode);
	},
	// 在绑定元素的父组件
	// 及他自己的所有子节点都挂载完成后调用
	mounted(el, binding, vnode, prevVnode) {
		console.log('mounted', el, binding, vnode, prevVnode);
	},
	// 绑定元素的父组件更新前调用
	beforeUpdate(el, binding, vnode, prevVnode) {
		console.log('beforeUpdate', el, binding, vnode, prevVnode);
	},
	// 在绑定元素的父组件
	// 及他自己的所有子节点都更新后调用
	updated(el, binding, vnode, prevVnode) {
		console.log('updated', el, binding, vnode, prevVnode);
	},
	// 绑定元素的父组件卸载前调用
	beforeUnmount(el, binding, vnode, prevVnode) {
		console.log('beforeUnmount', el, binding, vnode, prevVnode);
	},
	// 绑定元素的父组件卸载后调用
	unmounted(el, binding, vnode, prevVnode) {
		console.log('unmounted', el, binding, vnode, prevVnode);
	}
};
