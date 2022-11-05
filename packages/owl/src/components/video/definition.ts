import { computed, customRef, onMounted, onUnmounted, PropType, ref } from 'vue';
import { useFullscreen } from '../../common/composable';
import { BaseProps } from '../../common/prefab';
import { secondFormatHMS } from '../../common/util';

export function useDebouncedRef<T>(value: T, delay = 200) {
	let timeout: NodeJS.Timeout | string | number | undefined;
	return customRef((track, trigger) => {
		return {
			get() {
				track();
				return value;
			},
			set(newValue) {
				clearTimeout(timeout);
				timeout = setTimeout(() => {
					value = newValue;
					trigger();
				}, delay);
			}
		};
	});
}

export const VideoProps = {
	...BaseProps,
	src: {
		type: String as PropType<string>
	}
} as const;

export type VideoVariables = {
	sliderX: string;
	currentPosition: string;
	progressBarPosition: string;
	bufferPosition: string;
};

export type VideoBemKeys = {
	modifiers: string;
	elements: {
		video: string;
		control: string;
		options: string;
		optionsLeft: string;
		optionsRight: string;
		switch: string;
		timer: string;
		progress: string;
		progressBuffer: string;
		progressCurrent: string;
		progressBar: string;

		resolutionPopper: string;
		speedPopper: string;
		volumePopper: string;
		volumeProgress: string;
		volumeProgressBar: string;
	};
};

export interface VideoOptions {
	/**
	 * 快进会退秒数
	 */
	forwardOrBack: number;
}

