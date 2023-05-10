<template>
    <button
        v-if="refresh__"
        v-show="display__"
        :id="id__"
        v-bind="$attrs"
        ref="rootRef"
        :class="class__">
        <!-- 这是一个slot -->
        <!-- @param {String} arg0 参数描述 -->
        <!-- @param {Arg1} arg1 参数描述 -->
        <slot
            v-if="true"
            :key="1"
            name="aa1"
            aa="11"
            :arg0="size"
            :arg1="{ a: 1, b: 2 }"></slot>

        <!-- 这是一个slot -->

        <!-- @param {String} arg0 参数描述 -->
        <!-- @param {String} arg1 参数描述 -->
        <slot
            v-if="true"
            :key="1"
            name="aa2"
            aa="11"
            :arg0="size"
            :arg1="{ a: 1, b: 2 }"></slot>
    </button>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import { withButton } from './logic-button';
import { ButtonProps } from './props-button';

/**
 * Arg1 Class 定义说明
 */
class Arg1 {
    /**
     * p1说明
     */
    p1: number;
}

/**
 * 接口类型定义
 */
interface Arg2 {
    /**
     * 接口 p1说明
     */
    p1: string;
}

/**
 * 按钮组件
 * @author Gavin Lou
 * @date 2022-05-29
 */
export default defineComponent({
    name: 'OButton',
    props: ButtonProps,
    setup(props, ctx) {
        /**
         * 激活目标选项卡
         *
         * @param {number | string} activeIndex - TAB序号或ID
         */
        const active = (activeIndex: number | string) => {};

        return {
            ...withButton({
                props,
                ctx
            }),
            active
        };
    },
    methods: {
        /**
         * fn1 方法定义说明
         * @param {Arg1} arg1 - arg1 说明
         */
        fn1(arg1: Arg1, arg2: string) {
            /**
             * 事件说明
             * @argument {String} arg1 - aaa
             */
            this.$emit('event-name', arg1);
            return 0;
        },
        /**
         * fn2 方法定义说明
         */
        fn2(arg1: Arg2) {
            return 0;
        }
    }
});
</script>

<style lang="scss" scoped>
@import '../../themes/styles/_button.scss';
</style>

<docs>
---
dd:aa
---

jianjajajaa
</docs>
