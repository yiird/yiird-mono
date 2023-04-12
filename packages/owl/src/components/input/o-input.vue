<template>
	<div
		v-show="display__"
		v-if="refresh__"
		:id="id__"
		v-bind="$attrs"
		ref="component"
		:class="block"
		:style="{ ...theme.vars }">
		<div
			v-if="obtainHasPrefix"
			:class="el_prefix">
			<icon
				v-if="obtainPrefixIcon"
				fixed-width
				v-bind="obtainPrefixIcon"
				:prefix="undefined"
				@click="onPrefixIconClick"></icon>
			{{ obtainPrefixText }}
			<!-- 前缀 -->
			<!-- @param {String} text 前缀文本 -->
			<slot
				name="prefix"
				:text="prefixText"></slot>
		</div>
		<input
			ref="input"
			v-model="obtainValue"
			:class="el_input"
			:placeholder="obtainPlaceholder"
			:type="obtainType"
			@keydown.enter.stop="onEnterPress"
			@blur="onBlur"
			@focus="onFocus" />

		<!-- loading icon -->
		<div
			v-if="obtainLoading"
			:class="el_loading">
			<icon
				icon="spinner"
				animation="spin"
				prefix="fat"
				:animation-options="{ animationDuration: '1.5s' }"></icon>
		</div>

		<!-- remove icon -->
		<div :class="el_remove">
			<icon
				icon="remove"
				prefix="fat"
				@click.prevent="onRemoveClick"></icon>
		</div>

		<!-- password icon -->
		<div
			v-if="type === 'password'"
			:class="el_password">
			<icon
				fixed-width
				prefix="fat"
				:icon="obtainPasswordEye"
				@click.prevent="onPasswordEyeClick"></icon>
		</div>

		<!-- suffix -->
		<div
			v-if="obtainHasSuffix"
			:class="el_suffix">
			{{ obtainSuffixText }}
			<!-- 后缀 -->
			<!-- @param {String} text 后缀文本 -->
			<slot
				name="suffix"
				:text="suffixText"></slot>
			<icon
				v-if="obtainSuffixIcon"
				fixed-width
				v-bind="obtainSuffixIcon"
				:prefix="undefined"
				@click="onSuffixIconClick"></icon>
		</div>
	</div>
	<popper
		v-if="obtainHasPopper"
		mode="manul"
		:display="showPopper"
		placement="bottom-start"
		bg-color="white"
		:reference="component">
		<calendar
			ref="popper"
			v-model="value"
			@selected-day="onSelectedDay"></calendar>
	</popper>
</template>

<script lang="ts">
import { library, type IconDefinition, type IconName } from '@fortawesome/fontawesome-svg-core';
import { faEye, faEyeSlash, faRemove, faSpinner } from '@fortawesome/pro-thin-svg-icons';
import { isNumber } from 'lodash-es';
import { defineComponent, nextTick, ref, watch, watchEffect, computed, type PropType } from 'vue';
import { useCheckClickOnElements } from '../../common/composable';
import { toRealType } from '../../common/dom';
import { BaseProps, usePrefab } from '../../common/prefab';
import { Calendar } from '../calendar';
import { Icon } from '../icon';
import { Popper } from '../popper';
import { type EventBinding, getIcon, type InputBemKeys, InputProps, type InputVariables, type InputSize, type InputIcon } from './definition';
library.add(faEye, faEyeSlash, faRemove, faSpinner);
/**
 * :::warning 功能描述
 * 此组件为文本域组件，[查看样例](/examples/text)。
 *
 * 1、可用`v-model`进行数据绑定
 *
 * 2、支持前、后缀图标和文本
 *
 * 3、支持前、后缀文本绑定到值
 *
 * 4、支持表单内使用、表格内使用、单独使用
 *
 * 5、支持数据校验
 *
 * 6、支持类型复原，比如输入字符串为数字，绑定值会转化为数字类型；输入字符串为boolean，绑定值会转化为boolean类型，undefined会转为null
 *
 * 7、支持输入类型：文本类型🟢、密码模式🟢、日期模式🔴、日期时间模式🔴、时间模式🔴
 * :::
 *
 * ## Css 变量
 *
 * `--o-input-color` 字体颜色
 *
 * `--o-input-placeholder-color` 提示语颜色
 *
 * `--o-input-line-height` 行高
 *
 * `--o-input-border-color` 边框颜色
 *
 * `--o-input-prefix-bg-color` 前缀背景色
 *
 * `--o-input-suffix-bg-color` 后缀背景色
 */
