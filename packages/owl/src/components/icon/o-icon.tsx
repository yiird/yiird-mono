import { defineComponent, PropType } from "vue";
export default defineComponent({
	name:'Icon',
	props:{
		shape:{
			type:String as PropType<'aaa'|'bbb'>
		}
	}
})