<template>
    <div
        v-show="display__"
        v-if="refresh__"
        :id="id__"
        ref="el"
        :class="[cType__, theme.bemModifiers]">
        <div :class="`${cType__}__top`">
            <Avatar
                :size="size"
                :icon-size="size"
                :icon="avatarIcon"
                :src="avatarSrc"></Avatar>
            <div :class="`${cType__}__summary`">
                <Title
                    :size="size"
                    :ellipsis="obtainTitleEllipsis"
                    :level="obtainTitleLevel">
                    {{ obtainTitle }}
                </Title>
                <Paragraph
                    :size="size"
                    :indent="obtainSummaryIndent"
                    :ellipsis="obtainSummaryEllipsis"
                    secondary>
                    {{ obtainSummary }}
                </Paragraph>
            </div>
        </div>
        <Paragraph
            :size="size"
            :ellipsis="obtainDescriptionEllipsis"
            :indent="obtainDescriptionIndent">
            {{ obtainDescription }}
        </Paragraph>
    </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue';
import { Avatar } from '../../avatar';
import { Paragraph } from '../../typography/paragraph';
import { Title } from '../../typography/title';
import { ListMetaEmits, ListMetaExpose, ListMetaProps, setupListMeta } from './logic';
/**
 * ListMeta使用
 * @name ListMeta
 */
export default defineComponent({
    name: 'ListMeta',
    components: { Avatar, Title, Paragraph },
    props: ListMetaProps,
    expose: ListMetaExpose,
    emits: ListMetaEmits,
    setup(props, ctx) {
        return setupListMeta(props, ctx);
    }
});
</script>
<style lang="scss" scoped>
$gap: v-bind('theme.gap');
$fontSize: v-bind('theme.fontSize');

@import './style.scss';
</style>
