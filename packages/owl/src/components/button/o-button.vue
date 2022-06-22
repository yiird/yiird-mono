<template>
	<div v-show="display__" v-if="refresh__" :id="id__" :class="block" :style="{ ...theme__?.vars }">
		<!-- 这是一个slot -->
		<!-- @param {String} arg0 参数描述 -->
		<!-- @param {Arg1} arg1 参数描述 -->
		<slot arg0="111" :arg1="{}"></slot>
		<div :class="el_text"></div>
		<o-icon>ddddd</o-icon>
	</div>
</template>

<script lang="tsx">
import { defineComponent } from 'vue';
import { useCommon } from '../../common/logic';
import { cssVars, elements, props } from './definition';

/**
 * Arg1说明
 */
interface Arg1 {
	/**
	 * 年龄
	 */
	age: string;
}

/**
 * Button使用
 * @name OButton
 */
export default defineComponent({
	name: 'Button',
	props: props,
	setup(props, ctx) {
		const prefab = useCommon({ props, ctx, cssVars, elements });
		const { bem__, theme__, domRefresh: domRefresh2 } = prefab;
		setTimeout(() => {
			bem__.addModifiers(['red']);
			bem__.addModifiers(['red'], 'text');
			theme__.setVar('b', 'bbbbbbbb');
		}, 2000);

		setTimeout(() => {
			bem__.removeModifiers(['red']);
		}, 5000);

		return {
			...prefab,
			block: bem__.block(),
			el_text: bem__.element('text'),
			domRefresh2
		};
	},
	methods: {
		doClick() {
			console.log(111);
		}
	}
});
</script>

<style lang="scss" scoped>
@import './style.scss';
</style>
