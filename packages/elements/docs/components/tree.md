# Tree


Tree使用

## Props


<div class="props">

| 名称                   | 描述                                                                                                                                                                                                                                             |                                     类型                                     | 可选值                                                                                                                  |
| :--------------------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :--------------------------------------------------------------------------: | :---------------------------------------------------------------------------------------------------------------------- |
| id                     | 组件id，若不设置会自动生成                                                                                                                                                                                                                       |                                    String                                    |                                                                                                                         |
| display                | 显示隐藏<hr>默认值:<br><pre>true</pre>                                                                                                                                                                                                           |                                    Boolean                                   |                                                                                                                         |
| items                  | 数据，此数据为标准树形结构数据或者能构成标准树形结构的扁平数据<hr>默认值:<br><pre>default () {<br>  return [];<br>}</pre>                                                                                                                        |                                   object[]                                   |                                                                                                                         |
| key-config             | 标识(字段)配置<br/><br/>告知组件主键、父主键、显示文本、子节点分别对应数据中的字段<hr>默认值:<br><pre>{<br>  key: 'id',<br>  pkey: 'pid',<br>  ckey: 'children',<br>  ikey: 'icon',<br>  tkey: 'name'<br>}</pre>                                 |                          [KeyConfig](#linkkeyconfig)                         |                                                                                                                         |
| size                   | 尺寸<hr>默认值:<br><pre>md</pre>                                                                                                                                                                                                                 |                               [Size](#linksize)                              | `2xs` , `xs` , `sm` , `md` , `lg` , `xl` , `2xl` , `1x` , `2x` , `3x` , `4x` , `5x` , `6x` , `7x` , `8x` , `9x` , `10x` |
| cascade                | 是否级联选中父级、子集<hr>默认值:<br><pre>true</pre>                                                                                                                                                                                             |                                    boolean                                   |                                                                                                                         |
| dragable               | <hr>默认值:<br><pre>false</pre>                                                                                                                                                                                                                  |                                    boolean                                   |                                                                                                                         |
| show-icon              | 是否显示图标<hr>默认值:<br><pre>true</pre>                                                                                                                                                                                                       |                                    Boolean                                   |                                                                                                                         |
| show-line              | 是否显示辅助线<hr>默认值:<br><pre>true</pre>                                                                                                                                                                                                     |                                    Boolean                                   |                                                                                                                         |
| icon                   | 主要图标<hr>默认值:<br><pre>faFolder</pre>                                                                                                                                                                                                       |               [IconNameOrDefinition](#linkiconnameordefinition)              |                                                                                                                         |
| icon-actived           | 主要图标<hr>默认值:<br><pre>faFolderOpen</pre>                                                                                                                                                                                                   |               [IconNameOrDefinition](#linkiconnameordefinition)              |                                                                                                                         |
| leaf-icon              | 叶子结点图标<hr>默认值:<br><pre>faFile</pre>                                                                                                                                                                                                     |               [IconNameOrDefinition](#linkiconnameordefinition)              |                                                                                                                         |
| switch-icons           | <hr>默认值:<br><pre>default () {<br>  return [faSquareCheck, faSquare, faSquareMinus];<br>}</pre>                                                                                                                                                | [Array](#linkarray)&lt;[IconNameOrDefinition](#linkiconnameordefinition)&gt; |                                                                                                                         |
| always-focus           | 是否一直保持关注状态<hr>默认值:<br><pre>true</pre>                                                                                                                                                                                               |                                    Boolean                                   |                                                                                                                         |
| multi-select           | <hr>默认值:<br><pre>true</pre>                                                                                                                                                                                                                   |                                    Boolean                                   |                                                                                                                         |
| default-selected-keys  | 展开并设置为焦点节点<hr>默认值:<br><pre>default () {<br>  return [];<br>}</pre>                                                                                                                                                                  |                  [Array](#linkarray)&lt;string \| number&gt;                 |                                                                                                                         |
| expand-keys            | 展开配置<hr>默认值:<br><pre>default () {<br>  return [];<br>}</pre>                                                                                                                                                                              |                  [Array](#linkarray)&lt;string \| number&gt;                 |                                                                                                                         |
| expand-level           | 展开配置,默认展开到第几级                                                                                                                                                                                                                        |                                    number                                    |                                                                                                                         |
| trigger-count          | 触发虚拟渲染的数量，当总节点数超过此值时并且数量大于预渲染的数量时，进行虚拟渲染。<br/>预渲染的数量=每屏数量*`pre-render-screen-size`,其中`每屏数量`是自动计算的，无法设置。可以通过tree实例上的getBoundary()获取。<hr>默认值:<br><pre>500</pre> |                                    number                                    |                                                                                                                         |
| pre-render-screen-size | 预渲染屏数量，必须为基数<hr>默认值:<br><pre>5</pre>                                                                                                                                                                                              |                                    number                                    |                                                                                                                         |

</div>



## Events


<div class="events">

| 名称   | 参数                                                  | 描述     |
| :----- | :---------------------------------------------------- | :------- |
| select | `arg0` { [TreeEventData](#linktreeeventdata) } ：参数 | 选中事件 |

</div>



## Methods

### setDisplay(flag: boolean)
- 用法： 设置隐藏
- 参数：
	 - flag： true:显示，false:隐藏

### domRefresh()
- 用法： 刷新组件





### selectRange(startKey: ,endKey: ,flag: boolean,cascade: boolean)
- 用法： 给定开始标识和结束标识(选中/取消)选中节点
- 参数：
	 - startKey： 开始标识
	 - endKey： 结束标识
	 - flag： true 选中，false 取消选中
	 - cascade： [可选] 级联选中父级、子集

### select(key: ,flag: boolean,cascade: boolean)
- 用法： 给定节点标识，(选中/取消)选中节点
- 参数：
	 - key： 节点标识
	 - flag： true 选中，false 取消选中
	 - cascade： [可选] 级联选中父级、子集

### getBoundary()
- 用法： 获取边界

## 关联类型



### Array {#linkarray}


### KeyConfig {#linkkeyconfig}

- 选项：
	 - `key` { string } : 主键标识
	 - `pkey` { string } : 父级标识
	 - `ckey` { string } : 子节点标识(如果是扁平数据，则不需要配置ckey)
	 - `ikey` { string } : 图标标识，如果数据中没有图标属性，则使用props中配置的图标
	 - `tkey` { string } : 文本内容标识
	 - `operatorNodeFn` { (node: TreeNode) =&gt; void } : 

### Size {#linksize}

- Size = 	 [TshirtSize](#linktshirtsize) \| [NumberSize](#linknumbersize)

### IconNameOrDefinition {#linkiconnameordefinition}

- IconNameOrDefinition = 	 IconDefinition \| IconPack \| IconName

### TreeEventData {#linktreeeventdata}

- 描述： 实践参数类型
- 选项：
	 - `node` { [RawNode](#linkrawnode) } : 
	 - `ev` { Event } : 

### TshirtSize {#linktshirtsize}

- TshirtSize = 	 `2xs` \| `xs` \| `sm` \| `md` \| `lg` \| `xl` \| `2xl`

### NumberSize {#linknumbersize}

- NumberSize = 	 `1x` \| `2x` \| `3x` \| `4x` \| `5x` \| `6x` \| `7x` \| `8x` \| `9x` \| `10x`

### RawNode {#linkrawnode}

- 选项：
	 - `isFolder` { boolean } : 是否是folder节点
	 - `parent` { [RawNode](#linkrawnode) } : 父级节点
	 - `level` { number } : 级别
	 - `index` { number } : 在整个扁平数据中的序号
	 - `brotherIndex` { number } : 在兄弟中的排行
	 - `brotherCount` { number } : 兄弟节点数量
	 - `isOpen` { boolean } : 是否打开状态
	 - `isHalfCheck` { boolean } : 是否半选中
	 - `isChecked` { boolean } : 是否选中
	 - `data` { any } : 源节点数据