<template>
    <button
        v-show="display__"
        v-if="refresh__"
        :id="id__"
        :class="[cType__, theme.bemModifiers]"
        :disabled="disabled">
        <!-- 默认插槽 -->
        <icon
            v-if="loading"
            class="btn__loading"
            :icon="faSpinner"
            animation="spin" />
        <span class="btn__text"><slot></slot></span>
    </button>
</template>

<script lang="ts">
import { faSpinner } from '@fortawesome/pro-duotone-svg-icons';
import { defineComponent } from 'vue';
import { usePrefab } from '../../common/prefab';
import { Icon } from '../icon';
import { BtnProps, useBtnTheme } from './logic';
/**
 * Button使用
 * @name Btn
 */
export default defineComponent({
    name: 'Btn',
    props: BtnProps,
    components: { Icon },
    setup(props) {
        const prefab = usePrefab(props);
        const theme = useBtnTheme(props);
        return {
            ...prefab,
            theme,
            faSpinner
        };
    }
});
</script>

<style lang="scss" scoped>
//字体颜色
$color: v-bind('theme.color');
$bgColor: v-bind('theme.bgColor');
$height: v-bind('theme.height');
$lineHeight: v-bind('theme.lineHeight');
$fontSize: v-bind('theme.fontSize');
@import './style.scss';
</style>
