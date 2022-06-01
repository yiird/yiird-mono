import { defineComponent as _defineComponent } from 'vue';

export default /*#__PURE__*/ _defineComponent({
	props: {
		foo: { type: String, required: true },
		bar: Number
	},
	setup(__props, { expose }) {
		expose();

		const props = __props;

		props.foo; // string
		props.bar; // number | undefined

		const __returned__ = { props };
		Object.defineProperty(__returned__, '__isScriptSetup', { enumerable: false, value: true });
		return __returned__;
	}
});

/*#__PURE__*/ _defineComponent({
	props: {
		foo: { type: String, required: true },
		bar: Number
	},
	setup(__props, { expose }) {
		expose();

		const props = __props;

		props.foo; // string
		props.bar; // number | undefined

		const __returned__ = { props };
		Object.defineProperty(__returned__, '__isScriptSetup', { enumerable: false, value: true });
		return __returned__;
	}
});
