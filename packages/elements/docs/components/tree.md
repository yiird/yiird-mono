# Tree


Tree使用

## Props


<div class="props">

| 名称                  | 描述                                                                                                                                                                                                             |           类型          | 可选值                                                                                                                  |
| :-------------------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :---------------------: | :---------------------------------------------------------------------------------------------------------------------- |
| id                    | 组件id，若不设置会自动生成                                                                                                                                                                                       |          String         |                                                                                                                         |
| display               | 显示隐藏<hr>默认值:<br><pre>true</pre>                                                                                                                                                                           |         Boolean         |                                                                                                                         |
| items                 | 数据，此数据为标准树形结构数据或者能构成标准树形结构的扁平数据<hr>默认值:<br><pre>default () {<br>  return [];<br>}</pre>                                                                                        |         object[]        |                                                                                                                         |
| key-config            | 标识(字段)配置<br/><br/>告知组件主键、父主键、显示文本、子节点分别对应数据中的字段<hr>默认值:<br><pre>{<br>  key: 'id',<br>  pkey: 'pid',<br>  ckey: 'children',<br>  ikey: 'icon',<br>  tkey: 'name'<br>}</pre> | [KeyConfig](#keyconfig) |                                                                                                                         |
| size                  | 尺寸<hr>默认值:<br><pre>md</pre>                                                                                                                                                                                 |           Size          | `2xs` , `xs` , `sm` , `md` , `lg` , `xl` , `2xl` , `1x` , `2x` , `3x` , `4x` , `5x` , `6x` , `7x` , `8x` , `9x` , `10x` |
| cascade               | 是否级联选中父级、子集<hr>默认值:<br><pre>true</pre>                                                                                                                                                             |         Boolean         |                                                                                                                         |
| dragable              | <hr>默认值:<br><pre>false</pre>                                                                                                                                                                                  |         Boolean         |                                                                                                                         |
| show-icon             | 是否显示图标<hr>默认值:<br><pre>true</pre>                                                                                                                                                                       |         Boolean         |                                                                                                                         |
| show-line             | 是否显示辅助线<hr>默认值:<br><pre>true</pre>                                                                                                                                                                     |         Boolean         |                                                                                                                         |
| icon                  | 主要图标<hr>默认值:<br><pre>faFolder</pre>                                                                                                                                                                       |  String,IconDefinition  |                                                                                                                         |
| icon-actived          | 主要图标<hr>默认值:<br><pre>faFolderOpen</pre>                                                                                                                                                                   |  String,IconDefinition  |                                                                                                                         |
| leaf-icon             | 叶子结点图标<hr>默认值:<br><pre>faFile</pre>                                                                                                                                                                     |  String,IconDefinition  |                                                                                                                         |
| switch-icons          | <hr>默认值:<br><pre>default () {<br>  return [faSquareCheck, faSquare, faSquareMinus];<br>}</pre>                                                                                                                |  String,IconDefinition  |                                                                                                                         |
| always-focus          | 是否一直保持关注状态<hr>默认值:<br><pre>true</pre>                                                                                                                                                               |         Boolean         |                                                                                                                         |
| multi-select          | <hr>默认值:<br><pre>true</pre>                                                                                                                                                                                   |         Boolean         |                                                                                                                         |
| default-selected-keys | 展开并设置为焦点节点<hr>默认值:<br><pre>default () {<br>  return [];<br>}</pre>                                                                                                                                  |      String,Number      |                                                                                                                         |
| expand-keys           | 展开配置<hr>默认值:<br><pre>default () {<br>  return [];<br>}</pre>                                                                                                                                              |      String,Number      |                                                                                                                         |
| expand-level          | 展开配置,默认展开到第几级                                                                                                                                                                                        |          Number         |                                                                                                                         |

</div>



## Events


<div class="events">

| 名称   | 参数                                                                          | 描述     |
| :----- | :---------------------------------------------------------------------------- | :------- |
| select | `arg0` { TreeEventData } ：参数<br>关联类型：[TreeEventData](#treeeventdata)  | 选中事件 |

</div>



## Methods

### setDisplay(flag: boolean)
- 用法： 设置隐藏
- 参数：
	 - flag： true:显示，false:隐藏

### domRefresh()
- 用法： 刷新组件





### selectRange(startKey: string | number,endKey: string | number,flag: boolean,cascade: boolean)
- 用法： 给定开始标识和结束标识(选中/取消)选中节点
- 参数：
	 - startKey： 开始标识
	 - endKey： 结束标识
	 - flag： true 选中，false 取消选中
	 - cascade： [可选] 级联选中父级、子集

### select(key: string | number,flag: boolean,cascade: boolean)
- 用法： 给定节点标识，(选中/取消)选中节点
- 参数：
	 - key： 节点标识
	 - flag： true 选中，false 取消选中
	 - cascade： [可选] 级联选中父级、子集

## 关联类型



### KeyConfig

- 选项：
	 - `key` { string } : 主键标识
	 - `pkey` { string } : 父级标识
	 - `ckey` { string } : 子节点标识(如果是扁平数据，则不需要配置ckey)
	 - `ikey` { string } : 图标标识，如果数据中没有图标属性，则使用props中配置的图标
	 - `tkey` { string } : 文本内容标识
	 - `operatorNodeFn` { (node: TreeNode) => void } : 

### TreeEventData

- 描述： 实践参数类型
- 选项：
	 - `node` { RawNode } : 
	 - `ev` { Event } : 

- 关联类型：
	 - [RawNode](#rawnode)

### RawNode

- 选项：
	 - `isFolder` { boolean } : 是否是folder节点
	 - `parent` { RawNode } : 父级节点
	 - `level` { number } : 级别
	 - `index` { number } : 在整个扁平数据中的序号
	 - `brotherIndex` { number } : 在兄弟中的排行
	 - `brotherCount` { number } : 兄弟节点数量
	 - `isOpen` { boolean } : 是否打开状态
	 - `isHalfCheck` { boolean } : 是否半选中
	 - `isChecked` { boolean } : 是否选中
	 - `data` { any } : 源节点数据

- 关联类型：
	 - [RawNode](#rawnode)