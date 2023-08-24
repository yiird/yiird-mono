<template>
    <div class="wrap">
        <div>
            <y-button disabled>禁用</y-button>
            <y-button
                disabled
                color="primary">
                禁用
            </y-button>
            <y-button
                disabled
                mode="empty"
                color="primary">
                禁用
            </y-button>
            <y-button
                disabled
                mode="half"
                color="primary">
                禁用
            </y-button>
            <y-button
                disabled
                mode="dashed"
                color="primary">
                禁用
            </y-button>
            <y-button
                disabled
                mode="link"
                color="primary">
                禁用
            </y-button>
        </div>
        <div>
            <y-button loading>
                <y-icon name="heart"></y-icon>
                &nbsp;loading
            </y-button>
            <y-button
                loading
                color="primary">
                <y-icon name="heart"></y-icon>
                &nbsp;loading
            </y-button>
            <y-button
                loading
                mode="half"
                color="primary">
                <y-icon name="heart"></y-icon>
                &nbsp;loading
            </y-button>
            <y-button
                loading
                mode="empty"
                color="primary">
                <y-icon name="heart"></y-icon>
                &nbsp;loading
            </y-button>
            <y-button
                loading
                mode="link"
                color="primary">
                <y-icon name="heart"></y-icon>
                &nbsp;loading
            </y-button>
            <y-button
                loading
                mode="dashed"
                color="primary">
                <y-icon name="heart"></y-icon>
                &nbsp;loading
            </y-button>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { faHeart } from '@fortawesome/pro-solid-svg-icons';
import { addIcons } from '@yiird/elements';
addIcons(faHeart);
</script>

<style scoped>
.wrap .button {
    margin: 0.5rem;
}
</style>
