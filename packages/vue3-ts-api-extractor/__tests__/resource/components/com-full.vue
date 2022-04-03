<template>
	<slot><!--默认插槽--></slot>
	<ul>
		<li v-for="(item, index) in items" :key="index">
			<slot name="item" :data="item" :index="index">
				<!--选项插槽-->
				<!-- @param {Data} data 说明说明说明说明说明说明说明说明说明说明 -->
				<!-- @param {Number} index 序号 -->

				<!-- @typedef Data data数据类型 -->
				<!-- @property {String} title  d骄傲就是大家都送傲娇的风景都是电视剧发哦大家佛啊三等奖 -->
				<!-- @property {Foo} content 就啊时间的发酵时都if骄傲大数据佛啊就是对发生的风 -->

				<!-- @typedef Foo foo数据类型 -->
				<!-- @property {String} arg1  第一个参数-->
				<!-- @property {Number} arg2 第二个参数 -->
			</slot>
		</li>
	</ul>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import { ComDProps } from './assist/ComDProps';

type Foo = {
	o: string;
	b: object;
};

/**
 * ComC Description
 *
 * @author Lou Fei
 * @name ComFull
 * @date 2015-12-12 11:22
 */
export default defineComponent({
	props: ComDProps,
	emits: ['do-click', 'do-click-2', 'do-click-3'],
	setup(props, { emit }) {
		const arg1 = 0;
		const arg2 = {
			o: 'o',
			b: 'b'
		};

		/**
		 * @typedef Foo
		 * @property o {string} property o's description
		 * @property b {string} property b's description
		 */
		/**
		 * do-click 事件
		 * @param arg1 {Number} arg1 description
		 * @param arg2 {Foo} arg2 description
		 */
		emit('do-click', arg1, arg2);

		/**
		 * @typedef Foo2
		 * @property o {string} property o's description
		 * @property b {string} property b's description
		 */
		/**
		 * do-click2 事件
		 * @param arg1 {Foo2} arg1 description
		 */
		emit('do-click-2', {
			a: '0',
			b: '1'
		});

		return {};
	},
	data() {
		return {
			items: [
				{ title: 'title1', content: 'content1' },
				{ title: 'title2', content: 'content2' }
			]
		};
	},

	methods: {
		/**
		 * Fn1 description
		 *
		 * @param arg1 {String} arg1 description
		 * @param arg2 {String} arg2 description
		 */
		fn1(arg1: string, arg2: number): string {
			console.log(arg1, arg2);
			return '';
		},
		/**
		 * @typedef NestFoo
		 * @property b_1 {string} property b_1's description
		 * @property b_2 {number} property b_2's description
		 */
		/**
		 * @typedef Foo
		 * @property o {string} property o's description
		 * @property b {NestFoo} property b's description
		 */
		/**
		 * Fn2 description
		 *
		 * @param arg1 {string} arg1 description
		 * @param arg2 {Foo} arg2 description
		 */
		fn2(arg1: string, arg2: Foo): string {
			console.log(arg1, arg2);
			return '';
		}
	}
});
</script>
<style lang=""></style>
