# ListMeta


ListMeta使用

## Props


<div class="props">

| 名称        | 描述                                                               |                           类型                          | 可选值                                                                                                                  |
| :---------- | :----------------------------------------------------------------- | :-----------------------------------------------------: | :---------------------------------------------------------------------------------------------------------------------- |
| id          | 组件id，若不设置会自动生成                                         |                          String                         |                                                                                                                         |
| display     | 显示隐藏<hr>默认值:<br><pre>true</pre>                             |                         Boolean                         |                                                                                                                         |
| rendered    | 组件渲染完后的回调                                                 | (args:[RenderedReturn](#linkrenderedreturn)) =&gt; void |                                                                                                                         |
| title       | 标题                                                               |          string \| [ListTitle](#linklisttitle)          |                                                                                                                         |
| avatar-icon | 图标头像                                                           |    [IconNameOrDefinition](#linkiconnameordefinition)    |                                                                                                                         |
| avatar-src  | 头像访问链接                                                       |                          String                         |                                                                                                                         |
| avatar-size | 头像尺寸<hr>默认值:<br><pre>md</pre>                               |                    [Size](#linksize)                    | `2xs` , `xs` , `sm` , `md` , `lg` , `xl` , `2xl` , `1x` , `2x` , `3x` , `4x` , `5x` , `6x` , `7x` , `8x` , `9x` , `10x` |
| summary     | 摘要配置                                                           |           string \| [ListText](#linklisttext)           |                                                                                                                         |
| description | 描述配置                                                           |           string \| [ListText](#linklisttext)           |                                                                                                                         |
| size        | 主要内容文本尺寸（除了标题外其他文本）<hr>默认值:<br><pre>md</pre> |                    [Size](#linksize)                    | `2xs` , `xs` , `sm` , `md` , `lg` , `xl` , `2xl` , `1x` , `2x` , `3x` , `4x` , `5x` , `6x` , `7x` , `8x` , `9x` , `10x` |

</div>



## Methods

### setDisplay(flag: boolean)
- 用法： 设置隐藏
- 参数：
	 - flag： true:显示，false:隐藏

### domRefresh()
- 用法： 刷新组件

## 关联类型



### RenderedReturn {#linkrenderedreturn}

- 选项：

### ListTitle {#linklisttitle}

- 描述： 标题配置
- 选项：
	 - `text` { string } : 文本内容
	 - [`level`] { `1` \| `2` \| `3` \| `4` } : 级别
	 - [`ellipsis`] { [SingleLineEllipsis](#linksinglelineellipsis) } : 省略配置

### IconNameOrDefinition {#linkiconnameordefinition}

- IconNameOrDefinition = 	 IconDefinition \| IconPack \| IconName \| [StringOther](#linkstringother)

### Size {#linksize}

- Size = 	 [TshirtSize](#linktshirtsize) \| [NumberSize](#linknumbersize) \| number \| (string &amp; { fromT?: any })

### ListText {#linklisttext}

- 描述： 文本内容配置
- 选项：
	 - `text` { string } : 文本内容
	 - `indent` { number } : 缩进
	 - [`ellipsis`] { [MultiLineEllipsis](#linkmultilineellipsis) } : 省略配置

### SingleLineEllipsis {#linksinglelineellipsis}

- 描述： 单行文本溢出配置
- 选项：

### StringOther {#linkstringother}

- StringOther = 	 string \& 

### TshirtSize {#linktshirtsize}

- TshirtSize = 	 `2xs` \| `xs` \| `sm` \| `md` \| `lg` \| `xl` \| `2xl`

### NumberSize {#linknumbersize}

- NumberSize = 	 `1x` \| `2x` \| `3x` \| `4x` \| `5x` \| `6x` \| `7x` \| `8x` \| `9x` \| `10x`

### MultiLineEllipsis {#linkmultilineellipsis}

- 描述： 多行文本溢出配置
- 选项：