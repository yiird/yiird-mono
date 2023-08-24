<template>
    <y-framework fixed>
        <y-header size="64">
            
        </y-header>
        <y-sider
            position="left"
            size="300">
            Left
        </y-sider>
        <y-main size="100">
            <y-tabs
                :gutter="15"
                :items="items"></y-tabs>
        </y-main>
    </y-framework>
</template>

<script setup lang="ts">
const items = [
    {
        name: 'TAB1',
        page: 'Page1',
        closeable: false
    },
    {
        name: 'TAB2',
        page: 'Page2',
        closeable: true
    },
    {
        name: 'TAB3',
        page: 'Page3',
        closeable: true
    },
    {
        name: 'TAB4',
        page: 'Page4',
        closeable: true
    }
];
</script>

<style lang="scss" scoped>
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
        // background-color: rgb(16, 142, 233);
    }
    & > div {
        .header,
        .footer {
            text-align: center;
            color: black;
            background-color: #b3c0d1;
        }
        .sider {
            text-align: center;
            color: black;
            background-color: #d3dce6;
        }
        .main {
            text-align: center;
            color: black;
            background-color: #e9eef3;
        }
    }
}
</style>
