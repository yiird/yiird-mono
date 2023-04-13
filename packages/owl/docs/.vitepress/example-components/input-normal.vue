<template>
    <div class="demo-wrap">
        <o-input
            v-model="data"
            placeholder="请输入">
        </o-input>
    </div>
    <div class="demo-wrap">
        <o-input
            v-model="data"
            :prefix="faUser"
            placeholder="请输入">
        </o-input>
    </div>
    <div class="demo-wrap">
        <o-input
            v-model="data"
            prefix-text="http://"
            placeholder="请输入">
        </o-input>
    </div>

    <div class="demo-wrap">
        <o-input
            v-model="data"
            :prefix="faDollarSign"
            suffix-text="美元"
            placeholder="请输入">
        </o-input>
    </div>

    <div class="demo-wrap">
        <o-input
            :loading="loading"
            placeholder="Loading效果">
        </o-input>
    </div>
</template>

<script lang="ts" setup>
import { faDollarSign } from '@fortawesome/free-solid-svg-icons';
import { faUser } from '@fortawesome/pro-thin-svg-icons';
import { ref, watch } from 'vue';

const data = ref();

watch(data, () => {
    console.log(data.value);
});

const loading = ref(true);
</script>

<style lang="scss" scoped>
.demo-wrap {
    padding: 20px;
}
</style>
