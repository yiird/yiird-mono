<template>
    <div
        v-show="display__"
        v-if="refresh__"
        :id="id__"
        ref="el"
        :class="[cType__, theme.bemModifiers]">
        <div
            v-if="obtainHasHeader"
            class="panel__header">
            <div class="panel__title">
                <span>{{ title }}</span>
            </div>
            <div class="panel__header-right">
                <slot name="header-right"></slot>
                <Button
                    v-for="(operator, index) in obtainOperators"
                    :key="index"
                    :shape="operator.icon ? 'square' : 'rectangle'"
                    :icon="operator.icon"
                    size="sm"
                    mode="link"
                    color="primary"
                    @click="operator.action">
                    {{ !operator.icon ? operator.text : undefined }}
                </Button>
            </div>
        </div>

        <div class="panel__container">
            <Scroll ref="scroll">
                <slot></slot>
            </Scroll>
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
import { Button } from '../button';
import { Scroll } from '../scroll';
import { PanelExpose, PanelProps, setupPanel } from './logic';

/**
 * Panel使用
 * @name Panel
 */
export default defineComponent({
    name: 'Panel',
    components: {
        Button,
        Scroll
    },
    props: PanelProps,
    expose: PanelExpose,
    setup(props, ctx) {
        return setupPanel(props, ctx);
    }
});
</script>
<style lang="scss" scoped>
$padding: v-bind('theme.padding');
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