export default defineComponent({
	name: 'OInput',
	components: {
		Icon,
		Popper,
		Calendar
	},
	props: InputProps,
	emits: ['update:modelValue', 'blur', 'focus', 'click-suffix-icon', 'click-prefix-icon'],
	setup(props, { slots, emit }) {
		const prefab = usePrefab<InputVariables, InputBemKeys>(props);

		const { theme, bem } = prefab;

		const block = bem.block;
		const elements = bem.elements;
		const popper = ref<HTMLElement>();
		const component = ref<HTMLElement>();
		const input = ref<HTMLElement>();
		const value = ref();
		const focus = ref(false);

		const showPopper = ref(false);

		const obtainHasPopper = computed(() => {
			return props.type === 'date' && !!component.value;
		});

		const obtainPlaceholder = computed(() => props.placeholder);

		const obtainPrefixText = computed(() => {
			return !slots.prefix ? props.prefixText : undefined;
		});
		const obtainSuffixText = computed(() => {
			return !slots.suffix ? props.suffixText : undefined;
		});

		const obtainHasPrefix = computed(() => {
			return !!slots.prefix || props.prefix || props.prefixText;
		});

		const obtainHasSuffix = computed(() => {
			return props.type === 'text' && (!!slots.suffix || props.suffix || props.suffixText);
		});
		const obtainSize = computed(() => 'size-' + props.size);

		const obtainSuffixIcon = computed(() => {
			const suffix = props.suffix;
			if (suffix) return getIcon(suffix);
			return undefined;
		});

		const obtainPrefixIcon = computed(() => {
			const prefix = props.prefix;
			if (prefix) return getIcon(prefix);
			return undefined;
		});

		const obtainValue = computed({
			get() {
				if (value.value) {
					return value.value;
				} else {
					let realValue: any = undefined;
					if (props.modelValue) {
						if (props.prefixText && props.modelValue?.startsWith(props.prefixText)) {
							realValue = props.modelValue.substring(props.prefixText?.length);
						}
						if (props.suffixText && props.modelValue?.endsWith(props.suffixText)) {
							const startIndex = props.modelValue.length - props.suffixText.length;
							realValue = props.modelValue.substring(0, startIndex);
						}
					}
					//TODO 临时去掉
					//value.value = realValue;
					return realValue;
				}
			},
			set(_value) {
				let realValue = _value;
				value.value = _value;
				if (realValue) {
					if (props.bind === 'all') {
						realValue = `${props.prefixText}${_value}${props.suffixText}`;
					} else if (props.bind === 'prefix') {
						realValue = `${props.prefixText}${_value}`;
					} else if (props.bind === 'suffix') {
						realValue = `${_value}${props.suffixText}`;
					}
				}
				/**
				 * @private
				 */
				emit('update:modelValue', realValue);
			}
		});

		const showPassword = ref(false);

		const obtainPasswordEye = computed(() => (showPassword.value ? 'eye' : 'eye-slash'));

		const obtainLoading = computed(() => props.loading);

		const obtainReadonly = computed(() => props.readonly);

		const obtainDisabled = computed(() => props.disabled);
		const obtainFocus = computed(() => (focus.value ? 'focus' : ''));

		bem.addModifier(obtainSize, obtainFocus);

		/**
		 * @private
		 */
		const onPasswordEyeClick = () => {
			showPassword.value = !showPassword.value;
			if (showPassword.value) {
				bem.addElementModifier('password', 'show');
			} else {
				bem.removeElementModifier('password', 'show');
			}
		};

		const obtainType = computed(() => {
			if (props.type === 'password' && !showPassword.value) {
				return 'password';
			} else {
				return 'text';
			}
		});

		/**
		 * @private
		 */
		const onRemoveClick = () => {
			obtainValue.value = '';
		};

		watchEffect(() => {
			if (props.radius) {
				bem.addModifier('radius');
				if (isNumber(props.radius)) {
					theme.originVars.radius = `${props.radius}rem`;
				}
			} else {
				bem.removeModifier('radius');
			}
		});

		/**
		 * @private
		 */
		const onFocus = (e: FocusEvent) => {
			if (obtainHasPopper.value) {
				showPopper.value = true;
			}
			const binding: EventBinding = {
				event: e,
				value: toRealType(obtainValue.value)
			};
			focus.value = true;
			/**
			 * 获得焦点
			 * @argument {EventBinding} binding 回调参数
			 */
			emit('focus', binding);
		};

		const _doBlur = (e: FocusEvent) => {
			if (obtainHasPopper.value) {
				showPopper.value = false;
			}
			focus.value = false;
			const binding: EventBinding = {
				event: e,
				value: toRealType(obtainValue.value)
			};
			/**
			 * 失去焦点
			 * @argument {EventBinding} binding 回调参数
			 */
			emit('blur', binding);
		};

		/**
		 * @private
		 */
		const onBlur = (e: FocusEvent) => {
			if (!obtainHasPopper.value) {
				_doBlur(e);
			}
		};

		/**
		 * @private
		 */
		const onPrefixIconClick = (e: PointerEvent) => {
			const binding: EventBinding = {
				event: e,
				value: toRealType(obtainValue.value)
			};
			/**
			 * 前缀图标单击事件
			 * @argument {EventBinding} binding 回调参数
			 */
			emit('click-prefix-icon', binding);
		};

		/**
		 * @private
		 */
		const onSuffixIconClick = (e: PointerEvent) => {
			const binding: EventBinding = {
				event: e,
				value: toRealType(obtainValue.value)
			};
			/**
			 * 后缀图标单击事件
			 * @argument {EventBinding} binding 回调参数
			 */
			emit('click-suffix-icon', binding);
		};

		const onSelectedDay = () => {
			nextTick(() => {
				input.value?.focus();
			});
		};

		const onEnterPress = (e: KeyboardEvent) => {
			if (e.target instanceof HTMLInputElement) {
				e.target.blur();
			}
		};
		const { isOnElement } = useCheckClickOnElements(obtainHasPopper, component, popper);
		watch(isOnElement, (flag) => {
			if (!flag) {
				const e = new FocusEvent('blur', {
					relatedTarget: input.value
				});
				_doBlur(e);
			}
		});

		return {
			...prefab,
			theme,
			block,
			el_prefix: elements.prefix,
			el_suffix: elements.suffix,
			el_input: elements.input,
			el_password: elements.password,
			el_remove: elements.remove,
			el_loading: elements.loading,
			value,
			obtainValue,
			obtainPlaceholder,
			obtainHasPrefix,
			obtainHasSuffix,
			obtainPrefixIcon,
			obtainSuffixIcon,
			obtainPrefixText,
			obtainSuffixText,
			obtainPasswordEye,
			obtainType,
			obtainLoading,
			obtainDisabled,
			obtainReadonly,
			input,
			popper,
			component,
			showPopper,
			obtainHasPopper,
			onBlur,
			onFocus,
			onPrefixIconClick,
			onSuffixIconClick,
			onPasswordEyeClick,
			onRemoveClick,
			onSelectedDay,
			onEnterPress
		};
	}
});
</script>

<style lang="scss" scoped>
@import './style.scss';
</style>
