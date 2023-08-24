<template>
    <div
        v-show="display__"
        v-if="refresh__"
        :id="id__"
        ref="el"
        :class="[cType__, theme.bemModifiers]">
        <Vscroll
            :source="obtainData"
            :trigger-count="triggerCount"
            :row-height="obtainRowHeight"
            @rendered="doOnScrollRendered_">
            <template #default="{ it: node }">
                <div
                    :style="itemStyle"
                    :class="[
                        `${cType__}__node`,
                        {
                            [`${cType__}__folder`]: node.isFolder,
                            [`${cType__}__leaf`]: !node.isFolder,
                            'is-last-brother': node.isLastInBrother,
                            'is-first-brother': !node.brotherIndex,
                            'is-has-only-child': node.hasOnlyChild,
                            'is-selected': node.isChecked,
                            'is-half-check': node.isHalfCheck,
                            'is-focus': node.isFocus
                        }
                    ]"
                    :data-key="node.key"
                    :draggable="draggable"
                    tabindex="0"
                    @drop="doDrop_($event, node)"
                    @dragleave="doDragLeave_($event)"
                    @dragover="doDragOver_($event)"
                    @dragstart="doDragStart_($event, node)">
                    <div :class="`${cType__}__node-indent`">
                        <span
                            v-for="i of node.level"
                            :key="i"
                            :class="[
                                `${cType__}__node-indent-space`,
                                {
                                    'is-hide-line': node.pathNodes[i]?.isLastInBrother
                                }
                            ]"></span>
                    </div>

                    <div :class="`${cType__}__node-content`">
                        <span
                            v-if="obtainShowSelectIcon"
                            :class="`${cType__}__node-icon ${cType__}__node-icon-switcher`"
                            @click.stop="doClickNode_($event, node)">
                            <Icon
                                v-if="node.selectIcon"
                                :name="node.selectIcon"
                                :size="size"
                                fixed-width></Icon>
                        </span>
                        <span
                            v-if="node.switchIcon && obtainShowSwitchIcon"
                            :class="`${cType__}__node-icon`"
                            @click.stop="doClickExpandIcon_($event, node)">
                            <Icon
                                :name="node.switchIcon"
                                :size="size"
                                fixed-width></Icon>
                        </span>

                        <!-- 自定义显示结构，如果设置此`slot`，用于配置自定义显示结构（除了辅助线、展开状态图标、选择状态图标外） -->
                        <!-- @param {TreeNode} node 注入到节点数据 -->
                        <slot
                            v-if="obtainHasStructure"
                            :node="node"
                            name="structure"></slot>

                        <template v-else>
                            <span
                                v-if="node.icon && obtainShowIcon"
                                :class="`${cType__}__node-icon`"
                                @click.stop="doClickExpandIcon_($event, node)">
                                <Icon
                                    :name="node.icon"
                                    :size="size"
                                    fixed-width></Icon>
                            </span>

                            <span
                                :class="`${cType__}__node-text`"
                                @click.stop="doClickNode_($event, node)">
                                {{ node.text }}
                            </span>
                        </template>
                    </div>
                </div>
            </template>
        </Vscroll>
    </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import { Icon } from '../icon';
import { Vscroll } from '../vscroll';
import { TreeEmits, TreeExpose, TreeProps, setupTree } from './logic';
/**
 * Tree使用
 * @name Tree
 */
export default defineComponent({
    name: 'Tree',
    components: { Icon, Vscroll },
    props: TreeProps,
    emits: TreeEmits,
    expose: TreeExpose,
    setup(props, ctx) {
        return setupTree(props, ctx);
    }
});
</script>
<style lang="scss" scoped>
$fontSize: v-bind('theme.fontSize');
$height: v-bind('theme.height');
$nodeHeight: v-bind('theme.nodeHeight');
$colorSelected: v-bind('theme.ye_colorActive');
$colorFocus: v-bind('theme.ye_colorFocus');
$colorHover: v-bind('theme.ye_colorHover');
$colorBorder: v-bind('theme.ye_colorBorder');
$color: v-bind('theme.ye_colorPrimaryText');
$colorBg: v-bind('theme.ye_colorBg');
@import './style.scss';
</style>
