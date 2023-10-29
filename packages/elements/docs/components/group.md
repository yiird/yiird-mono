# Group


Group使用

## Props


<div class="props">

| 名称      | 描述                                                               |                           类型                          | 可选值                                                                                                                  |
| :-------- | :----------------------------------------------------------------- | :-----------------------------------------------------: | :---------------------------------------------------------------------------------------------------------------------- |
| id        | 组件id，若不设置会自动生成                                         |                          String                         |                                                                                                                         |
| display   | 显示隐藏<hr>默认值:<br><pre>true</pre>                             |                         Boolean                         |                                                                                                                         |
| rendered  | 组件渲染完后的回调                                                 | (args:[RenderedReturn](#linkrenderedreturn)) =&gt; void |                                                                                                                         |
| direction | <hr>默认值:<br><pre>h</pre>                                        |               [Direction](#linkdirection)               | `h` , `v`                                                                                                               |
| divider   | 是否有分割线<hr>默认值:<br><pre>false</pre>                        |                         boolean                         |                                                                                                                         |
| gap       | <hr>默认值:<br><pre>0</pre>                                        |                    [Size](#linksize)                    | `2xs` , `xs` , `sm` , `md` , `lg` , `xl` , `2xl` , `1x` , `2x` , `3x` , `4x` , `5x` , `6x` , `7x` , `8x` , `9x` , `10x` |
| after     | 在其他组件后面<br/>只对 button 生效<hr>默认值:<br><pre>false</pre> |                         boolean                         |                                                                                                                         |
| before    | 在其他组件前面<br/>只对 button 生效<hr>默认值:<br><pre>false</pre> |                         boolean                         |                                                                                                                         |
| compact   | 紧凑<hr>默认值:<br><pre>false</pre>                                |                    boolean \| number                    |                                                                                                                         |

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

### Direction {#linkdirection}

- 描述： 方向<br/>`v` : 垂直方向<br/>`h` : 水平方向
- Direction = 	 `h` \| `v` \| [StringOther](#linkstringother)

### Size {#linksize}

- Size = 	 [TshirtSize](#linktshirtsize) \| [NumberSize](#linknumbersize) \| number \| (string &amp; { fromT?: any })

### StringOther {#linkstringother}

- StringOther = 	 string \& 

### TshirtSize {#linktshirtsize}

- TshirtSize = 	 `2xs` \| `xs` \| `sm` \| `md` \| `lg` \| `xl` \| `2xl`

### NumberSize {#linknumbersize}

- NumberSize = 	 `1x` \| `2x` \| `3x` \| `4x` \| `5x` \| `6x` \| `7x` \| `8x` \| `9x` \| `10x`