import { arrow as arrowModifier, flip as flipModifier, hide as hideModifier, offset as offsetModifier } from '@popperjs/core/lib/modifiers';
import { createPopper, Instance } from '@popperjs/core/lib/popper-lite';
import { debounce, isElement, isObject, isString } from 'lodash-es';
import { inject, isRef, onMounted, onUnmounted, PropType, Ref, watch } from 'vue';
import { useI18n } from 'vue-i18n';
import { error } from '../../common/logger';
import { BaseProps, GlobalPopperWrapKey } from '../../common/prefab';

/**
 * 虚拟元素定义
 * 您可以使用虚拟元素而不是真实的 DOM 元素作为Popper参考。
 */
export interface VirtualElement {
	getBoundingClientRect: () => DOMRect;
	contextElement?: Element;
}

export const isVirtualElement = (ve: VirtualElement): ve is VirtualElement => {
	return !!ve.getBoundingClientRect;
};

export type PopperMode = 'manul' | 'click' | 'hover' | 'click-out';

/**
 * 偏移量
 */
export interface PopperOffset {
	/**
	 * 参照物侧方向滑动偏移量
	 */
	skid?: number;
	/**
	 * 距离参照物距离偏移量
	 */
	distance?: number;
}

export type PopperPlacement =
	| 'auto'
	| 'auto-start'
	| 'auto-end'
	| 'top'
	| 'bottom'
	| 'left'
	| 'right'
	| 'top-start'
	| 'top-end'
	| 'bottom-start'
	| 'bottom-end'
	| 'right-start'
	| 'right-end'
	| 'left-start'
	| 'left-end'
	| undefined;

export const PopperProps = {
	...BaseProps,
	/**
	 * 参照物
	 * reference 可为DOM元素、虚拟DOM元素、vue refDOM对象、css选择器
	 */
	reference: {
		type: [Element, Object, String] as PropType<Element | VirtualElement | string>
	},
	/**
	 * 显示隐藏模式
	 * `manul` 根据 `display` 进行显示隐藏
	 * `click` 点击参照物显示，点击其他非参照物区域隐藏
	 * `hover` 鼠标进入参照物隐藏，移出隐藏
	 * `click-out` 点击参照物显示，移出参照物隐藏
	 */
	mode: {
		type: String as PropType<PopperMode>,
		default: 'hover'
	},
	/**
	 * 当参照物在裁剪区域内显示，参照物移动出裁剪区域则隐藏
	 */
	followReference: {
		type: Boolean as PropType<boolean>,
		default: false
	},
	/**
	 * 鼠标在popper上时是否允许隐藏
	 */
	canHideOnPopper: {
		type: Boolean as PropType<boolean>,
		default: true
	},
	/**
	 * 设置相对参照物的偏移
	 */
	offset: {
		type: Object as PropType<PopperOffset>,
		default() {
			return {
				distance: 8
			};
		}
	},
	/**
	 * 设置相对参照物的位置
	 */
	placement: {
		type: String as PropType<PopperPlacement>,
		default: 'bottom'
	}
};

export const extractDom = (propReference?: Element | VirtualElement | string) => {
	const { t } = useI18n();
	let reference: Element | VirtualElement | undefined;
	if (isString(propReference)) {
		const _reference = document.querySelector(propReference);
		if (_reference) {
			reference = _reference;
		}
	} else if (isElement(propReference)) {
		reference = propReference as Element;
	} else if (isObject(propReference)) {
		if (isVirtualElement(propReference)) {
			reference = propReference;
		} else {
			const el = Object.getOwnPropertyDescriptor(propReference, '$el');
			reference = el?.get?.apply(propReference);
		}
	}
	if (!reference) {
		throw error(t('message._lib_.errors.inValidProp', ['reference']));
	}
	return reference;
};

const resetOffset = (popperInstance: Instance, offset: number[]) => {
	popperInstance.setOptions((options) => ({
		...options,
		modifiers: [
			...(options.modifiers || []),
			{
				name: 'offset',
				options: {
					offset
				}
			}
		]
	}));
	popperInstance.update();
};

const resetPlacement = (popperInstance: Instance, placement: PopperPlacement) => {
	popperInstance.setOptions((options) => ({
		...options,
		placement
	}));
	popperInstance.update();
};

const _show = (popperInstance: Instance, popperDom: HTMLElement) => {
	// Make the tooltip visible
	if (popperDom.hasAttribute('data-show')) return;
	popperDom.setAttribute('data-show', '');

	// Enable the event listeners
	popperInstance.setOptions((options) => ({
		...options,
		modifiers: [...(options.modifiers || []), { name: 'eventListeners', enabled: true }]
	}));

	// Update its position
	popperInstance.update();
};

