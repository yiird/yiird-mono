# Panel


Panel使用

## Slots


<div class="slots">

| 名称         | 参数 | 描述 |
| :----------- | :--- | :--- |
| header-right |      |      |
| default      |      |      |
| footer       |      | 底部 |

</div>



## Props


<div class="props">

| 名称                 | 描述                                                                                                                                                                                                                                                                                                                                                                                                                          |                               类型                              | 可选值                      |
| :------------------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :-------------------------------------------------------------: | :-------------------------- |
| id                   | 组件id，若不设置会自动生成                                                                                                                                                                                                                                                                                                                                                                                                    |                              String                             |                             |
| display              | 显示隐藏<hr>默认值:<br><pre>true</pre>                                                                                                                                                                                                                                                                                                                                                                                        |                             Boolean                             |                             |
| height               | 总高度，不设置则为unset<hr>默认值:<br><pre>unset</pre>                                                                                                                                                                                                                                                                                                                                                                        |                          Number,String                          |                             |
| width                | 总宽度，不设置则为100%<hr>默认值:<br><pre>100 %</pre>                                                                                                                                                                                                                                                                                                                                                                         |                          Number,String                          |                             |
| header-height        | 头部高度，在有标题或者工具时才生效<hr>默认值:<br><pre>50 px</pre>                                                                                                                                                                                                                                                                                                                                                             |                          Number,String                          |                             |
| footer-height        | 底部高度，有footer插槽有内容才生效<hr>默认值:<br><pre>50 px</pre>                                                                                                                                                                                                                                                                                                                                                             |                          Number,String                          |                             |
| title                | 抬头                                                                                                                                                                                                                                                                                                                                                                                                                          |                              String                             |                             |
| operators            | 操作                                                                                                                                                                                                                                                                                                                                                                                                                          |                [PanelOperator](#paneloperator)[]                |                             |
| border               | 是否有边框<hr>默认值:<br><pre>true</pre>                                                                                                                                                                                                                                                                                                                                                                                      |                             Boolean                             |                             |
| continuous-scrolling | 设置为 true 以允许外部滚动条在当前滚动条到达边缘时继续滚动。<hr>默认值:<br><pre>false</pre>                                                                                                                                                                                                                                                                                                                                   |                             Boolean                             |                             |
| damping              | 动量减少阻尼系数，一个介于 (0, 1) 之间的浮点值。 值越低，滚动越平滑（绘制帧也越多）。<hr>默认值:<br><pre>0.1</pre>                                                                                                                                                                                                                                                                                                            |                              Number                             |                             |
| always-show-tracks   | 保持滚动条始终可见<hr>默认值:<br><pre>true</pre>                                                                                                                                                                                                                                                                                                                                                                              |                             Boolean                             |                             |
| remove-track         | 删掉滚动条<hr>默认值:<br><pre>none</pre>                                                                                                                                                                                                                                                                                                                                                                                      |                              String                             | `none` , `x` , `y` , `both` |
| disabled-track       | 禁用滚动条<hr>默认值:<br><pre>default () {<br>  return {<br>    x: false,<br>    y: false<br>  };<br>}</pre>                                                                                                                                                                                                                                                                                                                  | [DisableScrollBarPluginOptions](#disablescrollbarpluginoptions) |                             |
| overscroll           | 过屏效果<hr>默认值:<br><pre>default () {<br>  return {<br>    //滚动效果，iOS 风格效果为“弹跳”-`bounce`，Android 风格效果为“发光”-`glow`。<br>    effect: 'bounce',<br>    //动量减少阻尼系数，一个介于 (0, 1) 之间的浮点值。 值越低，滚动越平滑（绘制帧也越多）。<br>    damping: 0.2,<br>    //最大允许的滚动距离。<br>    maxOverscroll: 150,<br>    //用于`glow`效果的颜色<br>    glowColor: '#87ceeb'<br>  };<br>}</pre> |             [OverscrollOptions](#overscrolloptions)             |                             |
| scrollbar-lifecycle  | 滚动生命周期                                                                                                                                                                                                                                                                                                                                                                                                                  |       [LifecirclePluginOptions](#lifecirclepluginoptions)       |                             |

</div>



## Methods

### setDisplay(flag: boolean)
- 用法： 设置隐藏
- 参数：
	 - flag： true:显示，false:隐藏

### domRefresh()
- 用法： 刷新组件

### intoView(targetEl: HTMLElement,options:? PlacementOptions)
- 用法： 将目标dom节点移动到可视区域
- 参数：
	 - targetEl： 目标元素
	 - options： 位置配置
- 关联类型：
	 - [PlacementOptions](#placementoptions)

## 关联类型



### PanelOperator

- 描述： 操作对象
- 选项：
	 - `text` { string } : 操作表述，如果没有图标，默认使用文本表现，如果有图标则为操作的提示信息
	 - `icon` { IconNameOrDefinition } : 图标
	 - `action` { () => void } : 操作动作

- 关联类型：
	 - [IconNameOrDefinition](#iconnameordefinition)

### DisableScrollBarPluginOptions

- 选项：
	 - `x` { boolean } : 是否禁用x轴
	 - `y` { boolean } : 是否禁用y轴

### LifecirclePluginOptions

- 选项：
	 - `onInit` { (scrollbar: Scrollbar) => void } : 初始化
	 - `onDestroy` { (scrollbar: Scrollbar) => void } : 销毁
	 - `onUpdate` { (scrollbar: Scrollbar) => void } : 更新
	 - `onRender` { (_remainMomentum: Data2d, scrollbar: Scrollbar) => void } : 渲染

### PlacementOptions

- 选项：
	 - `placeX` { 'right' | 'left' | 'center' } : 横向位置
	 - `placeY` { 'top' | 'bottom' | 'center' } : 纵向位置
	 - `offsetX` { number } : 横向偏移，优先于`placeX`
	 - `offsetY` { number } : 纵向偏移，优先于`placeY`