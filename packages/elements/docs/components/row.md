# Row


Row使用

## Slots


<div class="slots">

| 名称    | 参数 | 描述 |
| :------ | :--- | :--- |
| default |      |      |

</div>



## Props


<div class="props">

| 名称    | 描述                                              |             类型            | 可选值                                                                         |
| :------ | :------------------------------------------------ | :-------------------------: | :----------------------------------------------------------------------------- |
| id      | 组件id，若不设置会自动生成                        |            String           |                                                                                |
| display | 显示隐藏<hr>默认值:<br><pre>true</pre>            |           Boolean           |                                                                                |
| gutter  | 槽的尺寸<hr>默认值:<br><pre>5</pre>               | Number,Number,String,String |                                                                                |
| justify | 水平方向的对齐方式<hr>默认值:<br><pre>start</pre> |            String           | `start` , `end` , `center` , `space-between` , `space-around` , `space-evenly` |
| align   | 垂直方向对齐方式<hr>默认值:<br><pre>stretch</pre> |            String           | `start` , `end` , `center` , `stretch`                                         |

</div>



## Methods

### setDisplay(flag: boolean)
- 用法： 设置隐藏
- 参数：
	 - flag： true:显示，false:隐藏

### domRefresh()
- 用法： 刷新组件