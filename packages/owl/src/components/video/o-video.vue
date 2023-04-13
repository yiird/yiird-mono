<template>
    <div
        v-show="display__"
        v-if="refresh__"
        :id="id__"
        v-bind="$attrs"
        ref="rootDom"
        :class="block"
        :style="{ ...theme.vars }">
        <video
            ref="videoDom"
            :class="el_video">
            <source
                :src="src"
                type="video/mp4" />
        </video>
        <div :class="el_control">
            <div
                ref="progressDom"
                :class="el_progress">
                <div :class="el_progressBuffer">
                    <div :class="el_progressCurrent">
                        <div
                            :data-current-time="obtainCurrentFormatedTime"
                            :class="el_progressBar"></div>
                    </div>
                </div>
            </div>
            <div :class="el_options">
                <div :class="el_optionsLeft">
                    <div
                        ref="switchBtnDom"
                        :class="el_switch">
                        <icon
                            fixed-width
                            prefix="far"
                            :icon="obtainSwitchIcon"></icon>
                    </div>
                    <div :class="el_timer">
                        <span>{{ obtainCurrentFormatedTime }}</span>
                        / {{ obtainTotalFormatedTime }}
                    </div>
                </div>
                <div :class="el_optionsRight">
                    <div :id="id__ + '-resolution-btn'">1080p</div>
                    <div :id="id__ + '-speed-btn'">倍速</div>
                    <div :id="id__ + '-volume-btn'">
                        <icon
                            fixed-width
                            prefix="fad"
                            :icon="obtainVolumeIcon"></icon>
                    </div>
                    <div ref="fullscreenBtnDom">
                        <icon
                            fixed-width
                            icon="expand-wide"></icon>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <popper
        mode="click"
        placement="top"
        bg-color="rgb(41 103 101)"
        border-color="rgb(41 103 101)"
        :reference="'#' + id__ + '-resolution-btn'">
        <div :class="el_resolutionPopper">
            <ul>
                <li>
                    1080p 高清
                    <icon
                        prefix="fad"
                        icon="high-definition"></icon>
                </li>
                <li>
                    720p 高清
                    <icon
                        prefix="fad"
                        icon="standard-definition"></icon>
                </li>
                <li>480p 清晰</li>
                <li>360p 流畅</li>
            </ul>
        </div>
    </popper>
    <popper
        mode="click"
        placement="top"
        bg-color="rgb(41 103 101)"
        border-color="rgb(41 103 101)"
        :reference="'#' + id__ + '-speed-btn'">
        <div :class="el_speedPopper">
            <ul>
                <li>2.0 x</li>
                <li>1.5 x</li>
                <li>1.25 x</li>
                <li>1 x</li>
                <li>0.75 x</li>
                <li>0.5 x</li>
            </ul>
        </div>
    </popper>
    <popper
        mode="click"
        placement="top"
        bg-color="rgb(41 103 101)"
        border-color="rgb(41 103 101)"
        :reference="'#' + id__ + '-volume-btn'">
        <div
            ref="volumePopperDom"
            :class="el_volumePopper">
            <div>{{ volume }}</div>
            <div :class="el_volumeProgress">
                <div
                    :style="{ height: volume + '%' }"
                    :class="el_volumeProgressBar"></div>
            </div>
        </div>
    </popper>
</template>

<script lang="ts">
import { IconName, library } from '@fortawesome/fontawesome-svg-core';
import { faHighDefinition, faStandardDefinition, faVolume, faVolumeHigh, faVolumeSlash } from '@fortawesome/pro-duotone-svg-icons';
import { faPause, faPlay } from '@fortawesome/pro-regular-svg-icons';
import { faExpandWide } from '@fortawesome/pro-solid-svg-icons';
import { computed, defineComponent, watchEffect } from 'vue';
import { usePrefab } from '../../common/prefab';
import { Icon } from '../icon';
import { Popper } from '../popper';
import { useVideo, VideoBemKeys, VideoProps, VideoVariables } from './definition';

library.add(faPlay, faPause, faHighDefinition, faStandardDefinition, faVolume, faVolumeHigh, faVolumeSlash, faExpandWide);

export default defineComponent({
    name: 'OVideo',
    components: {
        Icon,
        Popper
    },
    props: VideoProps,
    setup(props) {
        const prefab = usePrefab<VideoVariables, VideoBemKeys>(props);
        const { theme, bem } = prefab;

        const {
            videoDom,
            rootDom,
            progressDom,
            switchBtnDom,
            fullscreenBtnDom,
            volumePopperDom,
            volume,
            progressBarPosition,
            playSwitch,
            obtainCurrentFormatedTime,
            obtainTotalFormatedTime,
            obtainProgressPosition,
            doFullscreen,
            doPlay,
            doAdjustVolume,
            doForward,
            doBack
        } = useVideo({
            forwardOrBack: 15
        });

        const obtainSwitchIcon = computed<IconName>(() => (playSwitch.value ? 'pause' : 'play'));
        const obtainVolumeIcon = computed<IconName>(() => (volume.value > 70 ? 'volume-high' : 'volume'));

        watchEffect(() => {
            !obtainProgressPosition.value || (theme.originVars.sliderX = obtainProgressPosition.value + 'px');
            !obtainProgressPosition.value || (theme.originVars.currentPosition = obtainProgressPosition.value + 'px');
            !progressBarPosition.value || (theme.originVars.progressBarPosition = progressBarPosition.value + 'px');
            //theme.originVars.bufferPosition = '300px';
            //!bufferPosition.value || (theme.originVars.bufferPosition = bufferPosition.value + 'px');
        });

        return {
            ...prefab,
            el_video: bem.elements.video,
            el_control: bem.elements.control,
            el_options: bem.elements.options,
            el_optionsLeft: bem.elements.optionsLeft,
            el_optionsRight: bem.elements.optionsRight,
            el_switch: bem.elements.switch,
            el_timer: bem.elements.timer,
            el_progress: bem.elements.progress,
            el_progressBuffer: bem.elements.progressBuffer,
            el_progressCurrent: bem.elements.progressCurrent,
            el_progressBar: bem.elements.progressBar,
            el_resolutionPopper: bem.elements.resolutionPopper,
            el_speedPopper: bem.elements.speedPopper,
            el_volumePopper: bem.elements.volumePopper,
            el_volumeProgress: bem.elements.volumeProgress,
            el_volumeProgressBar: bem.elements.volumeProgressBar,
            videoDom,
            rootDom,
            progressDom,
            switchBtnDom,
            fullscreenBtnDom,
            volumePopperDom,
            volume,
            obtainCurrentFormatedTime,
            obtainTotalFormatedTime,
            obtainSwitchIcon,
            obtainVolumeIcon,
            doFullscreen,
            doPlay,
            doAdjustVolume,
            doForward,
            doBack
        };
    }
});
</script>

<style lang="scss" scoped>
@import './style.scss';
</style>
