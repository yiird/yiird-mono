# Space


Space使用

## Slots


<div class="slots">

| 名称    | 参数 | 描述 |
| :------ | :--- | :--- |
| default |      |      |

</div>



## Props


<div class="props">

| 名称       | 描述                                                  |                           类型                          | 可选值                                                                                                                  |
| :--------- | :---------------------------------------------------- | :-----------------------------------------------------: | :---------------------------------------------------------------------------------------------------------------------- |
| id         | 组件id，若不设置会自动生成                            |                          String                         |                                                                                                                         |
| display    | 显示隐藏<hr>默认值:<br><pre>true</pre>                |                         Boolean                         |                                                                                                                         |
| rendered   | 组件渲染完后的回调                                    | (args:[RenderedReturn](#linkrenderedreturn)) =&gt; void |                                                                                                                         |
| gap        | <hr>默认值:<br><pre>md</pre>                          |                    [Size](#linksize)                    | `2xs` , `xs` , `sm` , `md` , `lg` , `xl` , `2xl` , `1x` , `2x` , `3x` , `4x` , `5x` , `6x` , `7x` , `8x` , `9x` , `10x` |
| direction  | 排列方向<hr>默认值:<br><pre>h</pre>                   |               [Direction](#linkdirection)               | `h` , `v`                                                                                                               |
| main-axis  | 主轴方向上的排列方式<hr>默认值:<br><pre>start</pre>   |               [FlexAlgin](#linkflexalgin)               | `start` , `center` , `end` , `space-between` , `space-around`                                                           |
| cross-axis | 交叉轴方向上的排列方式<hr>默认值:<br><pre>start</pre> |               [FlexAlgin](#linkflexalgin)               | `start` , `center` , `end` , `space-between` , `space-around`                                                           |

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

### Direction {#linkdirection}

- 描述： 方向<br/>`v` : 垂直方向<br/>`h` : 水平方向
- Direction = 	 `h` \| `v` \| [StringOther](#linkstringother)

### FlexAlgin {#linkflexalgin}

- 描述： flex对齐方式
- FlexAlgin = 	 [Align](#linkalign) \| `space-between` \| `space-around`

### TshirtSize {#linktshirtsize}

- TshirtSize = 	 `2xs` \| `xs` \| `sm` \| `md` \| `lg` \| `xl` \| `2xl`

### NumberSize {#linknumbersize}

- NumberSize = 	 `1x` \| `2x` \| `3x` \| `4x` \| `5x` \| `6x` \| `7x` \| `8x` \| `9x` \| `10x`

### StringOther {#linkstringother}

- StringOther = 	 string \& 

### Align {#linkalign}

- 描述： 对齐方式<br/>`start` : 开始位置<br/>`center` : 中间位置<br/>`end` : 结束位置
- Align = 	 `start` \| `center` \| `end`