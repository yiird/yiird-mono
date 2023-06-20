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
            :class="`${cType__}__item`">
            <div :class="`${cType__}__content`">
                <slot
                    :item="item"
                    :no="index"
                    name="item"></slot>

                <div
                    v-if="obtainHasExtra"
                    :class="`${cType__}__extra`"
                    :style="extraStyle">
                    <slot
                        :item="item"
                        :no="index"
                        name="extra"></slot>
                </div>
            </div>

            <div
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
$actionsAlign: v-bind('theme.actionsAlign');
$extraAlign: v-bind('theme.extraAlign');
$itemDirection: v-bind('theme.itemDirection');
$contentDirection: v-bind('theme.contentDirection');
$contentJustifyContent: v-bind('theme.contentJustifyContent');

@import './style.scss';
</style>
