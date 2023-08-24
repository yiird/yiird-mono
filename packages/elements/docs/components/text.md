# Text


Text使用

## Slots


<div class="slots">

| 名称    | 参数 | 描述 |
| :------ | :--- | :--- |
| default |      |      |

</div>



## Props


<div class="props">

| 名称       | 描述                                     |   类型  | 可选值 |
| :--------- | :--------------------------------------- | :-----: | :----- |
| id         | 组件id，若不设置会自动生成               |  String |        |
| display    | 显示隐藏<hr>默认值:<br><pre>true</pre>   | Boolean |        |
| strong     | 加粗                                     | Boolean |        |
| delete     | 删除线                                   | Boolean |        |
| underline  | 下滑线                                   | Boolean |        |
| italic     | 斜体                                     | Boolean |        |
| mark       | 标记                                     |         |        |
| secondary  | 是否是次要文本                           | Boolean |        |
| selectable | 是否可选择<hr>默认值:<br><pre>true</pre> | Boolean |        |
| code       |                                          | Boolean |        |

</div>



## Methods

### setDisplay(flag: boolean)
- 用法： 设置隐藏
- 参数：
	 - flag： true:显示，false:隐藏

### domRefresh()
- 用法： 刷新组件