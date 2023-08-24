<template>
    <div
        v-if="refresh__"
        :id="id__"
        ref="el"
        :display="display"
        :class="[cType__, theme.bemModifiers]">
        <Input
            ref="input"
            v-model="displayValue"
            :right-action="obtainRightAction"
            :status="status"
            :disabled="disabled"
            :loading="loading"
            :placeholder="placeholder"
            readonly
            @right-action="doRightAction_"></Input>
        <input
            ref="hidden"
            v-model="value"
            :name="name"
            type="hidden" />
        <Popover
            v-if="refresh__"
            :display="isOpen"
            :offset="5"
            :allow-placement="['bottom-end']"
            :reference="input?.content"
            :max-height="obtainPopMaxHeight"
            :min-height="obtainPopMinHeight"
            :max-width="obtainPopMaxWidth"
            :min-width="obtainPopMinWidth"
            mode="click-out"
            color="white"
            hide-think-over-pop
            @open="doPopoverOpen_">
            <div
                :id="id__"
                :class="cType__">
                <Input
                    v-if="obtainSearchable"
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
                    @select="doListSelect_">
                    <template
                        v-if="$slots.item"
                        #content="{ item }">
                        <slot
                            :item="item"
                            name="item"></slot>
                    </template>
                    <template
                        v-else
                        #content="{ item }">
                        <IconText
                            :icon="item.options?.icon"
                            :text="item.label"></IconText>
                    </template>
                </List>

                <Tree
                    v-if="obtainIsTree"
                    ref="tree"
                    :class="`${cType__}__content`"
                    :size="size"
                    :item-style="{ padding: '0 10px' }"
                    :always-focus="false"
                    :trigger-count="500"
                    :multi="multi"
                    :screen-size="treeOptions.screenSize"
                    :source="source"
                    @select="doTreeSelect_"></Tree>
            </div>
        </Popover>
    </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import { IconText } from '../icon/text';
import { Input } from '../input';
import { List } from '../list';
import { Popover } from '../popover';
import { Tree } from '../tree';

import { SelectEmits, SelectExpose, SelectProps, setupSelect } from './logic';
/**
 * Select使用
 * @name Select
 */
export default defineComponent({
    name: 'Select',
    components: {
        Input,
        Popover,
        Tree,
        List,
        IconText
    },
    props: SelectProps,
    expose: SelectExpose,
    emits: SelectEmits,
    setup(props, ctx) {
        return setupSelect(props, ctx);
    }
});
</script>
<style lang="scss" scoped>
@import './style.scss';
</style>
