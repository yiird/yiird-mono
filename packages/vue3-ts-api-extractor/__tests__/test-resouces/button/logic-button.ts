import { computed, onMounted, ref } from 'vue';
import { OButtonPrefabDefine, OButtonPrefabOptionsDefine, OPrefabDefine } from './types';
import { withPrefab } from './withPrefab';

/**
 * button核心逻辑
 *
 * @param {OButtonPrefabOptionsDefine} options
 * @returns {OButtonPrefabDefine}
 */
export const withButton = (options: OButtonPrefabOptionsDefine): OButtonPrefabDefine => {
    const { props } = options;
    const prefab: OPrefabDefine = withPrefab(options);

    //尺寸样式
    const obtainSizeClass = computed(() => {
        return !props.size || commonExposed.cType__ + '--' + props.size;
    });

    const obtainShapeClass = computed(() => {
        return !props.shape || commonExposed.cType__ + '--' + props.shape;
    });

    const obtainColorAndModeClass = computed(() => {
        return !props.color || commonExposed.cType__ + '--' + props.color + (props.mode ? '--' + props.mode : '');
    });

    const obtainDisabledClass = computed(() => {
        return !props.disabled || commonExposed.cType__ + '--disabled';
    });

    commonExposed.addClass([obtainColorAndModeClass, obtainSizeClass, obtainShapeClass, obtainDisabledClass]);

    const rootRef = ref<HTMLButtonElement | null>(null);
    const obtainText = ref<string>();

    onMounted(() => {
        obtainText.value = rootRef.value?.innerText;
    });

    return {
        ...commonExposed,
        rootRef,
        obtainText
    };
};
