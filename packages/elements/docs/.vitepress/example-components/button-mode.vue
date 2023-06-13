<template>
    <div class="wrap">
        <div>
            <y-btn>正常</y-btn>
            <y-btn mode="half">半透明</y-btn>
            <y-btn mode="empty">镂空</y-btn>
            <y-btn mode="link">链接</y-btn>
            <y-btn mode="dashed">虚线</y-btn>
        </div>
        <div>
            <y-btn color="primary">正常</y-btn>
            <y-btn
                mode="half"
                color="primary">
                半透明
            </y-btn>
            <y-btn
                mode="empty"
                color="primary">
                镂空
            </y-btn>
            <y-btn
                mode="link"
                color="primary">
                链接
            </y-btn>
            <y-btn
                mode="dashed"
                color="primary">
                虚线
            </y-btn>
        </div>
        <div>
            <y-btn color="success">正常</y-btn>
            <y-btn
                mode="half"
                color="success">
                半透明
            </y-btn>
            <y-btn
                mode="empty"
                color="success">
                镂空
            </y-btn>
            <y-btn
                mode="link"
                color="success">
                链接
            </y-btn>
            <y-btn
                mode="dashed"
                color="success">
                虚线
            </y-btn>
        </div>
    </div>
</template>

<style scoped>
.wrap :deep(.btn) {
    margin: 0.5rem;
}
</style>
