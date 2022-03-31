<template>
	<slot><!--默认插槽--></slot>
	<ul>
		<li v-for="(item, index) in items" :key="index">
			<slot name="item" :data="item" dd="aa">
				<!--选项插槽-->
				<!--data {title:'标题',content:'内容'}-->
			</slot>
		</li>
	</ul>
</template>
<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
	data() {
		return {
			items: [
				{ title: 'title1', content: 'content1' },
				{ title: 'title2', content: 'content2' }
			]
		};
	}
});
</script>
<style lang=""></style>
