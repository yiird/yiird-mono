<template>
    <div class="wrap">
        <y-button>Default</y-button>
        <y-button color="primary">Primary</y-button>
        <y-button color="success">Success</y-button>
        <y-button color="warn">Warning</y-button>
        <y-button color="error">Danger</y-button>
    </div>
</template>

<script lang="ts" setup></script>
<style scoped>
.wrap :deep(.button) {
    margin: 0.5rem;
}
</style>
