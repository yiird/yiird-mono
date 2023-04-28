<template>
    <div>
        <y-icon
            icon="camera"
            animation="beat-fade"></y-icon>
    </div>
</template>

<script lang="ts">
import { faCamera } from '@fortawesome/pro-solid-svg-icons';
import { defineComponent } from 'vue';
import { addIcons } from '../packages';
addIcons(faCamera);
export default defineComponent({
    setup(props, ctx) {
        return {
            faCamera
        };
    }
});
</script>
