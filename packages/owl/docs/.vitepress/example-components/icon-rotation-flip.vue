<template>
	<span class="tip">正常</span>
	<br />
	<o-icon
		fixed-width
		icon="camera"
		size="2x"></o-icon>
	<o-icon
		fixed-width
		icon="coffee"
		size="2x"></o-icon>
	<o-icon
		fixed-width
		icon="6"
		size="2x"></o-icon>
	<hr />
	<span class="tip">旋转</span>
	<br />
	<o-icon
		fixed-width
		icon="camera"
		rotation="90"
		size="2x"></o-icon>
	<o-icon
		fixed-width
		icon="coffee"
		rotation="90"
		size="2x"></o-icon>
	<o-icon
		fixed-width
		icon="6"
		rotation="90"
		size="2x"></o-icon>
	<hr />
	<span class="tip">翻转-horizontal</span>
	<br />
	<o-icon
		fixed-width
		icon="camera"
		flip="horizontal"
		size="2x"></o-icon>
	<o-icon
		fixed-width
		icon="coffee"
		flip="horizontal"
		size="2x"></o-icon>
	<o-icon
		fixed-width
		icon="6"
		flip="horizontal"
		size="2x"></o-icon>
	<hr />
	<span class="tip">翻转-vertical</span>
	<br />
	<o-icon
		fixed-width
		icon="camera"
		flip="vertical"
		size="2x"></o-icon>
	<o-icon
		fixed-width
		icon="coffee"
		flip="vertical"
		size="2x"></o-icon>
	<o-icon
		fixed-width
		icon="6"
		flip="vertical"
		size="2x"></o-icon>
	<hr />
	<span class="tip">翻转-both</span>
	<br />
	<o-icon
		fixed-width
		icon="camera"
		flip="both"
		size="2x"></o-icon>
	<o-icon
		fixed-width
		icon="coffee"
		flip="both"
		size="2x"></o-icon>
	<o-icon
		fixed-width
		icon="6"
		flip="both"
		size="2x"></o-icon>
</template>

<script lang="ts">
import { fa6, faCamera, faCoffee, faHome } from '@fortawesome/free-solid-svg-icons';
import { addIcons } from '@yiird/owl';

addIcons(faCamera, faCoffee, fa6, faHome);
</script>

<style scoped>
.o-icon {
	margin: 5px;
}
</style>
