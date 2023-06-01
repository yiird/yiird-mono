<template>
    <div
        v-show="display__"
        v-if="refresh__"
        :id="id__"
        :class="[cType__, theme.bemModifiers]">
        <div
            v-if="obtainHasHeader"
            class="panel__header">
            <div class="panel__title">
                <span>{{ title }}</span>
            </div>
            <div class="panel__header-right">
                <slot name="header-right"></slot>
                <Btn
                    v-for="(operator, index) in obtainOperators"
                    :key="index"
                    size="sm"
                    mode="link"
                    :shape="operator.icon ? 'square' : 'rectangle'"
                    color="primary"
                    :icon="operator.icon"
                    @click="operator.action">
                    {{ !operator.icon ? operator.text : undefined }}
                </Btn>
            </div>
        </div>
        <div
            ref="container"
            class="panel__container">
            <slot></slot>
        </div>
        <div
            v-if="obtainHasFooter"
            class="panel__footer">
            <!-- 底部 -->
            <slot name="footer"></slot>
        </div>
    </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import { Btn } from '../btn';
import { PanelProps, panelExpose, setupPanel } from './logic';

/**
 * Panel使用
 * @name Panel
 */
export default defineComponent({
    name: 'Panel',
    components: {
        Btn
    },
    props: PanelProps,
    expose: panelExpose,
    setup(props, ctx) {
        return setupPanel(props, ctx);
    }
});
</script>
<style lang="scss" scoped>
$height: v-bind('theme.height');
$width: v-bind('theme.width');
$footerHeight: v-bind('theme.footerHeight');
$headerHeight: v-bind('theme.headerHeight');
$borderColor: v-bind('theme.ye_colorBorder');
$headerBg: v-bind('theme.ye_colorBg');
$color: v-bind('theme.ye_colorPrimaryText');
$titleFontWeight: v-bind('theme.ye_fontWeightBold');
@import './style.scss';
</style>
