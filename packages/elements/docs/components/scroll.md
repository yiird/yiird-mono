# Scroll


Scroll使用

## Slots


<div class="slots">

| 名称    | 参数 | 描述 |
| :------ | :--- | :--- |
| default |      |      |

</div>



## Props


<div class="props">

| 名称          | 描述                                   |                                   类型                                  | 可选值 |
| :------------ | :------------------------------------- | :---------------------------------------------------------------------: | :----- |
| id            | 组件id，若不设置会自动生成             |                                  String                                 |        |
| display       | 显示隐藏<hr>默认值:<br><pre>true</pre> |                                 Boolean                                 |        |
| rendered      | 组件渲染完后的回调                     |         (args:[RenderedReturn](#linkrenderedreturn)) =&gt; void         |        |
| width         | <hr>默认值:<br><pre>100 %</pre>        |                             number \| string                            |        |
| height        | <hr>默认值:<br><pre>100 %</pre>        |                             number \| string                            |        |
| hide-track    |                                        |    [ScrollHideTrackPluginOptions](#linkscrollhidetrackpluginoptions)    |        |
| disable-track |                                        | [ScrollDisableTrackPluginOptions](#linkscrolldisabletrackpluginoptions) |        |
| track-aux     |                                        |     [ScrollTrackAuxPluginOptions](#linkscrolltrackauxpluginoptions)     |        |

</div>



## Events


<div class="events">

| 名称     | 参数                                                                  | 描述           |
| :------- | :-------------------------------------------------------------------- | :------------- |
| overflow | `arg0` { [ScrollOverflowState](#linkscrolloverflowstate) } ：溢出状态 | 滚动条溢出事件 |

</div>



## Methods

### setDisplay(flag: boolean)
- 用法： 设置隐藏
- 参数：
	 - flag： true:显示，false:隐藏

### domRefresh()
- 用法： 刷新组件

### scrollIntoView(el: HTMLElement,options:? Partial&lt;ScrollIntoViewOptions&gt;)
- 用法： 目标元素滚动到视野内
- 参数：
	 - el： 目标元素
	 - options： 滚动配置

### isVisible(el: HTMLElement)
- 用法： 判断元素是否在可视区域内
- 参数：
	 - el： 目标元素

### getSize()
- 用法： 获取尺寸

### update()
- 用法： 

### setPosition()
- 用法： 

## 关联类型



### RenderedReturn {#linkrenderedreturn}

- 选项：

### ScrollHideTrackPluginOptions {#linkscrollhidetrackpluginoptions}

- 选项：

### ScrollDisableTrackPluginOptions {#linkscrolldisabletrackpluginoptions}

- 描述： 禁用滚动条
- 选项：
	 - [`x`] { boolean } : 是否禁用x轴
	 - [`y`] { boolean } : 是否禁用y轴

### ScrollTrackAuxPluginOptions {#linkscrolltrackauxpluginoptions}

- 选项：

### ScrollOverflowState {#linkscrolloverflowstate}

- 选项：

### Partial {#linkpartial}
