<template>
    <y-tabs
        ref="tabs"
        mode="card"
        :active-key="8"
        :items="items">
        <template v-slot:extra-left>
            <y-button
                mode="empty"
                size="md"
                @click="go(0)">
                Go First
            </y-button>
        </template>
        <template v-slot:extra-right>
            <y-button
                mode="empty"
                size="md"
                @click="go(9)">
                Go Last
            </y-button>
        </template>
    </y-tabs>
</template>

<script lang="tsx" setup>
import { faCamera, faHome } from '@fortawesome/pro-light-svg-icons';
import { ref } from 'vue';

const tabs = ref();

const page1 = ()=>{
    return (<>
    <div>aaaa</div>
    <div>bbbb</div>
    </>)
}


const items = [
    {
        name: 'TAB1',
        page: page1,
        icon: faHome
    },
    {
        name: 'TAB2',
        page: 'Page2',
        icon: faCamera
    },
    {
        name: 'TAB3',
        page: 'Page3',
        icon: faCamera
    },
    {
        name: 'TAB4',
        page: 'Page4',
        icon: faCamera
    },
    {
        name: 'TAB5',
        page: 'Page5',
        icon: faCamera
    },
    {
        name: 'TAB6',
        page: 'Page6',
        icon: faCamera
    },
    {
        name: 'TAB7',
        page: 'Page7',
        icon: faCamera
    },
    {
        name: 'TAB8',
        page: 'Page8',
        icon: faCamera
    },
    {
        name: 'TAB9',
        page: 'Page9',
        icon: faCamera
    },
    {
        name: 'TAB10',
        page: 'Page10',
        icon: faCamera
    }
];

const go = (index: number) => {
    tabs.value.active(index, true);
};
</script>
