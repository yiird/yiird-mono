<template>
    <div class="wrap">
        <!-- t-shirt size -->
        <y-button size="2xs">button</y-button>
        <y-button size="xs">button</y-button>
        <y-button size="sm">button</y-button>
        <y-button size="md">button</y-button>
        <br />
        <y-button size="lg">button</y-button>
        <y-button size="xl">button</y-button>
        <y-button size="2xl">button</y-button>
        <hr />
        <br />
        <!-- 1x - 10x -->
        <y-button size="1x">button</y-button>
        <y-button size="2x">button</y-button>
        <y-button size="3x">button</y-button>
        <y-button size="4x">button</y-button>
        <y-button size="5x">button</y-button>
        <br />
        <y-button size="6x">button</y-button>
        <y-button size="7x">button</y-button>
        <y-button size="8x">button</y-button>
        <y-button size="9x">button</y-button>
        <y-button size="10x">button</y-button>
    </div>
</template>

<style scoped>
.wrap :deep(.button) {
    margin: 0.5rem;
}
</style>