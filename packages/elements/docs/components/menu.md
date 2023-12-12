# Menu


Menu使用

## Props


<div class="props">

| 名称     | 描述                                                                                                                      |                           类型                          | 可选值 |
| :------- | :------------------------------------------------------------------------------------------------------------------------ | :-----------------------------------------------------: | :----- |
| id       | 组件id，若不设置会自动生成                                                                                                |                          String                         |        |
| display  | 显示隐藏<hr>默认值:<br><pre>true</pre>                                                                                    |                         Boolean                         |        |
| rendered | 组件渲染完后的回调                                                                                                        | (args:[RenderedReturn](#linkrenderedreturn)) =&gt; void |        |
| theme    |                                                                                                                           |         OpperatorTheme&lt;unknown&gt; \| unknown        |        |
| source   | 数据，此数据为标准树形结构数据或者能构成标准树形结构的扁平数据<hr>默认值:<br><pre>default () {<br>  return [];<br>}</pre> |                   Array&lt;object&gt;                   |        |
| mode     |                                                                                                                           |                                                         |        |

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
