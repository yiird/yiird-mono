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

| 名称                 | 描述                                                                                                                                                                                                                                                                                                                                                                                                                          |                                   类型                                  | 可选值                      |
| :------------------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :---------------------------------------------------------------------: | :-------------------------- |
| id                   | 组件id，若不设置会自动生成                                                                                                                                                                                                                                                                                                                                                                                                    |                                  String                                 |                             |
| display              | 显示隐藏<hr>默认值:<br><pre>true</pre>                                                                                                                                                                                                                                                                                                                                                                                        |                                 Boolean                                 |                             |
| rendered             | 组件渲染完后的回调                                                                                                                                                                                                                                                                                                                                                                                                            |         (args:[RenderedReturn](#linkrenderedreturn)) =&gt; void         |                             |
| height               | 总高度，不设置则为unset<hr>默认值:<br><pre>unset</pre>                                                                                                                                                                                                                                                                                                                                                                        |                             number \| string                            |                             |
| max-height           | 最大高度，内容高度小于此高度，则高度自适应                                                                                                                                                                                                                                                                                                                                                                                    |                             number \| string                            |                             |
| width                | 总宽度，不设置则为100%<hr>默认值:<br><pre>100 %</pre>                                                                                                                                                                                                                                                                                                                                                                         |                             number \| string                            |                             |
| padding              | <hr>默认值:<br><pre>5 px</pre>                                                                                                                                                                                                                                                                                                                                                                                                |                             number \| string                            |                             |
| header-height        | 头部高度，在有标题或者工具时才生效<hr>默认值:<br><pre>50 px</pre>                                                                                                                                                                                                                                                                                                                                                             |                             number \| string                            |                             |
| footer-height        | 底部高度，有footer插槽有内容才生效<hr>默认值:<br><pre>50 px</pre>                                                                                                                                                                                                                                                                                                                                                             |                             number \| string                            |                             |
| title                | 抬头                                                                                                                                                                                                                                                                                                                                                                                                                          |                                  string                                 |                             |
| operators            | 操作                                                                                                                                                                                                                                                                                                                                                                                                                          |             Array&lt;[PanelOperator](#linkpaneloperator)&gt;            |                             |
| border               | 是否有边框<hr>默认值:<br><pre>true</pre>                                                                                                                                                                                                                                                                                                                                                                                      |                                 boolean                                 |                             |
| continuous-scrolling | 设置为 true 以允许外部滚动条在当前滚动条到达边缘时继续滚动。<hr>默认值:<br><pre>false</pre>                                                                                                                                                                                                                                                                                                                                   |                                 boolean                                 |                             |
| damping              | 动量减少阻尼系数，一个介于 (0, 1) 之间的浮点值。 值越低，滚动越平滑（绘制帧也越多）。<hr>默认值:<br><pre>0.1</pre>                                                                                                                                                                                                                                                                                                            |                                  number                                 |                             |
| always-show-tracks   | 保持滚动条始终可见<hr>默认值:<br><pre>true</pre>                                                                                                                                                                                                                                                                                                                                                                              |                                 boolean                                 |                             |
| remove-track         | 删掉滚动条<hr>默认值:<br><pre>none</pre>                                                                                                                                                                                                                                                                                                                                                                                      |                          none \| x \| y \| both                         | `none` , `x` , `y` , `both` |
| disabled-track       | 禁用滚动条<hr>默认值:<br><pre>default () {<br>  return {<br>    x: false,<br>    y: false<br>  };<br>}</pre>                                                                                                                                                                                                                                                                                                                  | [ScrollDisableTrackPluginOptions](#linkscrolldisabletrackpluginoptions) |                             |
| overscroll           | 过屏效果<hr>默认值:<br><pre>default () {<br>  return {<br>    //滚动效果，iOS 风格效果为“弹跳”-`bounce`，Android 风格效果为“发光”-`glow`。<br>    effect: 'bounce',<br>    //动量减少阻尼系数，一个介于 (0, 1) 之间的浮点值。 值越低，滚动越平滑（绘制帧也越多）。<br>    damping: 0.2,<br>    //最大允许的滚动距离。<br>    maxOverscroll: 150,<br>    //用于`glow`效果的颜色<br>    glowColor: '#87ceeb'<br>  };<br>}</pre> |                            OverscrollOptions                            |                             |
| scrollbar-lifecycle  | 滚动生命周期                                                                                                                                                                                                                                                                                                                                                                                                                  |   [ScrollLifecirclePluginOptions](#linkscrolllifecirclepluginoptions)   |                             |

</div>



## Methods

### setDisplay(flag: boolean)
- 用法： 设置隐藏
- 参数：
	 - flag： true:显示，false:隐藏

### domRefresh()
- 用法： 刷新组件

### scrollIntoView(targetEl: HTMLElement,options:? [PlacementOptions](#linkplacementoptions))
- 用法： 将目标dom节点移动到可视区域
- 参数：
	 - targetEl： 目标元素
	 - options： 位置配置

## 关联类型



### RenderedReturn {#linkrenderedreturn}

- 选项：

### PanelOperator {#linkpaneloperator}

- 描述： 操作对象
- 选项：
	 - [`text`] { string } : 操作表述，如果没有图标，默认使用文本表现，如果有图标则为操作的提示信息
	 - [`icon`] { IconDefinition \| IconPack \| IconName \| [StringOther](#linkstringother) } : 图标
	 - `action` { () =&gt; void } : 操作动作

### ScrollDisableTrackPluginOptions {#linkscrolldisabletrackpluginoptions}

- 描述： 禁用滚动条
- 选项：
	 - [`x`] { boolean } : 是否禁用x轴
	 - [`y`] { boolean } : 是否禁用y轴

### ScrollLifecirclePluginOptions {#linkscrolllifecirclepluginoptions}

- 描述： 滚动条声明周期
- 选项：
	 - [`onInit`] { (scrollbar:Scrollbar) =&gt; void } : 初始化
	 - [`onDestroy`] { (scrollbar:Scrollbar) =&gt; void } : 销毁
	 - [`onUpdate`] { (scrollbar:Scrollbar) =&gt; void } : 更新
	 - [`onRender`] { (_remainMomentum:Data2d , scrollbar:Scrollbar) =&gt; void } : 渲染

### PlacementOptions {#linkplacementoptions}

- 选项：
	 - [`placeX`] { `right` \| `left` \| `center` } : 横向位置
	 - [`placeY`] { `top` \| `bottom` \| `center` } : 纵向位置
	 - [`offsetX`] { number } : 横向偏移，优先于`placeX`
	 - [`offsetY`] { number } : 纵向偏移，优先于`placeY`

### StringOther {#linkstringother}

- StringOther = 	 string \& 