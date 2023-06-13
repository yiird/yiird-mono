# List


List使用

## Props


<div class="props">

| 名称    | 描述                                   |            类型            | 可选值                                                                                                                  |
| :------ | :------------------------------------- | :------------------------: | :---------------------------------------------------------------------------------------------------------------------- |
| id      | 组件id，若不设置会自动生成             |           String           |                                                                                                                         |
| display | 显示隐藏<hr>默认值:<br><pre>true</pre> |           Boolean          |                                                                                                                         |
| layout  | 列表项<hr>默认值:<br><pre>h</pre>      | &#39;h&#39; \| &#39;v&#39; | `h` , `v`                                                                                                               |
| size    | 尺寸<hr>默认值:<br><pre>md</pre>       |      [Size](#linksize)     | `2xs` , `xs` , `sm` , `md` , `lg` , `xl` , `2xl` , `1x` , `2x` , `3x` , `4x` , `5x` , `6x` , `7x` , `8x` , `9x` , `10x` |
| gap     | <hr>默认值:<br><pre>5</pre>            |           Number           |                                                                                                                         |

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



### Size {#linksize}

- Size = 	 [TshirtSize](#linktshirtsize) \| [NumberSize](#linknumbersize)

### TshirtSize {#linktshirtsize}

- TshirtSize = 	 `2xs` \| `xs` \| `sm` \| `md` \| `lg` \| `xl` \| `2xl`

### NumberSize {#linknumbersize}

- NumberSize = 	 `1x` \| `2x` \| `3x` \| `4x` \| `5x` \| `6x` \| `7x` \| `8x` \| `9x` \| `10x`