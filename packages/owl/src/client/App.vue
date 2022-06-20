<script lang="ts">
import { defineComponent, reactive, ref } from 'vue';

const App = defineComponent({
	setup(props, context) {
		const featureRef = ref(0);
		const featureState = reactive({ property: 'value' });
		return {
			featureRef,
			featureState
		};
	}
});
export default App;
</script>

<style lang="scss" scoped></style>
