# `vue3-ts-api-extractor`
  
> 如果你的项目是 vue3 + typescript 构建的，那么`vue3-ts-api-extractor`可提取项目中的注释，即可以获取json数据结构也可以生成Markdown文档。
> 
>  注意 : 暂不支持 TSX和`<script setup>`语法糖


## 注释规范
支持一下两种组件导出形式
```js
/**
 * 组件说明
 * 
 * @author 作者
 * @name 组件名称，可通过配置项 `name`获取，@name 优先级高于 配置选项中的 `name`
 * @date `xxxx-xx-xx h:m`
 */
export default {
    name:'ComponentName',
    props:{
        ...
    }
}

/**
 * 组件说明
 */
export default defineComponent({
    name:'ComponentName',
    props:{
        ...
    }
})
```

### Props

> 支持其他文件引入Props，支持Props中使用三点运算符`(...)`。

* `@private` 控制是否公开
* `@default` 配置prop默认值 ，也可在以下 `size.default` 中获取，但`@default`的优先级更高
* `@values` 的可取值


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
         * 尺寸
         * @private
         * @default 'xs'
         * @values `xxs`, `xs`, `sm`, `md`, `lg`, `xl`, `xxl`
         */
        size: {
            type: String as PropType<OThemeSize | 1 | string>,
            default: 'md',
            required: true,
            validator: (value: string) => {
                // 这个值必须匹配下列字符串中的一个
                return ['2xs', 'xs', 'sm', 'md', 'lg', 'xl', '2xl'].indexOf(value) !== -1;
            }
        },
        //这里省略其他 ...
    }
});
</script>
```
### Methods



## 安装

```shell
yarn add -D @yiird/vue3-ts-api-extractor
npm i -D @yiird/vue3-ts-api-extractor
```
## 举例

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

## 配置 `options`

* ### `options.loader` { Object }
  * `root` { String } `root`是项目根路径的绝对路径
  * `scanDirs` { String[] } 相对`root`的源码文件目录，可以是多个。例如：以下目录结构，`root` 是指向 `project-dir` 的绝对路径，`scanDirs` 为相对于`project-dir`目录的路径, 例如: `scanDirs:['./resource','./resource2']`，当然也可以设置为：`sanDirs:['.']`，工具会递归扫描项目下的所有符合 `extensions` 中后缀的文件，并加载到缓存中，这样会扫描一部分与业务逻辑无关的文件。比如一些项目配置文件。
  
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
  * `extensions` { String[] } 参与扫描的文件后缀 默认:`['.vue','.ts']`，目前也就支持这两种类型的文件。
  * `externals` { Strign[] } 由于工具扫描文件时，会关联引入的文件，这里可以剔除第三方库。例如：`externals:['vue', '@vue/*', 'lodash-es', '@fortawesome/*']`, `*`指以什么开头的三方库

* ### `options.markdown` { Object }
  * output { Object }
    * `dir` { String } md文件的输出目录，此处为绝对目录
    * `singleFile` { Boolean } 是否将所有文档生成到单文件中
    * `name` { Function } 输出的文件名，可用于修改输出的md文件名
  
  * transform { Function } 每次生成`md`后,在写入文件之前回调这个函数


