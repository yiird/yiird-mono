<template>
    <Popover
        v-if="refresh__"
        ref="el"
        :display="display"
        :offset="offset"
        :allow-placement="allowPlacement"
        :reference="reference"
        :mode="mode"
        color="white"
        @click-out="$emit('clickOut')">
        <div
            :id="id__"
            :class="cType__"
            :style="{
                maxWidth: theme.maxWidth,
                minWidth: theme.minWidth
            }">
            <Input
                v-if="searchable"
                :class="`${cType__}__search`"
                type="text"
                @input="doFilterData_"></Input>
            <List
                v-if="obtainIsList"
                :class="`${cType__}__content`"
                :size="size"
                :style="{ backgroundColor: 'white' }"
                :gap="0"
                :hover-color="theme.ye_colorPrimary[5]"
                :item-style="{ padding: '5px' }"
                :source="source"
                @select="doSelect_">
                <template
                    v-if="$slots.item"
                    #item="{ item }">
                    <slot
                        :item="item"
                        name="item"></slot>
                </template>
                <template
                    v-else
                    #item="{ item }">
                    <IconText
                        :icon="item.options?.icon"
                        :text="item.label"></IconText>
                </template>
            </List>

            <Tree
                v-if="obtainIsTree"
                ref="tree"
                :max-height="maxHeight"
                :class="`${cType__}__content`"
                :size="size"
                :item-style="{ padding: '0 10px' }"
                :always-focus="false"
                :trigger-count="100"
                :source="source"></Tree>
        </div>
    </Popover>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import { IconText } from '../icon/text';
import { Input } from '../input';
import { List } from '../list';
import { Popover } from '../popover';
import { Tree } from '../tree';
import { DropEmits, DropExpose, DropProps, setupDrop } from './logic';
/**
 * Drop使用
 * @name Drop
 */
export default defineComponent({
    name: 'Drop',
    components: {
        Popover,
        List,
        Input,
        Tree,
        IconText
    },
    props: DropProps,
    expose: DropExpose,
    emits: DropEmits,
    setup(props, ctx) {
        return setupDrop(props, ctx);
    }
});
</script>
<style lang="scss" scoped>
@import './style.scss';
</style>
