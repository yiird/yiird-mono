<template>
	<div
		v-show="display__"
		v-if="refresh__"
		:id="id__"
		:class="block"
		v-bind="$attrs"
		:style="{ ...theme.vars }">
		<div :class="el_mainWrap">
			<div :class="el_selectorWrap">
				<span
					:class="el_selectorButton"
					@click.stop="onHeavyPrev">
					<icon
						fixed-width
						prefix="fad"
						icon="angles-left"></icon>
				</span>
				<span
					v-show="!(isMonthSelector || isYearSelector)"
					:class="el_selectorButton"
					@click.stop="onPrev">
					<icon
						fixed-width
						prefix="fad"
						icon="angle-left"></icon>
				</span>
				<div v-show="!(isMonthSelector || isYearSelector)">
					<span
						:class="[el_selectorButton, el_selectorText]"
						@click.stop="openSelectYear">
						{{ obtainYear }}{{ t('message._lib_.calendar.year') }}
					</span>
					<span :class="el_selectorText"> - </span>
					<span
						:class="[el_selectorButton, el_selectorText]"
						@click.stop="openSelectMonth">
						{{ obtainMonth + 1 }}{{ t('message._lib_.calendar.month') }}
					</span>
				</div>
				<span
					v-show="isYearSelector"
					:class="el_selectorText">
					{{ yearRangeStart }} {{ t('message._lib_.calendar.year') }} - {{ yearRangeStart + 19 }} {{ t('message._lib_.calendar.year') }}
				</span>
				<span
					v-show="isMonthSelector"
					:class="el_selectorText">
					{{ obtainYear }} {{ t('message._lib_.calendar.year') }}
				</span>
				<span
					v-show="!(isMonthSelector || isYearSelector)"
					:class="el_selectorButton"
					@click.stop="onNext">
					<icon
						prefix="fad"
						fixed-width
						icon="angle-right"></icon>
				</span>
				<span
					:class="el_selectorButton"
					@click.stop="onHeavyNext">
					<icon
						prefix="fad"
						fixed-width
						icon="angles-right"></icon>
				</span>
			</div>
			<!-- 选择天 -->
			<div
				v-show="!(isMonthSelector || isYearSelector)"
				:class="el_weekWrap">
				<div
					v-for="(item, index) in obtainWeeks"
					:key="`week_${index}`"
					:class="el_weekItem">
					<span :class="item.classes">{{ item.shortText }}</span>
				</div>
			</div>
			<div
				v-show="!(isMonthSelector || isYearSelector)"
				:class="el_daysWrap">
				<div
					v-for="(item, index) in obtainDays"
					:key="`day_${index}`"
					:class="el_daysItem"
					@click.stop="onSelectDay(item)">
					<span :class="item.classes">{{ item.dateNum }}</span>
					<div
						v-if="item.isCurrent"
						:class="el_currentText">
						{{ t('message._lib_.calendar.today') }}
					</div>
				</div>
			</div>

			<!-- 选择年 -->
			<div
				v-show="isYearSelector"
				:class="el_yearWrap">
				<div
					v-for="(item, index) in obtainYears"
					:key="`year_${index}`"
					:class="el_yearItem"
					@click.stop="onSelectYear(item)">
					<span :class="item.classes">{{ item.yearNum }}</span>
					<div
						v-if="item.isCurrent"
						:class="el_currentText">
						{{ t('message._lib_.calendar.thisyear') }}
					</div>
				</div>
			</div>

			<!-- 选择月 -->
			<div
				v-show="isMonthSelector"
				:class="el_monthWrap">
				<div
					v-for="(item, index) in obtainMonths"
					:key="`month_${index}`"
					:class="el_monthItem"
					@click.stop="onSelectMonth(item)">
					<span :class="item.classes">{{ item.longText }}</span>
					<div
						v-if="item.isCurrent"
						:class="el_currentText">
						{{ t('message._lib_.calendar.thismonth') }}
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import { library } from '@fortawesome/fontawesome-svg-core';
import { faAngleLeft, faAngleRight, faAnglesLeft, faAnglesRight } from '@fortawesome/pro-duotone-svg-icons';
import { addDays, addMonths, addYears, format, getDaysInMonth, getISODay, isSameDay, setDate, setMonth, setYear, subDays, subMonths, subYears } from 'date-fns';
import { isDate } from 'lodash-es';
import { computed, defineComponent, reactive, ref, watchEffect } from 'vue';
import { useI18n } from 'vue-i18n';
import { usePrefab } from '../../common/prefab';
import { transforDate } from '../../common/util';
import { Icon } from '../icon';

