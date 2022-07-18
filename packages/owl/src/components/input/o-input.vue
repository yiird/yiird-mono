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
				@click="onPrefixIconClick"></icon>
			{{ obtainPrefixText }}
			<!-- 前缀 -->
			<!-- @param {String} text 前缀文本 -->
			<slot
				name="prefix"
				:text="prefixText"></slot>
		</div>
		<input
			v-model="obtainValue"
			:class="el_input"
			:placeholder="obtainPlaceholder"
			:type="obtainType"
			@focus="onFocus"
			@blur="onBlur" />

		<!-- loading icon -->
		<div
			v-if="obtainLoading"
			:class="el_loading">
			<icon
				icon="spinner"
				animation="spin"
				:animation-options="{ animationDuration: '1.5s' }"></icon>
		</div>

		<!-- remove icon -->
		<div :class="el_remove">
			<icon
				icon="remove"
				@click.prevent="onRemoveClick"></icon>
		</div>

		<!-- password icon -->
		<div
			v-if="type === 'password'"
			:class="el_password">
			<icon
				fixed-width
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
				@click="onSuffixIconClick"></icon>
		</div>
	</div>
	<o-popper
		v-if="obtainHasPopper"
		mode="click"
		placement="bottom-start"
		:reference="component">
		dddd
	</o-popper>
</template>

<script lang="ts">
import { library } from '@fortawesome/fontawesome-svg-core';
import { faEye, faEyeSlash, faRemove, faSpinner } from '@fortawesome/free-solid-svg-icons';
import { computed } from '@vue/reactivity';
import { isNumber, isObject, isString } from 'lodash-es';
import { defineComponent, ref, watchEffect } from 'vue';
import { toRealType } from '../../common/dom';
import { usePrefab } from '../../common/prefab';
import { Icon } from '../icon';
import { EventBinding, InputBemKeys, InputProps, InputVariables } from './definition';
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
		Icon
	},
	props: InputProps,
	emits: ['update:modelValue', 'blur', 'focus', 'click-suffix-icon', 'click-prefix-icon'],
	setup(props, ctx) {
		const prefab = usePrefab<InputVariables, InputBemKeys>(props);
		const { theme, bem } = prefab;

		const block = bem.block;
		const elements = bem.elements;
		const component = ref<HTMLElement>();

		const obtainHasPopper = computed(() => {
			return props.type === 'date' && component.value;
		});

		const obtainPlaceholder = computed(() => {
			return props.placeholder;
		});

		const obtainPrefixText = computed(() => {
			return !ctx.slots.prefix ? props.prefixText : undefined;
		});
		const obtainSuffixText = computed(() => {
			return !ctx.slots.suffix ? props.suffixText : undefined;
		});

		const obtainHasPrefix = computed(() => {
			return !!ctx.slots.prefix || props.prefix || props.prefixText;
		});

		const obtainHasSuffix = computed(() => {
			return props.type === 'text' && (!!ctx.slots.suffix || props.suffix || props.suffixText);
		});

		const obtainSuffixIcon = computed(() => {
			if (props.suffix) {
				if (isObject(props.suffix)) {
					return props.suffix;
				} else if (isString(props.suffix)) {
					return {
						icon: props.suffix
					};
				}
			}
		});

		const obtainPrefixIcon = computed(() => {
			if (props.prefix) {
				if (isObject(props.prefix)) {
					return props.prefix;
				} else if (isString(props.prefix)) {
					return {
						icon: props.prefix
					};
				}
			}
		});

		const obtainValue = computed({
			get() {
				let realValue = props.modelValue;
				if (realValue) {
					if (props.prefixText && realValue?.startsWith(props.prefixText)) {
						realValue = realValue.substring(props.prefixText?.length);
					}
					if (props.suffixText && realValue?.endsWith(props.suffixText)) {
						const startIndex = realValue.length - props.suffixText.length;
						realValue = realValue.substring(0, startIndex);
					}
				}
				return realValue;
			},
			set(value) {
				let realValue = value;
				if (realValue) {
					if (props.bind === 'all') {
						realValue = `${props.prefixText}${value}${props.suffixText}`;
					} else if (props.bind === 'prefix') {
						realValue = `${props.prefixText}${value}`;
					} else if (props.bind === 'suffix') {
						realValue = `${value}${props.suffixText}`;
					}
				}

				/**
				 * @private
				 */
				ctx.emit('update:modelValue', realValue);
			}
		});

		const showPassword = ref(false);

		const obtainPasswordEye = computed(() => {
			return showPassword.value ? 'eye' : 'eye-slash';
		});

		const obtainLoading = computed(() => {
			return props.loading;
		});

		const obtainReadonly = computed(() => {
			return props.readonly;
		});

		const obtainDisabled = computed(() => {
			return props.disabled;
		});

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

		// theme.originVars.color = `var(${globalTheme?.namedVars.colorTextLight})`;
		// theme.originVars.placeholderColor = `var(${globalTheme?.namedVars.colorTextLightest})`;
		// theme.originVars.borderColor = `var(${globalTheme?.namedVars.colorBorderPrimary})`;
		// theme.originVars.lineHeight = `var(${globalTheme?.namedVars.lineHeightBase})`;
		// theme.originVars.prefixBgColor = `var(${globalTheme?.namedVars.colorBorderLightest})`;
		// theme.originVars.suffixBgColor = `var(${globalTheme?.namedVars.colorBorderLightest})`;

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
			const binding: EventBinding = {
				event: e,
				value: toRealType(obtainValue.value)
			};
			/**
			 * 获得焦点
			 * @argument {EventBinding} binding 回调参数
			 */
			ctx.emit('focus', binding);
		};

		/**
		 * @private
		 */
		const onBlur = (e: FocusEvent) => {
			const binding: EventBinding = {
				event: e,
				value: toRealType(obtainValue.value)
			};
			/**
			 * 失去焦点
			 * @argument {EventBinding} binding 回调参数
			 */
			ctx.emit('blur', binding);
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
			ctx.emit('click-prefix-icon', binding);
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
			ctx.emit('click-suffix-icon', binding);
		};
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
			component,
			obtainHasPopper,
			onBlur,
			onFocus,
			onPrefixIconClick,
			onSuffixIconClick,
			onPasswordEyeClick,
			onRemoveClick
		};
	}
});
</script>

<style
	lang="scss"
	scoped>
@import './style.scss';
</style>
