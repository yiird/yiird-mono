<template>
	<div class="calendar-wrap">
		<o-calendar
			@selected-year="onSelectedYear"
			@selected-month="onSelectedMonth"
			@selected-day="onSelectedDay"></o-calendar>
	</div>
</template>

<script
	lang="ts"
	setup>
import { CalendarEventBinding } from '@yiird/owl';

const onSelectedYear = (binding: CalendarEventBinding) => {
	console.log('year-change:', binding);
};
const onSelectedMonth = (binding: CalendarEventBinding) => {
	console.log('month-change:', binding);
};
const onSelectedDay = (binding: CalendarEventBinding) => {
	console.log('day-change:', binding);
};
</script>

<style
	lang="scss"
	scoped>
.calendar-wrap {
	padding: 10px;
	margin: auto;
}
</style>
