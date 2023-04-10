import screenfull from 'screenfull';
import { isRef, onMounted, onUnmounted, Ref, ref, watch } from 'vue';
import { info } from '../common/logger';
import { checkClickOnElements } from './dom';

/**
 * 判断点击事件是否在制定元素上
 * @param enabled 是否启用
 * @param els 被检测元素
 */
export const useCheckClickOnElements = (enabled: Ref<boolean>, ...els: Array<Ref<HTMLElement | undefined>>) => {
	const isOnElement = ref(false);
	let checkIfBlur: (event: MouseEvent) => void;

	onMounted(() => {
		if (enabled.value) {
			checkIfBlur = checkClickOnElements(els, (_flag) => {
				isOnElement.value = _flag;
			});
			document.addEventListener('click', checkIfBlur, true);
		}
	});

	onUnmounted(() => {
		if (checkIfBlur) {
			document.removeEventListener('click', checkIfBlur, true);
		}
	});
	return { isOnElement };
};

/**
 * 将目标全屏显示
 * @param element 目标
 */
export const useFullscreen = (element?: Ref<HTMLElement | undefined> | HTMLElement) => {
	let target: HTMLElement | undefined;
	/**
	 * 设置全屏显示
	 */
	const doFullscreen = () => {
		if (screenfull.isEnabled) {
			screenfull.toggle(target);
		} else {
			info('全屏模式不可用');
		}
	};
	if (isRef(element)) {
		watch(element, (el) => {
			target = el;
		});
	} else {
		target = element;
	}
	return { doFullscreen };
};
