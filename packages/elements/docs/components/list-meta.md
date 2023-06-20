# ListMeta


ListMeta使用

## Props


<div class="props">

| 名称        | 描述                                   |                        类型                       | 可选值                                                                                                                  |
| :---------- | :------------------------------------- | :-----------------------------------------------: | :---------------------------------------------------------------------------------------------------------------------- |
| id          | 组件id，若不设置会自动生成             |                       String                      |                                                                                                                         |
| display     | 显示隐藏<hr>默认值:<br><pre>true</pre> |                      Boolean                      |                                                                                                                         |
| title       |                                        |       string \| [ListTitle](#linklisttitle)       |                                                                                                                         |
| avatar-icon |                                        | [IconNameOrDefinition](#linkiconnameordefinition) |                                                                                                                         |
| avatar-src  |                                        |                       String                      |                                                                                                                         |
| summary     |                                        |        string \| [ListText](#linklisttext)        |                                                                                                                         |
| description |                                        |        string \| [ListText](#linklisttext)        |                                                                                                                         |
| size        | <hr>默认值:<br><pre>md</pre>           |                 [Size](#linksize)                 | `2xs` , `xs` , `sm` , `md` , `lg` , `xl` , `2xl` , `1x` , `2x` , `3x` , `4x` , `5x` , `6x` , `7x` , `8x` , `9x` , `10x` |

</div>



## Methods

### setDisplay(flag: boolean)
- 用法： 设置隐藏
- 参数：
	 - flag： true:显示，false:隐藏

### domRefresh()
- 用法： 刷新组件

## 关联类型



### ListTitle {#linklisttitle}

- 选项：
	 - `text` { string } : 
	 - `level` { `1` \| `2` \| `3` \| `4` } : 
	 - `ellipsis` { [SingleLineEllipsis](#linksinglelineellipsis) } : 

### IconNameOrDefinition {#linkiconnameordefinition}

- IconNameOrDefinition = 	 IconDefinition \| IconPack \| IconName

### ListText {#linklisttext}

- 选项：
	 - `text` { string } : 
	 - `indent` { number } : 
	 - `ellipsis` { [MultiLineEllipsis](#linkmultilineellipsis) } : 

### Size {#linksize}

- Size = 	 [TshirtSize](#linktshirtsize) \| [NumberSize](#linknumbersize)

### SingleLineEllipsis {#linksinglelineellipsis}

- 描述： 单行文本溢出配置
- 选项：
	 - `length` { number } : 
	 - `suffix` { string } : 

### MultiLineEllipsis {#linkmultilineellipsis}

- 描述： 多行文本溢出配置
- 选项：
	 - `rows` { number } : 
	 - `suffix` { string } : 
	 - `expandText` { string } : 
	 - `collapseText` { string } : 

### TshirtSize {#linktshirtsize}

- TshirtSize = 	 `2xs` \| `xs` \| `sm` \| `md` \| `lg` \| `xl` \| `2xl`

### NumberSize {#linknumbersize}

- NumberSize = 	 `1x` \| `2x` \| `3x` \| `4x` \| `5x` \| `6x` \| `7x` \| `8x` \| `9x` \| `10x`