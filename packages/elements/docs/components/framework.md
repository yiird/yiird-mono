# Framework


Framework使用

## Slots


<div class="slots">

| 名称    | 参数 | 描述 |
| :------ | :--- | :--- |
| default |      |      |

</div>



## Props


<div class="props">

| 名称    | 描述                                                                               |   类型  | 可选值 |
| :------ | :--------------------------------------------------------------------------------- | :-----: | :----- |
| id      | 组件id，若不设置会自动生成                                                         |  String |        |
| display | 显示隐藏<hr>默认值:<br><pre>true</pre>                                             | Boolean |        |
| fixed   | 固定高度，fixed=`true` 必须在父级元素设置高度后使用<hr>默认值:<br><pre>false</pre> | Boolean |        |

</div>



## Methods

### setDisplay(flag: boolean)
- 用法： 设置隐藏
- 参数：
	 - flag： true:显示，false:隐藏

### domRefresh()
- 用法： 刷新组件