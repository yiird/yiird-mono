# Vscroll


Vscroll使用

## Slots


<div class="slots">

| 名称    | 参数 | 描述 |
| :------ | :--- | :--- |
| default |      |      |

</div>



## Props


<div class="props">

| 名称                                | 描述                                                                                       |       类型       | 可选值 |
| :---------------------------------- | :----------------------------------------------------------------------------------------- | :--------------: | :----- |
| id                                  | 组件id，若不设置会自动生成                                                                 |      String      |        |
| display                             | 显示隐藏<hr>默认值:<br><pre>true</pre>                                                     |      Boolean     |        |
| source<br /><span>(*)</span>        | 数据                                                                                       | Array&lt;any&gt; |        |
| row-height<br /><span>(*)</span>    | 行高                                                                                       |      Number      |        |
| prepare-screen-count                | 预先渲染的屏数<hr>默认值:<br><pre>3</pre>                                                  |      Number      |        |
| trigger-count<br /><span>(*)</span> | 虚拟滚动触发数量，小于此数量，使用正常滚动                                                 |      Number      |        |
| height                              | 高度<hr>默认值:<br><pre>100 %</pre>                                                        | number \| string |        |
| always-show-tracks                  | 保持滚动条轨道始终可见。<hr>默认值:<br><pre>false</pre>                                    |      boolean     |        |
| continuous-scrolling                | 设置为 true 时，允许外滚动条在当前滚动条到达边缘时继续滚动。<hr>默认值:<br><pre>true</pre> |      boolean     |        |

</div>



## Events


<div class="events">

| 名称           | 参数                                     | 描述                 |
| :------------- | :--------------------------------------- | :------------------- |
| virtual-change | `flag` { boolean } ：`true` 虚拟滚动状态 | 虚拟滚动状态改变事件 |
| before-render  |                                          |                      |
| rendered       |                                          |                      |

</div>



## Methods

### setDisplay(flag: boolean)
- 用法： 设置隐藏
- 参数：
	 - flag： true:显示，false:隐藏

### domRefresh()
- 用法： 刷新组件