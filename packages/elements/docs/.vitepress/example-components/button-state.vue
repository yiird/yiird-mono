<template>
    <div class="wrap">
        <div>
            <y-btn disabled>禁用</y-btn>
            <y-btn
                disabled
                color="primary">
                禁用
            </y-btn>
            <y-btn
                disabled
                mode="empty"
                color="primary">
                禁用
            </y-btn>
            <y-btn
                disabled
                mode="half"
                color="primary">
                禁用
            </y-btn>
            <y-btn
                disabled
                mode="dashed"
                color="primary">
                禁用
            </y-btn>
            <y-btn
                disabled
                mode="link"
                color="primary">
                禁用
            </y-btn>
        </div>
        <div>
            <y-btn loading>
                <y-icon name="heart"></y-icon>
                &nbsp;loading
            </y-btn>
            <y-btn
                loading
                color="primary">
                <y-icon name="heart"></y-icon>
                &nbsp;loading
            </y-btn>
            <y-btn
                loading
                mode="half"
                color="primary">
                <y-icon name="heart"></y-icon>
                &nbsp;loading
            </y-btn>
            <y-btn
                loading
                mode="empty"
                color="primary">
                <y-icon name="heart"></y-icon>
                &nbsp;loading
            </y-btn>
            <y-btn
                loading
                mode="link"
                color="primary">
                <y-icon name="heart"></y-icon>
                &nbsp;loading
            </y-btn>
            <y-btn
                loading
                mode="dashed"
                color="primary">
                <y-icon name="heart"></y-icon>
                &nbsp;loading
            </y-btn>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { faHeart } from '@fortawesome/pro-solid-svg-icons';
import { addIcons } from '@yiird/elements';
addIcons(faHeart);
</script>

<style scoped>
.wrap .btn {
    margin: 0.5rem;
}
</style>
