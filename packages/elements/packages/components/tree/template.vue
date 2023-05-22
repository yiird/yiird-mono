<template>
    <div
        v-show="display__"
        v-if="refresh__"
        :id="id__"
        :class="[cType__, theme.bemModifiers]">
        <template v-for="node in obtainData">
            <div
                v-if="node.inView"
                tabindex="0"
                :data-level="node.level"
                :key="node.index"
                :class="[
                    'tree__node',
                    {
                        'is-first-brother': !node.brotherIndex,
                        'is-selected': node.isChecked,
                        'is-half-check': node.isHalfCheck,
                        'is-focus': node.isFocus
                    }
                ]">
                <div class="tree__indent">
                    <span
                        :class="[
                            'tree__indent-space',
                            {
                                'is-hide-line': node.isLastInBrother ? _ii < node.level - 1 && _ii > 0 : false
                            }
                        ]"
                        v-for="(i, _ii) of node.level"
                        :key="i"></span>
                </div>
                <div class="tree__content">
                    <span
                        class="tree__icon tree__icon-switcher"
                        @click.stop="doToggleSelected_(node, $event)">
                        <Icon :name="node.switchIcon"></Icon>
                    </span>
                    <span
                        class="tree__icon"
                        @click.stop="doClickExpandIcon_(node, $event)"
                        v-if="node.icon">
                        <Icon :name="node.icon"></Icon>
                    </span>

                    <span
                        class="tree__text"
                        @click.stop="doToggleSelected_(node, $event)">
                        {{ node[keyConfig.tkey] }}
                    </span>
                </div>
            </div>
        </template>
    </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import { Icon } from '../icon';
import { TreeProps, setupTree, treeEmits, treeExpose } from './logic';
/**
 * Tree使用
 * @name Tree
 */
export default defineComponent({
    name: 'Tree',
    props: TreeProps,
    emits: treeEmits,
    expose: treeExpose,
    components: { Icon },
    setup(props, ctx) {
        return setupTree(props, ctx);
    }
});
</script>
<style lang="scss" scoped>
$fontSize: v-bind('theme.fontSize');
$height: v-bind('theme.height');
$lineHeight: v-bind('theme.lineHeight');
$colorSelected: v-bind('theme.ye_colorActive');
$colorFocus: v-bind('theme.ye_colorFocus');
$colorHover: v-bind('theme.ye_colorHover');
$colorBorder: v-bind('theme.ye_colorBorder');
$colorBg: v-bind('theme.ye_colorBg');
@import './style.scss';
</style>