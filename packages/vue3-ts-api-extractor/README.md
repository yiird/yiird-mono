# `vue3-ts-api-extractor`

[中文](./docs/zh-CN.md)
  
> If your project or library is built with vue3 + typescript, the `vue3-ts-api-extractor` can extract the comments. you can get the json of comments or generate Markdown documents directly。
> 
>  Note: Currently not supported TSX and `<script setup>` syntactic sugar.

## Comments Standard
The following two styles are supported for export.
```js
/**
 * Component Description
 * 
 * @author author name
 * @name component name, or it can obtained through the component configuration `name`, `@name` have higher priority.
 * @date `xxxx-xx-xx h:m`
 */
export default {
    name:'ComponentName',
    props:{
        ...
    }
}

/**
 * Component Description
 * ... other comments is smiller to above
 */
export default defineComponent({
    name:'ComponentName',
    props:{
        ...
    }
})
```

### Props

> Support Props import from other file,and `...`(Spread Assignment) in Props.

* `@private` if is true this prop is private, will not display, default is `false`
* `@default` set prop default value, you can also use `prop.default` the same as below, but the `@default` have higher priority.
* `@values` possible values


```js
... 省略其他
<script lang="ts">
import { defineComponent } from 'vue';
import { SomeOtherProps } from './some-other-file';

export default defineComponent({
	name: 'OButton',
	props: {
        ... SomeOtherProps,
        /**
         * the button size
         * @private
         * @default 'xs'
         * @values `xxs`, `xs`, `sm`, `md`, `lg`, `xl`, `xxl`
         */
        size: {
            type: String as PropType<OThemeSize | 1 | string>,
            default: 'md',
            required: true
        },
        // ...
    }
});
</script>
```
### Methods



## Install

```shell
yarn add -D @yiird/vue3-ts-api-extractor
npm i -D @yiird/vue3-ts-api-extractor
```
## Example

```js
import {extract} from '@yiird/vue3-ts-api-extractor'

const options = {
	loader: {
		root: resolve(__dirname),
		scanDirs: ['./resource'],
		extensions: ['.vue', '.ts'],
		externals: ['vue', '@vue/*', 'lodash-es', '@fortawesome/*']
	},
	markdown: {
		output: {
			dir: '/targetDir/',
			singleFile: false,
			name(name) {
				return name;
			}
		},
		transform(md) {
			console.log(md);
			return md;
		}
	}
};

extract(options);
```

## Options

* ### `options.loader` { Object }
  * `root` { String } root path is absolute path of project
  * `scanDirs` { String[] } the sources folder relative to `root`. e.g. the following, `root` is absolute path of `project-dir`, `scanDirs:['./resource']`
  
    ```
    project-dir
    ├── resource
    │   ├── components.ts
    │   ├── core
    │   │   └── logic-base.ts
    │   └── packages
    │       ├── button
    │       │   ├── OButtonBtn.vue
    │       │   ├── index.ts
    │       │   ├── o-button-props.ts
    │       │   └── o-button.vue
    │       └── index.ts
    └── resource2
        ├── main.ts
        └── other.ts
    ```
  * `extensions` { String[] } support `['.vue','.ts']`
  * `externals` { Strign[] } exclude third-party libraries. e.g. `externals:['vue', '@vue/*', 'lodash-es', '@fortawesome/*']`，`*` what does it mean to start with something.

* ### `options.markdown` { Object }
  * output { Object }
    * `dir` { String } the output absolute path for the `md` file
    * `singleFile` { Boolean } if output into single `md` file
    * `name` { Function } return the `md` file name
  
  * transform { Function } callback every time a `md` is generated, before write into file


