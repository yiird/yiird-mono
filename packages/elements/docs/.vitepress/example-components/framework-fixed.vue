<template>
    <div class="parent">
        <y-framework fixed>
            <y-header size="64">Header</y-header>
            <y-sider
                position="left"
                size="100">
                Left
            </y-sider>
            <y-sider
                position="right"
                size="100">
                Right
            </y-sider>
            <y-main size="100">Main</y-main>
            <y-footer size="64">Footer</y-footer>
        </y-framework>
    </div>
    <br>
    <br>
    <div class="parent2">
        <y-framework>
            <y-header size="64">Header</y-header>
            <y-sider
                position="left"
                size="100">
                Left
            </y-sider>
            <y-sider
                position="right"
                size="100">
                Right
            </y-sider>
            <y-main size="100">Main</y-main>
            <y-footer size="64">Footer</y-footer>
        </y-framework>
    </div>
</template>

<script setup lang="ts"></script>

<style lang="scss" scoped>
.parent {
    height: 500px;
}
.framework {
    .header,
    .footer {
        color: white;
        background-color: rgb(125, 188, 234);
    }
    .sider {
        color: white;
        background-color: rgb(59, 160, 233);
    }
    .main {
        color: white;
        background-color: rgb(16, 142, 233);
    }
}
</style>
