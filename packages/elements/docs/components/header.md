# Header


Header使用

## Slots


<div class="slots">

| 名称    | 参数 | 描述 |
| :------ | :--- | :--- |
| default |      |      |

</div>



## Props


<div class="props">

| 名称     | 描述                                   |                           类型                          | 可选值 |
| :------- | :------------------------------------- | :-----------------------------------------------------: | :----- |
| id       | 组件id，若不设置会自动生成             |                          String                         |        |
| display  | 显示隐藏<hr>默认值:<br><pre>true</pre> |                         Boolean                         |        |
| rendered | 组件渲染完后的回调                     | (args:[RenderedReturn](#linkrenderedreturn)) =&gt; void |        |
| size     | <hr>默认值:<br><pre>10</pre>           |                     string \| number                    |        |

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