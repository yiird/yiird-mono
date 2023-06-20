# Title


Title使用

## Slots


<div class="slots">

| 名称    | 参数 | 描述 |
| :------ | :--- | :--- |
| default |      |      |

</div>



## Props


<div class="props">

| 名称      | 描述                                   |                      类型                     | 可选值                                                                                                                  |
| :-------- | :------------------------------------- | :-------------------------------------------: | :---------------------------------------------------------------------------------------------------------------------- |
| id        | 组件id，若不设置会自动生成             |                     String                    |                                                                                                                         |
| display   | 显示隐藏<hr>默认值:<br><pre>true</pre> |                    Boolean                    |                                                                                                                         |
| strong    | 加粗                                   |                    Boolean                    |                                                                                                                         |
| delete    | 删除线                                 |                    Boolean                    |                                                                                                                         |
| underline | 下滑线                                 |                    Boolean                    |                                                                                                                         |
| italic    | 斜体                                   |                    Boolean                    |                                                                                                                         |
| mark      | 标记                                   |                                               |                                                                                                                         |
| secondary | 是否是次要文本                         |                    Boolean                    |                                                                                                                         |
| selected  |                                        |                    Boolean                    |                                                                                                                         |
| level     | <hr>默认值:<br><pre>1</pre>            |         [TitleLevel](#linktitlelevel)         | `1` , `2` , `3` , `4`                                                                                                   |
| align     | <hr>默认值:<br><pre>start</pre>        |              [Align](#linkalign)              | `start` , `center` , `end`                                                                                              |
| ellipsis  | 文本溢出配置                           | [SingleLineEllipsis](#linksinglelineellipsis) |                                                                                                                         |
| size      |                                        |               [Size](#linksize)               | `2xs` , `xs` , `sm` , `md` , `lg` , `xl` , `2xl` , `1x` , `2x` , `3x` , `4x` , `5x` , `6x` , `7x` , `8x` , `9x` , `10x` |

</div>



## Methods

### setDisplay(flag: boolean)
- 用法： 设置隐藏
- 参数：
	 - flag： true:显示，false:隐藏

### domRefresh()
- 用法： 刷新组件

## 关联类型



### TitleLevel {#linktitlelevel}

- TitleLevel = 	 `1` \| `2` \| `3` \| `4`

### Align {#linkalign}

- Align = 	 `start` \| `center` \| `end`

### SingleLineEllipsis {#linksinglelineellipsis}

- 描述： 单行文本溢出配置
- 选项：
	 - `length` { number } : 
	 - `suffix` { string } : 

### Size {#linksize}

- Size = 	 [TshirtSize](#linktshirtsize) \| [NumberSize](#linknumbersize)

### TshirtSize {#linktshirtsize}

- TshirtSize = 	 `2xs` \| `xs` \| `sm` \| `md` \| `lg` \| `xl` \| `2xl`

### NumberSize {#linknumbersize}

- NumberSize = 	 `1x` \| `2x` \| `3x` \| `4x` \| `5x` \| `6x` \| `7x` \| `8x` \| `9x` \| `10x`