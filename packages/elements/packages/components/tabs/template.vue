<template>
    <div
        v-show="display__"
        v-if="refresh__"
        :id="id__"
        ref="el"
        :class="[cType__, theme.bemModifiers]">
        <div class="tabs__header">
            <div class="tabs__extra-left">
                <!-- 左侧辅助插槽 -->
                <slot name="extra-left"></slot>
            </div>
            <Scroll
                ref="scroll"
                :hide-track="{
                    x: true,
                    y: true
                }"
                :track-aux="{
                    scopeId: scopeId__,
                    elClasses: ['tabs__aux-left', 'tabs__aux-right']
                }"
                class="tabs__scroll"
                @overflow="doOnScrollOverflow_">
                <div class="tabs__bar-wrap">
                    <div class="tabs__bar-bottom"></div>
                    <div
                        v-for="(tab, index) in tabs"
                        :key="index"
                        :ref="(el) => (barRefs[index] = el)"
                        :class="['tabs__bar', { 'is-active': index === currentActiveIndex, 'is-disabled': tab.disabled }]"
                        :data-key="index"
                        @click="active(index)">
                        <Icon
                            v-if="tab.icon"
                            :name="tab.icon"></Icon>
                        <span>{{ tab.name }}</span>
                        <Icon
                            v-if="!tab.disabled && tab.closeable"
                            :name="faClose"
                            @click.stop="close(index)"></Icon>
                    </div>
                </div>
            </Scroll>
            <div class="tabs__extra-right">
                <!-- 右侧辅助插槽 -->
                <slot name="extra-right"></slot>
            </div>
        </div>

        <div class="tabs__content-wrap">
            <!-- 默认插槽，呈现标签内容 -->
            <div
                v-for="(tab, index) in tabs"
                v-show="index === currentActiveIndex"
                :key="index"
                class="tabs__content">
                <div
                    v-if="tab.isHtml"
                    v-html="tab.page"></div>
                <component
                    :is="tab.page"
                    v-else></component>
            </div>
        </div>
    </div>
</template>
<script lang="ts">
import 'animate.css';
import { defineComponent } from 'vue';
import { Icon } from '../icon';
import { Scroll } from '../scroll';
import { TabsExpose, TabsProps, setupTabs } from './logic';

/**
 * Tabs使用
 * @name Tabs
 */
export default defineComponent({
    name: 'Tabs',
    components: { Icon, Scroll },
    props: TabsProps,
    expose: TabsExpose,
    setup(props, ctx) {
        const logic = setupTabs(props, ctx);
        return {
            ...logic
        };
    }
});
</script>
<style lang="scss" scoped>
$fontSize: v-bind('theme.fontSize');
$color: v-bind('theme.ye_colorPrimaryText');
$colorBg: v-bind('theme.ye_colorBg');
$colorBorder: v-bind('theme.ye_colorBorder');
$colorDivider: v-bind('theme.ye_colorDivider');
$colorActive: v-bind('theme.ye_colorActive');
$colorDisabled: v-bind('theme.ye_colorDisabled');
$barBottomWidth: v-bind('theme.barBottomWidth');
$barBottomLeft: v-bind('theme.barBottomLeft');
$gutter: v-bind('theme.gutter');
$height: v-bind('theme.height');
$lineHeight: v-bind('theme.lineHeight');
$auxLeftShadow: v-bind('theme.auxLeftShadow');
$auxRightShadow: v-bind('theme.auxRightShadow');

@import './style.scss';
</style>
