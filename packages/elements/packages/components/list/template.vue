<template>
    <div
        v-show="display__"
        v-if="refresh__"
        :id="id__"
        ref="el"
        :class="[cType__, theme.bemModifiers]">
        <div
            v-for="(item, index) in source"
            :key="index"
            :style="itemStyle"
            :class="`${cType__}__item`"
            @click="doItemClick_($event, item)">
            <div :class="`${cType__}__content`">
                <div
                    v-if="obtainHasContent"
                    :class="`${cType__}__slot`">
                    <!-- 内容插槽 -->
                    <!-- @param {any} item 当前数据项 -->
                    <!-- @param {any} no 当前序号 -->
                    <slot
                        :item="item"
                        :no="index"
                        name="content"></slot>
                </div>

                <div
                    v-if="obtainHasExtra"
                    :class="`${cType__}__extra`">
                    <!-- 扩展内容插槽 -->
                    <!-- @param {any} item 当前数据项 -->
                    <!-- @param {any} no 当前序号 -->
                    <slot
                        :item="item"
                        :no="index"
                        name="extra"></slot>
                </div>
            </div>

            <div
                v-if="obtainHasActions"
                :class="`${cType__}__actions`"
                :style="actionStyle">
                <component :is="obtainActions"></component>
            </div>
        </div>
    </div>
</template>
<script lang="tsx">
import { defineComponent } from 'vue';
import { ListEmits, ListExpose, ListProps, setupList } from './logic';
/**
 * List使用
 * @name List
 */
export default defineComponent({
    name: 'List',
    // components: { Avatar },
    props: ListProps,
    expose: ListExpose,
    emits: ListEmits,
    setup(props, ctx) {
        return setupList(props, ctx);
    }
});
</script>
<style lang="scss" scoped>
$fontSize: v-bind('theme.fontSize');
$gap: v-bind('theme.gap');
$hoverColor: v-bind('theme.hoverColor');
$hoverTextColor: v-bind('theme.hoverTextColor');
$actionsAlign: v-bind('theme.actionsAlign');
$extraAlign: v-bind('theme.extraAlign');

@import './style.scss';
</style>
