<template>
    <div></div>
</template>
<script lang="ts">
import { defineComponent } from 'vue';

/**
 * 组件说明
 *
 * @author Gavin Lou
 * @date `2012-12-5 aa`
 */
export default defineComponent({
    name: 'Btn',
    props: {
        /**
         * i啊就爱啊
         * @values a,b,c
         */
        age: {
            type: String,
            default: 'aasss',
            required: true
        }
    },
    setup(props, ctx) {
        return {};
    }
});
</script>
<style lang="scss" scoped></style>

<docs>
---
dd:aa
---

将的等待的
</docs>