export const useVideo = (options: VideoOptions) => {
	const videoDom = ref<HTMLVideoElement>();
	const rootDom = ref<HTMLElement>();
	const switchBtnDom = ref<HTMLElement>();
	const fullscreenBtnDom = ref<HTMLElement>();
	const progressDom = ref<HTMLElement>();
	const volumePopperDom = ref<HTMLElement>();

	let progressTotalWidth = 0;
	const progressBarPosition = ref(0);
	const playSwitch = ref(false);
	const volume = ref(50);
	const totalTime = ref(0);
	const currentTime = ref(0);
	const isMouseOnProgress = useDebouncedRef(false);

	const { forwardOrBack } = options;

	const { doFullscreen } = useFullscreen(rootDom);

	const onEnterProgress = () => {
		isMouseOnProgress.value = true;
	};

	const onLeaveProgress = () => {
		isMouseOnProgress.value = false;
	};

	const onAdjustmentProgress = (e: MouseEvent) => {
		progressBarPosition.value = e.offsetX;
	};

	const onSelectedProgress = (e: MouseEvent) => {
		const per = e.offsetX / progressTotalWidth;
		currentTime.value = (e.offsetX / progressTotalWidth) * totalTime.value;
		const _videDom = videoDom.value;
		if (_videDom) {
			_videDom.currentTime = per * totalTime.value;
		}
	};

	const onSelectedVolume = (e: MouseEvent) => {
		const height = (e.target as HTMLElement).getBoundingClientRect().height;
		volume.value = Math.ceil(((height - e.offsetY) / height) * 100);
		doAdjustVolume(volume.value / 100);
	};

	const onClickPlaySwitch = () => {
		doPlay(!playSwitch.value);
	};

	const onVideoTimeUpdate = () => {
		const _video = videoDom.value;
		currentTime.value = _video?.currentTime || 0;
	};

	const onVideoCanplay = () => {
		const _video = videoDom.value;
		totalTime.value = _video?.duration || 0;
	};

	const obtainCurrentFormatedTime = computed(() =>
		isMouseOnProgress.value ? secondFormatHMS((progressBarPosition.value / progressTotalWidth) * totalTime.value) : secondFormatHMS(currentTime.value)
	);

	const obtainTotalFormatedTime = computed(() => secondFormatHMS(totalTime.value));
	const obtainProgressPosition = computed(() => (currentTime.value / totalTime.value) * progressTotalWidth);

	/**
	 * 控制播放/暂停
	 * @param {Boolean} flag true 播放，false 暂停
	 */
	const doPlay = (flag: boolean) => {
		playSwitch.value = flag;
		if (flag) {
			videoDom.value?.play();
		} else {
			videoDom.value?.pause();
		}
	};

	/**
	 * 设置音量
	 * @param {Number} count 0..1之间的数字
	 */
	const doAdjustVolume = (count: number) => {
		//设置音量大小
		if (videoDom.value) {
			videoDom.value.volume = count;
		}
	};

	/**
	 * 快进
	 */
	const doForward = () => {
		const _videoDom = videoDom.value;
		if (_videoDom) {
			const targetTime = _videoDom.currentTime + forwardOrBack;
			if (targetTime >= totalTime.value) {
				_videoDom.currentTime = totalTime.value;
			} else {
				_videoDom.currentTime = targetTime;
			}
		}
	};

	/**
	 * 快退
	 */
	const doBack = () => {
		const _videoDom = videoDom.value;
		if (_videoDom) {
			const targetTime = _videoDom.currentTime - forwardOrBack;
			if (targetTime <= 0) {
				_videoDom.currentTime = 0;
			} else {
				_videoDom.currentTime = targetTime;
			}
		}
	};

	const onKeyDown = (e: KeyboardEvent) => {
		e.preventDefault();
		e.stopImmediatePropagation();
		switch (e.code) {
			case 'Space':
				doPlay(!playSwitch.value);
				break;
			case 'ArrowRight':
				doForward();
				break;
			case 'ArrowLeft':
				doBack();
				break;
		}
	};

	const onVideoFocus = (e: FocusEvent) => {
		(e.target as HTMLElement)?.addEventListener('keydown', onKeyDown);
	};

	const onVideoBlur = (e: FocusEvent) => {
		(e.target as HTMLElement)?.removeEventListener('keydown', onKeyDown);
	};

	onMounted(() => {
		const _rootDom = rootDom.value,
			_video = videoDom.value,
			_progressDom = progressDom.value,
			_volumePopperDom = volumePopperDom.value,
			_fullscreenBtnDom = fullscreenBtnDom.value,
			_switchDom = switchBtnDom.value;
		progressTotalWidth = _progressDom?.getBoundingClientRect().width || 0;

		_rootDom?.setAttribute('tabindex', '0');

		_rootDom?.addEventListener('focus', onVideoFocus);
		_rootDom?.addEventListener('blur', onVideoBlur);

		_video?.addEventListener('click', onClickPlaySwitch);
		_video?.addEventListener('timeupdate', onVideoTimeUpdate);
		_video?.addEventListener('canplay', onVideoCanplay);

		_progressDom?.addEventListener('click', onSelectedProgress);
		_progressDom?.addEventListener('mouseenter', onEnterProgress);
		_progressDom?.addEventListener('mouseleave', onLeaveProgress);
		_progressDom?.addEventListener('mousemove', onAdjustmentProgress);

		_switchDom?.addEventListener('click', onClickPlaySwitch);
		_volumePopperDom?.addEventListener('click', onSelectedVolume);
		_fullscreenBtnDom?.addEventListener('click', doFullscreen);
	});

	onUnmounted(() => {
		const _rootDom = rootDom.value,
			_video = videoDom.value,
			_progressDom = progressDom.value,
			_volumePopperDom = volumePopperDom.value,
			_fullscreenBtnDom = fullscreenBtnDom.value,
			_switchDom = switchBtnDom.value;

		_rootDom?.removeEventListener('focus', onVideoFocus);
		_rootDom?.removeEventListener('blur', onVideoBlur);

		_video?.removeEventListener('click', onClickPlaySwitch);
		_video?.removeEventListener('timeupdate', onVideoTimeUpdate);
		_video?.removeEventListener('canplay', onVideoCanplay);

		_progressDom?.removeEventListener('click', onSelectedProgress);
		_progressDom?.removeEventListener('mouseenter', onEnterProgress);
		_progressDom?.removeEventListener('mouseleave', onLeaveProgress);
		_progressDom?.removeEventListener('mousemove', onAdjustmentProgress);

		_switchDom?.removeEventListener('click', onClickPlaySwitch);
		_volumePopperDom?.removeEventListener('click', onSelectedVolume);
		_fullscreenBtnDom?.removeEventListener('click', doFullscreen);
		//_volumeSliderDom?.removeEventListener('mousemove', onAdjustmentVolume);
	});

	return {
		/**
		 * video
		 */
		videoDom,
		/**
		 * 组件根
		 */
		rootDom,
		/**
		 * 进度条
		 */
		progressDom,
		/**
		 * 播放按钮
		 */
		switchBtnDom,
		/**
		 * 全屏按钮
		 */
		fullscreenBtnDom,
		/**
		 * 音量弹出气泡
		 */
		volumePopperDom,
		/**
		 * 音量
		 */
		volume,

		/**
		 * 播放状态
		 */
		playSwitch,
		/**
		 * 总时长
		 */
		totalTime,
		/**
		 * 当前时长
		 */
		currentTime,
		/**
		 * 格式化后的时间
		 */
		obtainCurrentFormatedTime,
		/**
		 * 格式化后的总时间
		 */
		obtainTotalFormatedTime,
		/**
		 * 进度条当前位置
		 */
		obtainProgressPosition,
		/**
		 * progress bar 当前left
		 */
		progressBarPosition,
		doFullscreen,
		doPlay,
		doAdjustVolume,
		doForward,
		doBack
	};
};
export {};
