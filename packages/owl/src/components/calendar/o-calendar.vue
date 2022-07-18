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
import { addDays, addMonths, addYears, getDaysInMonth, getISODay, isSameDay, setDate, setMonth, setYear, subDays, subMonths, subYears } from 'date-fns';
import { isDate } from 'lodash-es';
import { computed, defineComponent, reactive, ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { usePrefab } from '../../common/prefab';
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
	emits: ['selected-year', 'selected-month', 'selected-day'],
	setup(props, { emit }) {
		const { t } = useI18n();
		const prefab = usePrefab<CalendarVariables, CalendarBemKeys>(props);
		const { theme, bem } = prefab;

		const block = bem.block;
		const elements = bem.elements;

		const now = new Date(props.value);
		const current = ref(props.value ? (isDate(props.value) ? props.value : new Date(props.value)) : now);
		const obtainYear = computed(() => current.value.getFullYear());
		const obtainMonth = computed(() => current.value.getMonth());

		const obtainDays = computed<CalendarDay[]>(() => {
			const firstDayOfCurrentMonth = new Date(obtainYear.value, obtainMonth.value, 1);

			const offsetStartOfFirstDay = getISODay(firstDayOfCurrentMonth) - 1;

			const firstDay = subDays(firstDayOfCurrentMonth, offsetStartOfFirstDay);
			const daysCount = getDaysInMonth(current.value);
			const _arr: CalendarDay[] = [];
			for (let i = 0; i < 42; i++) {
				const _date = addDays(firstDay, i);
				const classes = [elements.daysItemText.value];
				const isSelected = isSameDay(current.value, _date);
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
				const classes = [elements.yearItemText.value];
				if (isCurrent) {
					classes.push('current');
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
				const classes = [elements.monthItemText.value];
				if (isCurrent) {
					classes.push('current');
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
				current.value = subYears(current.value, 1);
			}
		};

		/**
		 * @private
		 */
		const onHeavyNext = () => {
			if (isYearSelector.value) {
				yearRangeStart.value += 20;
			} else {
				current.value = addYears(current.value, 1);
			}
		};
		/**
		 * @private
		 */
		const onPrev = () => {
			current.value = subMonths(current.value, 1);
		};
		/**
		 * @private
		 */
		const onNext = () => {
			current.value = addMonths(current.value, 1);
		};

		/**
		 * @private
		 */
		const onSelectDay = (_day: CalendarDay) => {
			if (!isSameDay(current.value, _day.date)) {
				current.value = setDate(current.value, _day.dateNum);

				const binding: CalendarEventBinding = {
					date: current.value,
					type: 'day',
					value: _day.dateNum
				};

				/**
				 * 改变日时触发
				 * @argument {CalendarEventBinding} binding 回调参数
				 */
				emit('selected-day', binding);
			}
		};

		/**
		 * @private
		 */
		const onSelectYear = (_year: CalendarYear) => {
			if (current.value.getFullYear() !== _year.yearNum) {
				current.value = setYear(current.value, _year.yearNum);
				openSelectMonth();

				const binding: CalendarEventBinding = {
					date: current.value,
					type: 'year',
					value: _year.yearNum
				};

				/**
				 * 改变年时触发
				 * @argument {CalendarEventBinding} binding 回调参数
				 */
				emit('selected-year', binding);
			}
		};

		/**
		 * @private
		 */
		const onSelectMonth = (_month: CalendarMonth) => {
			if (current.value.getUTCMonth() !== _month.monthNum) {
				current.value = setMonth(current.value, _month.monthNum - 1);
				openSelectDay();
				const binding: CalendarEventBinding = {
					date: current.value,
					type: 'month',
					value: _month.monthNum - 1
				};

				/**
				 * 改变月时触发
				 * @argument {CalendarEventBinding} binding 回调参数
				 */
				emit('selected-month', binding);
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
