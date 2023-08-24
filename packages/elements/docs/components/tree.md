# Tree


Tree使用

## Slots


<div class="slots">

| 名称      | 参数                                 | 描述                                                                                                 |
| :-------- | :----------------------------------- | :--------------------------------------------------------------------------------------------------- |
| structure | `node` { TreeNode } ：注入到节点数据 | 自定义显示结构，如果设置此`slot`，用于配置自定义显示结构（除了辅助线、展开状态图标、选择状态图标外） |

</div>



## Props


<div class="props">

| 名称                  | 描述                                                                                                                                                                                                                    |                       类型                      | 可选值                                                                                                                  |
| :-------------------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :---------------------------------------------: | :---------------------------------------------------------------------------------------------------------------------- |
| id                    | 组件id，若不设置会自动生成                                                                                                                                                                                              |                      String                     |                                                                                                                         |
| display               | 显示隐藏<hr>默认值:<br><pre>true</pre>                                                                                                                                                                                  |                     Boolean                     |                                                                                                                         |
| source                | 数据，此数据为标准树形结构数据或者能构成标准树形结构的扁平数据<hr>默认值:<br><pre>default () {<br>  return [];<br>}</pre>                                                                                               |               Array&lt;object&gt;               |                                                                                                                         |
| key-config            | 标识(字段)配置<br/><br/>告知组件主键、父主键、显示文本、子节点分别对应数据中的字段<hr>默认值:<br><pre>{<br>  key: 'key',<br>  pkey: 'parentKey',<br>  ckey: 'children',<br>  ikey: 'icon',<br>  tkey: 'text'<br>}</pre> |       [TreeKeyConfig](#linktreekeyconfig)       |                                                                                                                         |
| size                  | 尺寸<hr>默认值:<br><pre>md</pre>                                                                                                                                                                                        |                [Size](#linksize)                | `2xs` , `xs` , `sm` , `md` , `lg` , `xl` , `2xl` , `1x` , `2x` , `3x` , `4x` , `5x` , `6x` , `7x` , `8x` , `9x` , `10x` |
| item-style            |                                                                                                                                                                                                                         |             string \| CSSProperties             |                                                                                                                         |
| cascade               | 是否级联选中父级、子集<hr>默认值:<br><pre>true</pre>                                                                                                                                                                    |                     boolean                     |                                                                                                                         |
| draggable             | 是否可以被拖拽<hr>默认值:<br><pre>false</pre>                                                                                                                                                                           |                     boolean                     |                                                                                                                         |
| hide-icon             | 是否显示图标<hr>默认值:<br><pre>false</pre>                                                                                                                                                                             |                     Boolean                     |                                                                                                                         |
| hide-select-icon      | <hr>默认值:<br><pre>false</pre>                                                                                                                                                                                         |                     Boolean                     |                                                                                                                         |
| hide-switch-icon      | <hr>默认值:<br><pre>false</pre>                                                                                                                                                                                         |                     Boolean                     |                                                                                                                         |
| hide-line             | 是否显示辅助线<hr>默认值:<br><pre>false</pre>                                                                                                                                                                           |                     Boolean                     |                                                                                                                         |
| icons                 | <hr>默认值:<br><pre>default () {<br>  return {<br>    folder: faFolder,<br>    leaf: faLeaf<br>  };<br>}</pre>                                                                                                          |       [TreeNodeIcons](#linktreenodeicons)       |                                                                                                                         |
| select-icons          | <hr>默认值:<br><pre>default () {<br>  return {<br>    checked: faSquareCheck,<br>    halfChecked: faSquareMinus,<br>    notChecked: faSquare<br>  };<br>}</pre>                                                         | [TreeNodeSelectIcons](#linktreenodeselecticons) |                                                                                                                         |
| switch-icons          | <hr>默认值:<br><pre>default () {<br>  return {<br>    open: faAngleDown,<br>    close: faAngleRight<br>  };<br>}</pre>                                                                                                  | [TreeNodeSwitchIcons](#linktreenodeswitchicons) |                                                                                                                         |
| multi                 | <hr>默认值:<br><pre>false</pre>                                                                                                                                                                                         |                     Boolean                     |                                                                                                                         |
| default-selected-keys | 默认选中<hr>默认值:<br><pre>default () {<br>  return [];<br>}</pre>                                                                                                                                                     |          Array&lt;string \| number&gt;          |                                                                                                                         |
| default-expand-keys   | 默认展开<hr>默认值:<br><pre>default () {<br>  return [];<br>}</pre>                                                                                                                                                     |          Array&lt;string \| number&gt;          |                                                                                                                         |
| default-expand-level  | 展开配置,默认展开到第几级                                                                                                                                                                                               |                      number                     |                                                                                                                         |
| trigger-count         | 触发虚拟渲染的数量，当需要渲染的总节点数超过此值时，进行虚拟化渲染。<hr>默认值:<br><pre>500</pre>                                                                                                                       |                      number                     |                                                                                                                         |
| screen-size           | 每屏显示数量<hr>默认值:<br><pre>30</pre>                                                                                                                                                                                |                      number                     |                                                                                                                         |

</div>



## Events


<div class="events">

| 名称          | 参数                                              | 描述         |
| :------------ | :------------------------------------------------ | :----------- |
| select        | `arg0` { [TreeEventArgs](#linktreeeventargs) } ： | 选中事件     |
| multi-select  | `arg0` { [TreeEventArgs](#linktreeeventargs) } ： | 多选事件     |
| rendered      | `arg0` { [TreeEventArgs](#linktreeeventargs) } ： | 渲染完成事件 |
| before-render |                                                   | 渲染之前     |

</div>



## Methods

### setDisplay(flag: boolean)
- 用法： 设置隐藏
- 参数：
	 - flag： true:显示，false:隐藏

### domRefresh()
- 用法： 刷新组件



### doClickExpandIcon_(ev: Event,node: [InternalTreeNode](#linkinternaltreenode))
- 用法： 撤销,目前只支持拖拽撤销
- 参数：
	 - ev： undefined
	 - node： undefined











### toggleExpand(node: [InternalTreeNode](#linkinternaltreenode) \| [TreeNodeKey](#linktreenodekey))
- 用法： 展开/收起
- 参数：
	 - node： 目标节点对象或者Key

### filter(query: string)
- 用法： 过滤显示节点
- 参数：
	 - query： 模糊匹配内容

### selectRange(startKey: [TreeNodeKey](#linktreenodekey),endKey: [TreeNodeKey](#linktreenodekey),flag: boolean)
- 用法： 给定开始标识和结束标识(选中/取消)选中节点
- 参数：
	 - startKey： 开始标识
	 - endKey： 结束标识
	 - flag： true 选中，false 取消选中

### select(node: [InternalTreeNode](#linkinternaltreenode) \| Array&lt;[InternalTreeNode](#linkinternaltreenode)&gt;,flag: boolean)
- 用法： 给定节点标识，(选中/取消)选中节点
- 参数：
	 - node： 节点标识
	 - flag： true 选中，false 取消选中

### move(moveKey: [TreeNodeKey](#linktreenodekey),targetKey: [TreeNodeKey](#linktreenodekey))
- 用法： 将节点挂载到目标节点子节点中
- 参数：
	 - moveKey： 被移动的节点
	 - targetKey： 目标节点

### moveAfter(moveKey: [TreeNodeKey](#linktreenodekey),targetKey: [TreeNodeKey](#linktreenodekey))
- 用法： 将节点挂载到目标节点的下方
- 参数：
	 - moveKey： 被移动的节点
	 - targetKey： 目标节点

### revoke()
- 用法： 目前支持节点移动撤销

### getNodeByKey()
- 用法： 

## 关联类型



### TreeKeyConfig {#linktreekeyconfig}

- 选项：
	 - `key` { string } : 主键标识
	 - `pkey` { string } : 父级标识
	 - `ckey` { string } : 子节点标识(如果是扁平数据，则不需要配置ckey)
	 - `ikey` { string } : 图标标识，如果数据中没有图标属性，则使用props中配置的图标
	 - `tkey` { string } : 文本内容标识

### Size {#linksize}

- Size = 	 [TshirtSize](#linktshirtsize) \| [NumberSize](#linknumbersize) \| number \| (string &amp; { fromT?: any })

### TreeNodeIcons {#linktreenodeicons}

- TreeNodeIcons = 	 [TreeNodeFinalIcons](#linktreenodefinalicons) \| (node:[InternalTreeNode](#linkinternaltreenode)) =&gt; [TreeNodeFinalIcons](#linktreenodefinalicons)

### TreeNodeSelectIcons {#linktreenodeselecticons}

- 选项：
	 - [`checked`] { IconDefinition \| IconPack \| IconName } : 选中状态图标
	 - [`notChecked`] { IconDefinition \| IconPack \| IconName } : 为选中状态图标
	 - [`halfChecked`] { IconDefinition \| IconPack \| IconName } : 半选中状态图标

### TreeNodeSwitchIcons {#linktreenodeswitchicons}

- 选项：
	 - [`open`] { IconDefinition \| IconPack \| IconName } : 展开状态的图标
	 - [`close`] { IconDefinition \| IconPack \| IconName } : 关闭状态的图标

### TreeEventArgs {#linktreeeventargs}

- 选项：
	 - [`target`] { [InternalTreeNode](#linkinternaltreenode) \| Array&lt;[InternalTreeNode](#linkinternaltreenode)&gt; } : 操作目标
	 - `checked` { Array&lt;[InternalTreeNode](#linkinternaltreenode)&gt; } : 选中的所有节点
	 - `checkedKeys` { Array&lt;[TreeNodeKey](#linktreenodekey)&gt; } : 选中所有节点的key
	 - `shouldRenderCount` { number } : 目前需要渲染的总数

### InternalTreeNode {#linkinternaltreenode}

- 选项：
	 - `key` { number \| string } : 标识
	 - `parentKey` { number \| string } : 父级标识
	 - `text` { string } : 显示文本
	 - [`parent`] { [InternalTreeNode](#linkinternaltreenode) } : 父级节点
	 - [`selectIcon`] { IconDefinition \| IconPack \| IconName } : 选择状态图标
	 - [`switchIcon`] { IconDefinition \| IconPack \| IconName } : 选择状态图标
	 - [`icon`] { IconDefinition \| IconPack \| IconName } : 图标
	 - `isFolder` { boolean } : 是否是folder节点
	 - `path` { Array&lt;[TreeNodeKey](#linktreenodekey)&gt; } : 路径标识
	 - `pathNodes` { Array&lt;[InternalTreeNode](#linkinternaltreenode)&gt; } : 路径节点
	 - `level` { number } : 级别
	 - `index` { number } : 在整个扁平数据中的序号
	 - `brotherIndex` { number } : 在兄弟中的排行
	 - `brotherCount` { number } : 兄弟节点数量
	 - `hasOnlyChild` { boolean } : 是否只有一个子节点
	 - [`isOpen`] { boolean } : 是否打开状态
	 - `isShow` { boolean } : 是否显示
	 - `isHalfCheck` { boolean } : 是否半选中
	 - `isChecked` { boolean } : 是否选中
	 - `isFocus` { boolean } : 是否是焦点
	 - `isLastInBrother` { boolean } : 是否是兄弟中的最后一个节点
	 - `original` { any } : 源节点数据

### TreeNodeKey {#linktreenodekey}

- TreeNodeKey = 	 number \| string

### TshirtSize {#linktshirtsize}

- TshirtSize = 	 `2xs` \| `xs` \| `sm` \| `md` \| `lg` \| `xl` \| `2xl`

### NumberSize {#linknumbersize}

- NumberSize = 	 `1x` \| `2x` \| `3x` \| `4x` \| `5x` \| `6x` \| `7x` \| `8x` \| `9x` \| `10x`

### TreeNodeFinalIcons {#linktreenodefinalicons}

- 描述： 节点图标类型<br/>1、根据节点类型和选中状态来配置不同图标，使用 `TreeNodeTypeIcons`<br/>2、根据节点类型配置，使用 `TreeNodeTypeIcons`<br/>3、根据节点状态配置，使用 `TreeNodeStateIcons`<br/>4、不管节点类型和状态，使用 `IconNameOrDefinition`
- TreeNodeFinalIcons = 	 [TreeNodeStateIcons](#linktreenodestateicons) \| [TreeNodeTypeIcons](#linktreenodetypeicons) \| [IconNameOrDefinition](#linkiconnameordefinition)

### TreeNodeIconFunction {#linktreenodeiconfunction}

- 描述： 根据不同的节点数据返回不同的图标配置
- 方法型：	 (node:[InternalTreeNode](#linkinternaltreenode)) =&gt; [TreeNodeFinalIcons](#linktreenodefinalicons)

### TreeNodeStateIcons {#linktreenodestateicons}

- 描述： 根据状态确认图标类型
- 选项：
	 - [`default`] { IconDefinition \| IconPack \| IconName } : 正常状态
	 - [`selected`] { IconDefinition \| IconPack \| IconName } : 选中状态

### TreeNodeTypeIcons {#linktreenodetypeicons}

- 描述： 通过节点类型（folder｜leaf）确定图标类型，每种节点类型可配置不同状态显示不同图标，如果直接使用`IconNameOrDefinition`赋给`folder`或`leaf`择不管选中还是未选中只显示一种图标
- 选项：
	 - [`folder`] { [IconNameOrDefinition](#linkiconnameordefinition) \| [TreeNodeStateIcons](#linktreenodestateicons) } : 组节点
	 - [`leaf`] { [IconNameOrDefinition](#linkiconnameordefinition) \| [TreeNodeStateIcons](#linktreenodestateicons) } : 叶子结点

### IconNameOrDefinition {#linkiconnameordefinition}

- IconNameOrDefinition = 	 IconDefinition \| IconPack \| IconName