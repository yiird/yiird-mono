<template>
    <div
        v-show="display__"
        v-if="refresh__"
        :id="id__"
        ref="el"
        :class="[cType__, theme.bemModifiers]">
        <template v-for="node in obtainData">
            <div
                v-if="node.inView"
                :key="node.index"
                :data-level="node.level"
                :class="[
                    'tree__node',
                    {
                        'is-first-brother': !node.brotherIndex,
                        'is-selected': node.isChecked,
                        'is-half-check': node.isHalfCheck,
                        'is-focus': node.isFocus
                    }
                ]"
                tabindex="0">
                <div class="tree__indent">
                    <span
                        v-for="(i, _ii) of node.level"
                        :key="i"
                        :class="[
                            'tree__indent-space',
                            {
                                'is-hide-line': node.isLastInBrother ? _ii < node.level - 1 && _ii > 0 : false
                            }
                        ]"></span>
                </div>
                <div class="tree__content">
                    <span
                        class="tree__icon tree__icon-switcher"
                        @click.stop="doToggleSelected_(node, $event)">
                        <Icon :name="node.switchIcon"></Icon>
                    </span>
                    <span
                        v-if="node.icon"
                        class="tree__icon"
                        @click.stop="doClickExpandIcon_(node, $event)">
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
import { TreeEmits, TreeExpose, TreeProps, setupTree } from './logic';
/**
 * Tree使用
 * @name Tree
 */
export default defineComponent({
    name: 'Tree',
    components: { Icon },
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
$colorSelected: v-bind('theme.ye_colorActive');
$colorFocus: v-bind('theme.ye_colorFocus');
$colorHover: v-bind('theme.ye_colorHover');
$colorBorder: v-bind('theme.ye_colorBorder');
$color: v-bind('theme.ye_colorPrimaryText');
$colorBg: v-bind('theme.ye_colorBg');
@import './style.scss';
</style>
