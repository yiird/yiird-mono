<template>
    <div>
        <y-btn disabled>禁用</y-btn>
        <y-btn
            disabled
            color="primary">
            禁用
        </y-btn>
    </div>
    <div>
        <y-btn loading>
            <y-icon icon="heart"></y-icon>
            &nbsp;loading
        </y-btn>
        <y-btn
            loading
            color="primary">
            <y-icon icon="heart"></y-icon>
            &nbsp;loading
        </y-btn>
    </div>
</template>

<style scoped>
.btn {
    margin: 0.5rem;
}
</style>
