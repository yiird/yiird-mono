# `vue3-ts-api-extractor`


> 如果你的项目是 vue3 + typescript 构建的，那么`vue3-ts-api-extractor`可提取项目中的注释，即可以获取json数据结构也可以生成Markdown文档。
> 
>  注意 : 暂不支持 TSX和`<script setup>`语法糖

## 安装

```shell
yarn add -D @yiird/vue3-ts-api-extractor
npm i -D @yiird/vue3-ts-api-extractor
```


## 使用

```js
import { extractor } from '@yiird/vue3-ts-api-extractor'

const options = {
	scanner: {
		root: '扫描组件根目录【绝对路径】',
		// scanDirs 跟路径下的子目录
		scanDirs: ['test-resouces'],
		extensions: ['.ts', '.vue'],
		externals: ['vue']
	},
	output: {
		single: false,
		dir: '文档输出目标地址的【绝对路径】',
		filename(filename) {
			console.log(filename);
			return filename;
		},
		type: 'markdown'
	}
};

const extractorobj = extractor(options);// 返回 Extractor 对象
/* ---------- */

//可继续处理单个文件，比如：可以监听文vue件变化，单独处理，此处理会强制重新扫描指定vue文件和其依赖文件。
//filename是vue文件，会重新生成注释文档
//filename不是vue文件,是其他的ts文件，则会对此文件直接、间接影响的所有vue文件进行处理，重新生成注释文档。
extractorobj.extractor(filename);

```

## 配置 `options`

* ### `options.scanner` { Object }
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
  * `watch` { Boolean | undefined } 设置监听，监听`options.scanner.root`下的，后缀名包含在 `extensions` 中的所有文件。会在extractor对象上触发 `filechange` 事件。事件回调参数：
    * `filename` { String } 为变动文件的绝对路径
    * `states` { [fs.Stats](https://nodejs.org/api/fs.html#fs_class_fs_stats) }
  ```js
  const extractorobj = extractor(options);
  extractorobj.on('filechange',(filename,states)=>{
    //重新提取指定文件的注释
    extractorobj.extractor(filename)
  })
  ```


* ### `options.output` { Object }
  * output { Object }
    * `dir` { String } md文件的输出目录，此处为绝对目录
    * `single` { Boolean } 是否将所有文档生成到单文件中
    * `type`: {'markdown' | 'json'} 生成文档类型（暂时只支持markdown）
    * `filename` { Function } 输出的文件名，可用于修改输出的md文件名

## 注释写法

支持一下两种组件导出形式.

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
### Slots 注释
```html
<!-- 这是一个slot -->
<!-- @param {String} arg0 参数描述 -->
<!-- @param {Arg1} arg1 参数描述 -->
<slot name="slot-name" arg0="arg-0" :arg1="{ a: 1, b: 2 }"></slot>
```
##### 生成的 markdown:

| 名称    | 参数                                                                                   | 描述         |
| :------ | :------------------------------------------------------------------------------------- | :----------- |
| default | `arg0` { String } ：参数描述<br>`arg1` { Arg1 } ：参数描述<br>关联类型：[Arg1](#arg1)  | 这是一个slot |

---




### Props 注释

> 支持其他文件引入Props，支持Props中使用三点运算符`(...)`。

* `@private` 控制是否公开
* `@default` 配置prop默认值 ，也可在以下 `size.default` 中获取，但`@default`的优先级更高
* `@values` 可取值，如果类型向这样写：PropType<`xxs`|`xs`|`sm`|`md`|`lg`|`xl`| `xxl`>, `@values` 可以不需要。


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
         */
        size: {
            type: String as PropType<`xxs`|`xs`|`sm`|`md`|`lg`|`xl`| `xxl`>,
            default: 'md',
            required: true
        },
        // ...
    }
});

//-------------还以下两种写法--------------
// @values
/**
 * the button size
 * @values `xxs`,`xs`,`sm`,`md`,`lg`,`xl`,`xxl`
 */
size: {
    type: String as PropType<string>,
    default: 'md',
    required: true
}

//---------------------------

const type ThemeSize = `xxs`|`xs`|`sm`|`md`|`lg`|`xl`

// @values
/**
 * the button size
 * @values `xxs`,`xs`,`sm`,`md`,`lg`,`xl`,`xxl`
 */
size: {
    type: String as PropType<ThemeSize>,
    default: 'md',
    required: true
}

</script>
```


##### 生成的 markdown:

| 名称 |   类型 | 必填 | 可选值 | 默认值 | 描述 |
| :------- | :---: | :--: | :--- | ---- | :----------- |
| size | String  | true | `xxs`, `xs`, `sm`, `md`, `lg`, `xl`, `xxl` | md  | 尺寸|

---

### 方法注释
```js
...
methods: {
    /**
     * fn1 方法定义说明
     * @param {Arg1} arg1 - arg1 说明
     */
    fn1(arg1: Arg1, arg2: string) {
    	return 0;
    },
    /**
     * fn2 方法定义说明
     */
    fn2(arg1: Arg2) {
    	return 0;
    }
}
...

```
##### 生成的 markdown:

#### fn1(arg1: Arg1,arg2: string)
- 用法： fn1 方法定义说明
- 参数：
	 - arg1： - arg1 说明
	 - arg2： 
- 关联类型：
	 - [Arg1](#arg1)

#### fn2(arg1: Arg2)
- 用法： fn2 方法定义说明
- 参数：
	 - arg1： 
- 关联类型：
	 - [Arg2](#arg2)

---
注意：关联类型是方法中使用到的高级类型，也会解析其注释统一生成到文档下方，可由锚点跟入。在`Props`,`Slots`,`Events`中也可以使用高级类型。