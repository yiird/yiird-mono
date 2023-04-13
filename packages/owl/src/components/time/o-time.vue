<template>
    <div
        v-show="display__"
        v-if="refresh__"
        :id="id__"
        :class="block"
        v-bind="$attrs"
        :style="{ ...theme.vars }">
        <ul>
            <li
                v-for="h in obtainHH"
                :key="'hour-' + h.hourNum">
                {{ h.text }}
            </li>
        </ul>
    </div>
</template>

<script lang="ts">
import { computed } from 'vue';
import { defineComponent } from 'vue';
import { usePrefab } from '../../common/prefab';
import { TimeBemKeys, TimeHour, TimeProps, TimeVariables } from './definition';

export default defineComponent({
    name: 'OTime',
    props: TimeProps,
    setup(props) {
        const prefab = usePrefab<TimeVariables, TimeBemKeys>(props);
        const { theme, bem } = prefab;

        const obtainHH = computed(() => {
            const _arr: TimeHour[] = [];
            for (let i = 0; i < 24; i++) {
                _arr.push({
                    hourNum: i,
                    text: i + '',
                    isCurrent: false,
                    classes: []
                });
            }
            return _arr;
        });

        return {
            ...prefab,
            obtainHH
        };
    }
});
</script>

<style lang="scss" scoped>
@import './style.scss';
</style>
