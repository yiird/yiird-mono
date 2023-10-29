<template>
    <y-space direction="v">
        <y-button
            :icon="faCircleCamera"
            color="primary"
            ref="reference2">
            按钮
        </y-button>
        <y-divider>在文长排版中使用</y-divider>
        <y-typography>
            <y-title align="center">存款利率一降再降，买房收租和存银行哪个更划算？</y-title>

            <y-paragraph>购房者主要看重房产本身的增值空间，对此期待值是大于收租的。</y-paragraph>

            <y-paragraph>
                <y-text
                    mark
                    v-tooltip="{ text: '通过v-tooltip指令绑定需要提示的元素', color: 'green', textColor: 'red'}">
                    “降息潮”
                </y-text>
                蔓延，继六大行下调存款利率后，12家股份制银行也陆续下调人民币存款利率。
            </y-paragraph>
        </y-typography>
    </y-space>

    <y-popover
        mode="click-leave"
        color="black"
        max-width="100px"
        :reference="reference2"
        text="通过设置参考元素的ref引用来绑定"></y-popover>
</template>

<script setup lang="ts">
import { faCircleCamera } from '@fortawesome/pro-light-svg-icons';
import { ref } from 'vue';

const reference2 = ref();
</script>
