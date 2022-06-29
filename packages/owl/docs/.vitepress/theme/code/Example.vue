<template>
	<div class="example" :style="{ width: width }">
		<div class="example-render-wrap" :style="{ height: iframeHeight }">
			<iframe ref="codeRender" :src="fullExampleSrc" scrolling="no"></iframe>
		</div>
		<div v-if="slots.default" class="example-description-wrap">
			<div class="example-description"><slot></slot></div>
		</div>

		<div v-show="ifShowCode" class="example-code-warp">
			<div class="language-vue">
				<span class="copy"></span>
				<pre ref="codeContainer"></pre>
			</div>
		</div>
		<div class="example-footer-warp">
			<font-awesome-icon :icon="faCode" fixed-width></font-awesome-icon>
			<span @click="ifShowCode = !ifShowCode"> 查看源码</span>
		</div>
	</div>
</template>

<script lang="ts">
import { faCode } from '@fortawesome/free-solid-svg-icons';

import axios from 'axios';
import { getHighlighter, setCDN } from 'shiki';
import { withBase } from 'vitepress';
import { defineComponent, onMounted, ref, watchEffect } from 'vue';

setCDN(withBase('/shiki/'));

export default defineComponent({
	props: {
		name: {
			type: String,
			required: true
		},
		width: {
			type: String,
			default: '100%'
		}
	},
	setup(props, { slots }) {
		const iframeHeight = ref('auto');
		const ifShowCode = ref(false);
		const codeText = ref<string>('');
		const prettierCode = ref<string>();
		const codeContainer = ref<HTMLDivElement>();
		const codeRender = ref<HTMLIFrameElement>();
		const isDark = ref(localStorage.getItem('vitepress-theme-appearance') === 'dark');

		onMounted(() => {
			window.addEventListener('click', (event) => {
				if ((event.target as HTMLDivElement).classList.contains('VPSwitchAppearance')) {
					const appearance = localStorage.getItem('vitepress-theme-appearance');
					if (appearance === 'dark') {
						isDark.value = true;
					} else {
						isDark.value = false;
					}
				}
			});
			window.addEventListener(
				'message',
				(event) => {
					const iframe = codeRender.value;
					const contentWindow = iframe?.contentWindow;
					if (event.data === 'ready' && iframe) {
						if (contentWindow) {
							contentWindow.postMessage(props.name, '*');
							const scrollHeight = contentWindow.document.body.scrollHeight;
							if (scrollHeight && scrollHeight > 0) {
								console.log('scrollHeight:', scrollHeight);
								iframeHeight.value = scrollHeight + 'px';
							}
						}
					}
				},
				false
			);
		});

		watchEffect(() => {
			const preRE = /^<pre.*?>/;
			const theme = isDark.value ? 'material-palenight' : 'material-lighter';
			getHighlighter({
				themes: ['material-lighter', 'material-palenight'],
				paths: {
					themes: withBase('themes/'),
					languages: withBase('languages/')
				}
			}).then((highlighter) => {
				prettierCode.value = highlighter.codeToHtml(codeText.value, { lang: 'vue', theme: theme }).replace(preRE, '<pre>');
				if (codeContainer.value && prettierCode) {
					codeContainer.value.outerHTML = prettierCode.value;
				}
			});
		});

		axios.get('/example-components/' + props.name + '.vue').then((result) => {
			codeText.value = result.data;
		});

		const fullExampleSrc = withBase('/iframe-content');

		// setInterval(() => {
		// 	ifShowSeeSource.value = !ifShowSeeSource.value;
		// }, 2000);

		return { slots, ifShowCode, faCode, iframeHeight, codeContainer, codeRender, fullExampleSrc };
	}
});
</script>

<style lang="scss" scoped>
.example {
	border: 1px solid var(--vp-c-divider-light);
	border-radius: 5px;
	iframe {
		border: 0;
		width: 100%;
		height: 100%;
		display: block;
	}
	.example-render-wrap {
		overflow: hidden;
		padding: 5px;
	}
	.example-description-wrap {
		font-size: 0.9rem;
		background-color: #f1e5bc;
		.example-description {
			color: rgba(60, 60, 60, 0.7);
			padding: 20px 15px;
			line-height: 1.57rem;
		}
	}

	.example-code-warp {
		> div[class^='language'] {
			margin-top: 0;
			margin-bottom: 0;
		}
	}
	.example-footer-warp {
		text-align: center;
		line-height: 2rem;
		border-top: 1px solid var(--vp-c-divider-light);
		color: darkcyan;
		position: relative;
		cursor: pointer;
	}
}
</style>
