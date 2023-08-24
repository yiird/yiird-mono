<template>
    <div class="wrap">
        <div>
            <y-button>正常</y-button>
            <y-button mode="half">半透明</y-button>
            <y-button mode="empty">镂空</y-button>
            <y-button mode="link">链接</y-button>
            <y-button mode="dashed">虚线</y-button>
        </div>
        <div>
            <y-button color="primary">正常</y-button>
            <y-button
                mode="half"
                color="primary">
                半透明
            </y-button>
            <y-button
                mode="empty"
                color="primary">
                镂空
            </y-button>
            <y-button
                mode="link"
                color="primary">
                链接
            </y-button>
            <y-button
                mode="dashed"
                color="primary">
                虚线
            </y-button>
        </div>
        <div>
            <y-button color="success">正常</y-button>
            <y-button
                mode="half"
                color="success">
                半透明
            </y-button>
            <y-button
                mode="empty"
                color="success">
                镂空
            </y-button>
            <y-button
                mode="link"
                color="success">
                链接
            </y-button>
            <y-button
                mode="dashed"
                color="success">
                虚线
            </y-button>
        </div>
    </div>
</template>

<style scoped>
.wrap :deep(.button) {
    margin: 0.5rem;
}
</style>
