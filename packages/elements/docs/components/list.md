# List


List使用

## Slots


<div class="slots">

| 名称    | 参数                                                    | 描述         |
| :------ | :------------------------------------------------------ | :----------- |
| content | `item` { any } ：当前数据项<br/>`no` { any } ：当前序号 | 内容插槽     |
| extra   | `item` { any } ：当前数据项<br/>`no` { any } ：当前序号 | 扩展内容插槽 |

</div>



## Props


<div class="props">

| 名称            | 描述                                                                                                                                                                       |                           类型                          | 可选值                                                                                                                  |
| :-------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :-----------------------------------------------------: | :---------------------------------------------------------------------------------------------------------------------- |
| id              | 组件id，若不设置会自动生成                                                                                                                                                 |                          String                         |                                                                                                                         |
| display         | 显示隐藏<hr>默认值:<br><pre>true</pre>                                                                                                                                     |                         Boolean                         |                                                                                                                         |
| rendered        | 组件渲染完后的回调                                                                                                                                                         | (args:[RenderedReturn](#linkrenderedreturn)) =&gt; void |                                                                                                                         |
| source          | 数据源<hr>默认值:<br><pre>default () {<br>  return [];<br>}</pre>                                                                                                          |        Array&lt;object&gt; \| Array&lt;string&gt;       |                                                                                                                         |
| size            | 尺寸<hr>默认值:<br><pre>md</pre>                                                                                                                                           |                    [Size](#linksize)                    | `2xs` , `xs` , `sm` , `md` , `lg` , `xl` , `2xl` , `1x` , `2x` , `3x` , `4x` , `5x` , `6x` , `7x` , `8x` , `9x` , `10x` |
| item-style      | 列表项样式                                                                                                                                                                 |                 string \| CSSProperties                 |                                                                                                                         |
| actions         | 操作集合                                                                                                                                                                   |        Array&lt;[ListAction](#linklistaction)&gt;       |                                                                                                                         |
| layout          | 整体排列方向<hr>默认值:<br><pre>v</pre>                                                                                                                                    |              [ListLayout](#linklistlayout)              | `v` , `v-reverse` , `h` , `h-reverse`                                                                                   |
| content-layout  | 内容区域排列方向<hr>默认值:<br><pre>default (props: any) {<br>  if (startsWith(props.layout, 'v')) {<br>    return 'v';<br>  } else {<br>    return 'h';<br>  }<br>}</pre> |              [ListLayout](#linklistlayout)              | `v` , `v-reverse` , `h` , `h-reverse`                                                                                   |
| extra-align     | 垂直于内容排列方向上的对齐方式<hr>默认值:<br><pre>center</pre>                                                                                                             |                   [Align](#linkalign)                   | `start` , `center` , `end`                                                                                              |
| actions-align   | 垂直于整体排列方向上的对齐方式<hr>默认值:<br><pre>center</pre>                                                                                                             |                   [Align](#linkalign)                   | `start` , `center` , `end`                                                                                              |
| actions-gap     | actions 间距<hr>默认值:<br><pre>10</pre>                                                                                                                                   |                          Number                         |                                                                                                                         |
| action-style    | actions样式                                                                                                                                                                |                 string \| CSSProperties                 |                                                                                                                         |
| actions-reverse | 反转actions图标文本                                                                                                                                                        |                         Boolean                         |                                                                                                                         |
| hover-color     | hover时背景色                                                                                                                                                              |         string \| [StateColor](#linkstatecolor)         | `default` , `primary` , `success` , `warn` , `error`                                                                    |

</div>



## Events


<div class="events">

| 名称   | 参数                                   | 描述         |
| :----- | :------------------------------------- | :----------- |
| select | `arg0` { ListEventArgs&lt;any&gt; } ： | 选项点击事件 |

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

### Size {#linksize}

- Size = 	 [TshirtSize](#linktshirtsize) \| [NumberSize](#linknumbersize) \| number \| (string &amp; { fromT?: any })

### ListAction {#linklistaction}

- 描述： 操作配置
- 选项：
	 - [`icon`] { IconDefinition \| IconPack \| IconName \| [StringOther](#linkstringother) } : 图标
	 - [`text`] { string } : 描述
	 - [`size`] { [TshirtSize](#linktshirtsize) \| [NumberSize](#linknumbersize) \| number \| (string &amp; { fromT?: any }) } : 尺寸
	 - [`opperator`] { (args:Array&lt;any&gt;) =&gt; any } : 操作

### ListLayout {#linklistlayout}

- ListLayout = 	 `v` \| `v-reverse` \| `h` \| `h-reverse`

### Align {#linkalign}

- 描述： 对齐方式<br/>`start` : 开始位置<br/>`center` : 中间位置<br/>`end` : 结束位置
- Align = 	 `start` \| `center` \| `end`

### StateColor {#linkstatecolor}

- StateColor = 	 `default` \| `primary` \| `success` \| `warn` \| `error`

### ListEventArgs {#linklisteventargs}

- 选项：

### TshirtSize {#linktshirtsize}

- TshirtSize = 	 `2xs` \| `xs` \| `sm` \| `md` \| `lg` \| `xl` \| `2xl`

### NumberSize {#linknumbersize}

- NumberSize = 	 `1x` \| `2x` \| `3x` \| `4x` \| `5x` \| `6x` \| `7x` \| `8x` \| `9x` \| `10x`

### StringOther {#linkstringother}

- StringOther = 	 string \& 