import { CalendarBemKeys, CalendarDay, CalendarEventBinding, CalendarMonth, CalendarProps, CalendarVariables, CalendarWeek, CalendarYear } from './definition';

library.add(faAnglesLeft, faAnglesRight, faAngleLeft, faAngleRight);

/**
 * 日历
 */
export default defineComponent({
	name: 'OCalendar',
	components: {
		Icon
	},
	props: CalendarProps,
	emits: ['selected-year', 'selected-month', 'selected-day', 'update:modelValue'],
	setup(props, { emit }) {
		const { t } = useI18n();
		const prefab = usePrefab<CalendarVariables, CalendarBemKeys>(props);
		const { theme, bem } = prefab;

		const block = bem.block;
		const elements = bem.elements;

		const now = new Date();
		const selected = ref(transforDate(props.modelValue) || now);
		const isDateType = ref(isDate(props.modelValue));

		watchEffect(() => {
			const modelValue = props.modelValue;
			if (modelValue === '') {
				selected.value = now;
			} else {
				const _date = transforDate(modelValue);
				if (_date) {
					selected.value = _date;
				}
			}
		});

		const obtainSelected = computed(() => selected.value);
		const obtainYear = computed(() => obtainSelected.value.getFullYear());
		const obtainMonth = computed(() => obtainSelected.value.getMonth());

		const obtainDays = computed<CalendarDay[]>(() => {
			const firstDayOfCurrentMonth = new Date(obtainYear.value, obtainMonth.value, 1);

			const offsetStartOfFirstDay = getISODay(firstDayOfCurrentMonth) - 1;

			const firstDay = subDays(firstDayOfCurrentMonth, offsetStartOfFirstDay);
			const daysCount = getDaysInMonth(obtainSelected.value);
			const _arr: CalendarDay[] = [];
			for (let i = 0; i < 42; i++) {
				const _date = addDays(firstDay, i);
				const classes = [elements.daysItemText.value];
				const isSelected = isSameDay(obtainSelected.value, _date);
				const isCurrent = isSameDay(now, _date);

				const isDisabled = i < offsetStartOfFirstDay || i >= daysCount + offsetStartOfFirstDay;
				if (isCurrent) {
					classes.push('current');
				}
				if (isSelected) {
					classes.push('selected');
				}
				if (isDisabled) {
					classes.push('disabled');
				}
				_arr.push(
					reactive({
						date: _date,
						dateNum: _date.getDate(),
						isCurrent,
						isSelected,
						isDisabled,
						classes: classes
					})
				);
			}
			return _arr;
		});

		const yearRangeStart = ref(obtainYear.value - (obtainYear.value % 20));

		const obtainYears = computed(() => {
			const _arr: CalendarYear[] = [];
			for (let i = yearRangeStart.value; i < yearRangeStart.value + 20; i++) {
				const isCurrent = i === now.getFullYear();
				const isSelected = i === obtainSelected.value.getFullYear();
				const classes = [elements.yearItemText.value];
				if (isCurrent) {
					classes.push('current');
				}
				if (isSelected) {
					classes.push('selected');
				}
				_arr.push({
					yearNum: i,
					isCurrent,
					classes: classes
				});
			}
			return _arr;
		});

		const obtainMonths = computed(() => {
			const _arr: CalendarMonth[] = [];
			for (let i = 1; i <= 12; i++) {
				const isCurrent = obtainYear.value === now.getFullYear() && i === now.getUTCMonth();
				const isSelected = i === obtainSelected.value.getMonth() + 1;
				const classes = [elements.monthItemText.value];
				if (isCurrent) {
					classes.push('current');
				}
				if (isSelected) {
					classes.push('selected');
				}
				_arr.push({
					monthNum: i,
					isCurrent,
					shortText: t('message._lib_.calendar.short_text.month', i - 1),
					longText: t('message._lib_.calendar.long_text.month', i - 1),
					classes
				});
			}
			return _arr;
		});

		const obtainWeeks = computed(() => {
			const _arr: CalendarWeek[] = [];

			for (let i = 0; i < 7; i++) {
				_arr.push({
					weekNum: i + 1,
					shortText: t('message._lib_.calendar.short_text.week', i),
					longText: t('message._lib_.calendar.long_text.week', i),
					classes: [elements.weekItemText.value]
				});
			}
			return _arr;
		});

		const isYearSelector = ref(false);
		const isMonthSelector = ref(false);

		const openSelectDay = () => {
			isMonthSelector.value = false;
			isYearSelector.value = false;
		};

		const openSelectYear = () => {
			isMonthSelector.value = false;
			isYearSelector.value = true;
		};

		const openSelectMonth = () => {
			isYearSelector.value = false;
			isMonthSelector.value = true;
		};

		/**
		 * @private
		 */
		const onHeavyPrev = () => {
			if (isYearSelector.value) {
				yearRangeStart.value -= 20;
			} else {
				selected.value = subYears(selected.value, 1);
			}
		};

		/**
		 * @private
		 */
		const onHeavyNext = () => {
			if (isYearSelector.value) {
				yearRangeStart.value += 20;
			} else {
				selected.value = addYears(selected.value, 1);
			}
		};
		/**
		 * @private
		 */
		const onPrev = () => {
			selected.value = subMonths(selected.value, 1);
		};
		/**
		 * @private
		 */
		const onNext = () => {
			selected.value = addMonths(selected.value, 1);
		};

		/**
		 * @private
		 */
		const onSelectDay = (_day: CalendarDay) => {
			if (_day.isDisabled) return;
			if (!isSameDay(selected.value, _day.date)) {
				const date = setDate(selected.value, _day.dateNum);
				selected.value = date;
				const formatted = format(date, props.format);

				const binding: CalendarEventBinding = {
					date,
					type: 'day',
					selectedNum: _day.dateNum,
					formatted
				};

				/**
				 * 改变日时触发
				 * @argument {CalendarEventBinding} binding 回调参数
				 */
				emit('selected-day', binding);
				/**
				 * @private
				 */
				emit('update:modelValue', isDateType.value ? date : formatted);
			}
		};

		/**
		 * @private
		 */
		const onSelectYear = (_year: CalendarYear) => {
			if (selected.value.getFullYear() !== _year.yearNum) {
				const date = setYear(selected.value, _year.yearNum);
				selected.value = date;
				const formatted = format(date, props.format);
				openSelectMonth();

				const binding: CalendarEventBinding = {
					date,
					type: 'year',
					selectedNum: _year.yearNum,
					formatted
				};

				/**
				 * 改变年时触发
				 * @argument {CalendarEventBinding} binding 回调参数
				 */
				emit('selected-year', binding);
				/**
				 * @private
				 */
				emit('update:modelValue', isDateType.value ? date : formatted);
			}
		};

		/**
		 * @private
		 */
		const onSelectMonth = (_month: CalendarMonth) => {
			if (selected.value.getUTCMonth() !== _month.monthNum) {
				const date = setMonth(selected.value, _month.monthNum - 1);
				selected.value = date;
				const formatted = format(date, props.format);
				openSelectDay();
				const binding: CalendarEventBinding = {
					date,
					type: 'month',
					selectedNum: _month.monthNum - 1,
					formatted
				};

				/**
				 * 改变月时触发
				 * @argument {CalendarEventBinding} binding 回调参数
				 */
				emit('selected-month', binding);
				/**
				 * @private
				 */
				emit('update:modelValue', isDateType.value ? date : formatted);
			}
		};

		return {
			t,
			...prefab,
			block,
			el_mainWrap: elements.mainWrap,
			el_yearWrap: elements.yearWrap,
			el_yearItem: elements.yearItem,
			el_monthWrap: elements.monthWrap,
			el_monthItem: elements.monthItem,
			el_selectorWrap: elements.selectorWrap,
			el_selectorButton: elements.selectorButton,
			el_selectorText: elements.selectorText,
			el_weekWrap: elements.weekWrap,
			el_weekItem: elements.weekItem,
			el_daysWrap: elements.daysWrap,
			el_daysItem: elements.daysItem,
			el_currentText: elements.currentText,
			theme,
			obtainYear,
			obtainMonth,
			obtainDays,
			obtainYears,
			obtainMonths,
			obtainWeeks,
			isYearSelector,
			isMonthSelector,
			yearRangeStart,
			openSelectYear,
			openSelectMonth,
			onHeavyPrev,
			onHeavyNext,
			onPrev,
			onNext,
			onSelectDay,
			onSelectYear,
			onSelectMonth
		};
	}
});
</script>

<style
	lang="scss"
	scoped>
@import './style.scss';
</style>
