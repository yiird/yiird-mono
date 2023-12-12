# Paragraph


Paragraph使用

## Slots


<div class="slots">

| 名称    | 参数 | 描述 |
| :------ | :--- | :--- |
| default |      |      |

</div>



## Props


<div class="props">

| 名称       | 描述                                     |                           类型                          | 可选值                                                                                                                  |
| :--------- | :--------------------------------------- | :-----------------------------------------------------: | :---------------------------------------------------------------------------------------------------------------------- |
| id         | 组件id，若不设置会自动生成               |                          String                         |                                                                                                                         |
| display    | 显示隐藏<hr>默认值:<br><pre>true</pre>   |                         Boolean                         |                                                                                                                         |
| rendered   | 组件渲染完后的回调                       | (args:[RenderedReturn](#linkrenderedreturn)) =&gt; void |                                                                                                                         |
| theme      |                                          |         OpperatorTheme&lt;unknown&gt; \| unknown        |                                                                                                                         |
| strong     | 加粗                                     |                         Boolean                         |                                                                                                                         |
| delete     | 删除线                                   |                         Boolean                         |                                                                                                                         |
| underline  | 下滑线                                   |                         Boolean                         |                                                                                                                         |
| italic     | 斜体                                     |                         Boolean                         |                                                                                                                         |
| mark       | 标记                                     |                                                         |                                                                                                                         |
| secondary  | 是否是次要文本                           |                         Boolean                         |                                                                                                                         |
| selectable | 是否可选择<hr>默认值:<br><pre>true</pre> |                         Boolean                         |                                                                                                                         |
| indent     | <hr>默认值:<br><pre>2</pre>              |                          Number                         |                                                                                                                         |
| ellipsis   | 文本溢出配置                             |       [MultiLineEllipsis](#linkmultilineellipsis)       |                                                                                                                         |
| size       | <hr>默认值:<br><pre>md</pre>             |                    [Size](#linksize)                    | `2xs` , `xs` , `sm` , `md` , `lg` , `xl` , `2xl` , `1x` , `2x` , `3x` , `4x` , `5x` , `6x` , `7x` , `8x` , `9x` , `10x` |

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

### OpperatorTheme {#linkopperatortheme}


### MultiLineEllipsis {#linkmultilineellipsis}

- 描述： 多行文本溢出配置
- 选项：

### Size {#linksize}

- Size = 	 [TshirtSize](#linktshirtsize) \| [NumberSize](#linknumbersize) \| number \| (string &amp; { fromT?: any })

### TshirtSize {#linktshirtsize}

- TshirtSize = 	 `2xs` \| `xs` \| `sm` \| `md` \| `lg` \| `xl` \| `2xl`

### NumberSize {#linknumbersize}

- NumberSize = 	 `1x` \| `2x` \| `3x` \| `4x` \| `5x` \| `6x` \| `7x` \| `8x` \| `9x` \| `10x`