# Textarea


Textarea 使用

## Props


<div class="props">

| 名称         | 描述                                        |              类型             | 可选值                                                                                                                  |
| :----------- | :------------------------------------------ | :---------------------------: | :---------------------------------------------------------------------------------------------------------------------- |
| id           | 组件id，若不设置会自动生成                  |             String            |                                                                                                                         |
| display      | 显示隐藏<hr>默认值:<br><pre>true</pre>      |            Boolean            |                                                                                                                         |
| name         | &lt;input&gt;的名称                         |             string            |                                                                                                                         |
| placeholder  | 占位信息                                    |             string            |                                                                                                                         |
| v-model      |                                             |        string \| number       |                                                                                                                         |
| max-length   | 最大长度                                    |             number            |                                                                                                                         |
| show-counter | 是否显示计数<hr>默认值:<br><pre>false</pre> |            Boolean            |                                                                                                                         |
| disabled     | 是否禁用<hr>默认值:<br><pre>false</pre>     |            Boolean            |                                                                                                                         |
| readonly     | 是否禁用<hr>默认值:<br><pre>false</pre>     |            Boolean            |                                                                                                                         |
| status       | 数据状态<hr>默认值:<br><pre>default</pre>   | [DataStatus](#linkdatastatus) | `default` , `success` , `error` , `warn`                                                                                |
| size         | 尺寸<hr>默认值:<br><pre>md</pre>            |       [Size](#linksize)       | `2xs` , `xs` , `sm` , `md` , `lg` , `xl` , `2xl` , `1x` , `2x` , `3x` , `4x` , `5x` , `6x` , `7x` , `8x` , `9x` , `10x` |
| shadow       | 是否使用阴影<hr>默认值:<br><pre>true</pre>  |            boolean            |                                                                                                                         |
| loading      | 是否使用阴影<hr>默认值:<br><pre>false</pre> |            boolean            |                                                                                                                         |
| row-span     | 跨越行数<hr>默认值:<br><pre>2</pre>         |             number            |                                                                                                                         |
| row-gap      | 行间距                                      |             number            |                                                                                                                         |

</div>



## Events


<div class="events">

| 名称   | 参数                                          | 描述       |
| :----- | :-------------------------------------------- | :--------- |
| input  | `arg0` { [EventArgs](#linkeventargs) } ：参数 | Input事件  |
| change | `arg0` { [EventArgs](#linkeventargs) } ：     | Change事件 |
| focus  | `arg0` { [EventArgs](#linkeventargs) } ：     | 焦点事件   |
| blur   | `arg0` { [EventArgs](#linkeventargs) } ：     | 失去事件   |

</div>



## Methods

### setDisplay(flag: boolean)
- 用法： 设置隐藏
- 参数：
	 - flag： true:显示，false:隐藏

### domRefresh()
- 用法： 刷新组件









## 关联类型



### DataStatus {#linkdatastatus}

- DataStatus = 	 `default` \| `success` \| `error` \| `warn`

### Size {#linksize}

- Size = 	 [TshirtSize](#linktshirtsize) \| [NumberSize](#linknumbersize)

### EventArgs {#linkeventargs}

- 选项：
	 - `ev` { Event } : 事件对象
	 - `input` { any } : 输入数据

### TshirtSize {#linktshirtsize}

- TshirtSize = 	 `2xs` \| `xs` \| `sm` \| `md` \| `lg` \| `xl` \| `2xl`

### NumberSize {#linknumbersize}

- NumberSize = 	 `1x` \| `2x` \| `3x` \| `4x` \| `5x` \| `6x` \| `7x` \| `8x` \| `9x` \| `10x`