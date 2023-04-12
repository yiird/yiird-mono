<template>
	<div
		v-show="display__"
		v-if="refresh__"
		:id="id__"
		:class="block"
		:style="{ ...theme.vars }"></div>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import { usePrefab } from '../../common/prefab';
import { GlobalThemeKey } from '../../theme';
import { ChatProps } from './definition';
import type { ChatBemKeys, ChatVariables } from './definition';

/**
 * Chat使用
 * @name OChat
 */
export default defineComponent({
	name: 'OChat',
	props: ChatProps,
	setup(props, { emit }) {
		const prefab = usePrefab<ChatVariables, ChatBemKeys>(props);

		return {
			...prefab
		};
	}
});
</script>
<style lang="scss" scoped>
@import './style.scss';
</style>
