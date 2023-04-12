<template>
	<FontAwesomeIcon
		v-show="display__"
		v-if="refresh__"
		:id="id__"
		:class="[block, obtainFaClasses]"
		:icon="[obtainPrefix, obtainIcon]"
		:size="obtainSize"
		:fixed-width="obtainFixedWidth"
		:flip="obtainFlip"
		:style="{ ...theme.vars, ...obtainAnimationOptions }">
	</FontAwesomeIcon>
</template>

<script lang="ts">
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { computed } from 'vue';
import { forEach, kebabCase } from 'lodash-es';
import { defineComponent } from 'vue';
import { BemClasses } from '../../common/bem';
import { usePrefab } from '../../common/prefab';
import { Theme } from '../../theme';
import { IconProps, type IconVariables } from './definition';

/**
 * Button使用
 * @name OIcon
 */
export default defineComponent({
	name: 'OIcon',
	components: {
		FontAwesomeIcon
	},
	props: IconProps,
	setup(props) {
		const prefab = usePrefab<IconVariables>(props);
		const { cType__ } = prefab;

		const theme = new Theme<IconVariables>(cType__);
		const bem = new BemClasses(cType__);
		const block = bem.block;
		const obtainPrefix = computed(() => {
			return props.prefix;
		});
		const obtainIcon = computed(() => {
			return props.icon;
		});

		const obtainSize = computed(() => {
			return props.size;
		});

		const obtainFixedWidth = computed(() => {
			return props.fixedWidth;
		});

		const obtainRotation = computed(() => {
			return props.rotation;
		});

		const obtainFlip = computed(() => {
			return props.flip;
		});

		const obtainFaClasses = computed(() => {
			let animation;
			if (props.animation === 'spin-reverse') {
				animation = 'fa-spin fa-spin-reverse';
			} else if (props.animation === 'spin-pulse-reverse') {
				animation = 'fa-spin-pulse fa-spin-reverse';
			} else {
				animation = 'fa-' + props.animation;
			}
			return animation;
		});

		const obtainAnimationOptions = computed(() => {
			const options: Record<string, string> = {};
			const animation = props.animation;
			if (animation && props.animationOptions) {
				forEach(props.animationOptions, (value, name) => {
					// if ((name.startsWith(animation) || name.startsWith('animation')) && value) {
					// 	options[`--fa-` + kebabCase(name)] = value;
					// }
					if (value) {
						options[`--fa-` + kebabCase(name)] = value;
					}
				});
			}
			return options;
		});
		return {
			...prefab,
			obtainPrefix,
			obtainIcon,
			obtainSize,
			obtainFixedWidth,
			obtainRotation,
			obtainFlip,
			obtainFaClasses,
			obtainAnimationOptions,
			theme,
			block
		};
	}
});
</script>

<style lang="scss" scoped>
@import './style.scss';
</style>