const _hide = (popperInstance: Instance, popperDom: HTMLElement) => {
	// Hide the tooltip
	if (!popperDom.hasAttribute('data-show')) return;
	popperDom.removeAttribute('data-show');

	// Disable the event listeners
	popperInstance.setOptions((options) => ({
		...options,
		modifiers: [...(options.modifiers || []), { name: 'eventListeners', enabled: false }]
	}));
};

export type PopperOptions = {
	placement?: Ref<PopperPlacement> | PopperPlacement;
	offset?: Ref<Array<number>> | Array<number>;
	mode?: PopperMode;
	display?: Ref<boolean>;
	canHideOnPopper?: boolean;
};

export const usePopper = (referenceDom: HTMLElement | VirtualElement, popperDom: Ref<HTMLElement | undefined>, options?: PopperOptions) => {
	let instance: Instance;
	const { t } = useI18n();

	const popperWrapKey = inject(GlobalPopperWrapKey);
	const popperTo = `div[data-o-key=${popperWrapKey}].o-popper-wrap`;

	if (!popperWrapKey) {
		throw error(t('message._lib_.errors.whereIsNoPopWapper'));
	}

	const { offset, placement, mode, display, canHideOnPopper } = options || {};

	if (isRef(offset)) {
		watch(offset, (newOffset) => {
			resetOffset(instance, newOffset);
		});
	}

	if (isRef(placement)) {
		watch(placement, (newPlacement) => {
			resetPlacement(instance, newPlacement);
		});
	}

	const clickModeShow = () => {
		if (popperDom.value && referenceDom) {
			_show(instance, popperDom.value);
		}
	};

	const clickModeHide = (event: Event) => {
		const paths = event.composedPath();
		if (popperDom.value && referenceDom) {
			if (!(referenceDom instanceof Element && (paths.includes(referenceDom) || paths.includes(popperDom.value)))) {
				_hide(instance, popperDom.value);
			}
		}
	};

	/**
	 * 显示
	 */
	const show = () => {
		if (popperDom.value && referenceDom) {
			_show(instance, popperDom.value);
		}
	};

	const hide = () => {
		if (popperDom.value && referenceDom) {
			_hide(instance, popperDom.value);
		}
	};

	const debounceHide = debounce((_event) => {
		if (popperDom.value && referenceDom) {
			if (_event) {
				const paths = _event.path;
				if (!(referenceDom instanceof Element && (paths.includes(referenceDom) || paths.includes(popperDom.value)))) {
					_hide(instance, popperDom.value);
				}
			}
		}
	}, 200);

	onMounted(() => {
		if (popperDom.value && referenceDom) {
			instance = createPopper(referenceDom, popperDom.value, {
				placement: isRef(placement) ? placement.value : placement,
				modifiers: [
					flipModifier,
					{
						...offsetModifier,
						options: {
							offset: isRef(offset) ? offset.value : offset ? offset : [0, 0]
						}
					},
					arrowModifier,
					hideModifier
				]
			});
		}

		switch (mode) {
			case 'manul': {
				if (display) {
					watch(display, (flag) => {
						if (flag) {
							show();
						} else {
							hide();
						}
					});
				}
				break;
			}
			case 'click': {
				if (referenceDom instanceof Element) {
					referenceDom.addEventListener('click', clickModeShow, true);
					document.addEventListener('click', clickModeHide, true);
				}
				break;
			}
			case 'hover': {
				if (referenceDom instanceof Element) {
					referenceDom.addEventListener('mouseenter', show, true);
					document.addEventListener('mouseover', canHideOnPopper ? hide : debounceHide, true);
				}
				break;
			}
			case 'click-out': {
				if (referenceDom instanceof Element) {
					referenceDom.addEventListener('click', show, true);
					document.addEventListener('mouseover', canHideOnPopper ? hide : debounceHide, true);
				}
				break;
			}
		}
	});

	onUnmounted(() => {
		if (instance) {
			instance.destroy();
		}

		switch (mode) {
			case 'click': {
				if (referenceDom instanceof Element) {
					referenceDom.removeEventListener('click', clickModeShow, true);
					document.removeEventListener('click', clickModeHide, true);
				}
				break;
			}
			case 'hover': {
				if (referenceDom instanceof Element) {
					referenceDom.removeEventListener('mouseenter', show, true);
					document.removeEventListener('mouseover', canHideOnPopper ? hide : debounceHide, true);
				}
				break;
			}
			case 'click-out': {
				if (referenceDom instanceof Element) {
					referenceDom.removeEventListener('click', show, true);
					document.removeEventListener('mouseover', canHideOnPopper ? hide : debounceHide, true);
				}
			}
		}
	});

	return {
		popperTo,
		show,
		hide
	};
};

export {};
