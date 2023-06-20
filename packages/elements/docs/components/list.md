# List


List使用

## Slots


<div class="slots">

| 名称  | 参数 | 描述 |
| :---- | :--- | :--- |
| item  |      |      |
| extra |      |      |

</div>



## Props


<div class="props">

| 名称             | 描述                                                              |                     类型                    | 可选值                                                                                                                  |
| :--------------- | :---------------------------------------------------------------- | :-----------------------------------------: | :---------------------------------------------------------------------------------------------------------------------- |
| id               | 组件id，若不设置会自动生成                                        |                    String                   |                                                                                                                         |
| display          | 显示隐藏<hr>默认值:<br><pre>true</pre>                            |                   Boolean                   |                                                                                                                         |
| source           | 数据源<hr>默认值:<br><pre>default () {<br>  return [];<br>}</pre> | [Array](#linkarray)&lt;object \| string&gt; |                                                                                                                         |
| size             | <hr>默认值:<br><pre>md</pre>                                      |              [Size](#linksize)              | `2xs` , `xs` , `sm` , `md` , `lg` , `xl` , `2xl` , `1x` , `2x` , `3x` , `4x` , `5x` , `6x` , `7x` , `8x` , `9x` , `10x` |
| item-style       |                                                                   |           string \| CSSProperties           |                                                                                                                         |
| actions          | 操作                                                              |       [ListAction](#linklistaction)[]       |                                                                                                                         |
| actions-position | <hr>默认值:<br><pre>bottom</pre>                                  |          [Position](#linkposition)          | `top` , `bottom` , `left` , `right`                                                                                     |
| actions-align    | <hr>默认值:<br><pre>center</pre>                                  |             [Align](#linkalign)             | `start` , `center` , `end`                                                                                              |
| actions-gap      | <hr>默认值:<br><pre>5</pre>                                       |                    Number                   |                                                                                                                         |
| action-style     |                                                                   |           string \| CSSProperties           |                                                                                                                         |
| actions-reverse  |                                                                   |                   Boolean                   |                                                                                                                         |
| extra-style      |                                                                   |           string \| CSSProperties           |                                                                                                                         |
| extra-position   | <hr>默认值:<br><pre>right</pre>                                   |          [Position](#linkposition)          | `top` , `bottom` , `left` , `right`                                                                                     |
| extra-align      | <hr>默认值:<br><pre>center</pre>                                  |             [Align](#linkalign)             | `start` , `center` , `end`                                                                                              |
| hover-color      |                                                                   |                    String                   |                                                                                                                         |

</div>



## Events


<div class="events">

| 名称       | 参数                                 | 描述         |
| :--------- | :----------------------------------- | :----------- |
| item-click | `arg0` { ListItemEventArg } ：谁是谁 | 选项点击事件 |

</div>



## Methods

### setDisplay(flag: boolean)
- 用法： 设置隐藏
- 参数：
	 - flag： true:显示，false:隐藏

### domRefresh()
- 用法： 刷新组件



## 关联类型



### Array {#linkarray}


### Size {#linksize}

- Size = 	 [TshirtSize](#linktshirtsize) \| [NumberSize](#linknumbersize)

### ListAction {#linklistaction}

- 选项：
	 - `icon` { IconDefinition \| IconPack \| IconName } : 
	 - `text` { string } : 
	 - `size` { [TshirtSize](#linktshirtsize) \| [NumberSize](#linknumbersize) } : 
	 - `opperator` { (...args: any[]) =&gt; any } : 

### Position {#linkposition}

- Position = 	 `top` \| `bottom` \| `left` \| `right`

### Align {#linkalign}

- Align = 	 `start` \| `center` \| `end`

### TshirtSize {#linktshirtsize}

- TshirtSize = 	 `2xs` \| `xs` \| `sm` \| `md` \| `lg` \| `xl` \| `2xl`

### NumberSize {#linknumbersize}

- NumberSize = 	 `1x` \| `2x` \| `3x` \| `4x` \| `5x` \| `6x` \| `7x` \| `8x` \| `9x` \| `10x`