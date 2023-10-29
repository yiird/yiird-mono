# Popover


Popover使用

## Slots


<div class="slots">

| 名称    | 参数                            | 描述     |
| :------ | :------------------------------ | :------- |
| default | `isOpen` { Boolean } ：打开状态 | 气泡内容 |

</div>



## Props


<div class="props">

| 名称                | 描述                                                                                                                                                                                                                                               |                           类型                          | 可选值                                                                                                                                                  |
| :------------------ | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :-----------------------------------------------------: | :------------------------------------------------------------------------------------------------------------------------------------------------------ |
| id                  | 组件id，若不设置会自动生成                                                                                                                                                                                                                         |                          String                         |                                                                                                                                                         |
| rendered            | 组件渲染完后的回调                                                                                                                                                                                                                                 | (args:[RenderedReturn](#linkrenderedreturn)) =&gt; void |                                                                                                                                                         |
| display             | 显示隐藏<hr>默认值:<br><pre>false</pre>                                                                                                                                                                                                            |                         boolean                         |                                                                                                                                                         |
| reference           | 挂载元素或挂载元素的ID                                                                                                                                                                                                                             |        [PopoverReference](#linkpopoverreference)        |                                                                                                                                                         |
| boundary            | 边界<hr>默认值:<br><pre>clippingAncestors</pre>                                                                                                                                                                                                    |                         Boundary                        |                                                                                                                                                         |
| padding             | <hr>默认值:<br><pre>0</pre>                                                                                                                                                                                                                        |                          Number                         |                                                                                                                                                         |
| color               | 颜色<hr>默认值:<br><pre>default</pre>                                                                                                                                                                                                              |         [StateColor](#linkstatecolor) \| string         | `default` , `primary` , `success` , `warn` , `error`                                                                                                    |
| text                | 内容                                                                                                                                                                                                                                               |                          string                         |                                                                                                                                                         |
| text-color          | 文本颜色<hr>默认值:<br><pre>#ffffff</pre>                                                                                                                                                                                                          |         [StateColor](#linkstatecolor) \| string         | `default` , `primary` , `success` , `warn` , `error`                                                                                                    |
| placement           | <hr>默认值:<br><pre>default () {<br>  return 'bottom';<br>}</pre>                                                                                                                                                                                  |               [Placement](#linkplacement)               | `left` , `right` , `top` , `bottom` , `top-start` , `top-end` , `bottom-start` , `bottom-end` , `left-start` , `left-end` , `right-start` , `right-end` |
| allow-placement     | 允许出现的位置,相对于`reference`<hr>默认值:<br><pre>default () {<br>  return [];<br>}</pre>                                                                                                                                                        |         Array&lt;[Placement](#linkplacement)&gt;        |                                                                                                                                                         |
| arrow-size          | 箭头尺寸<hr>默认值:<br><pre>8 px</pre>                                                                                                                                                                                                             |                     string \| number                    |                                                                                                                                                         |
| arrow               | 显示隐藏箭头<hr>默认值:<br><pre>true</pre>                                                                                                                                                                                                         |                         boolean                         |                                                                                                                                                         |
| offset              | 距离挂载元素的偏移<hr>默认值:<br><pre>5</pre>                                                                                                                                                                                                      |                  [Offset](#linkoffset)                  |                                                                                                                                                         |
| width               |                                                                                                                                                                                                                                                    |              [Dimensions](#linkdimensions)              |                                                                                                                                                         |
| height              |                                                                                                                                                                                                                                                    |              [Dimensions](#linkdimensions)              |                                                                                                                                                         |
| mode                | 显示隐藏模式<br/>`click` 点击挂载元素显示，点击其他非其他区域隐藏<br/>`hover` 鼠标进入挂载元素显示，移出隐藏<br/>`click-out` 点击挂载元素显示，点其他区域隐藏<br/>`click-leave` 点击挂载元素显示，移到其他区域隐藏<hr>默认值:<br><pre>manual</pre> |            [PoppoverMode](#linkpoppovermode)            | `manual` , `click` , `hover` , `click-out` , `click-leave`                                                                                              |
| hide-think-over-pop | 隐藏时是否考虑pop区域，如果为true时，隐藏的时候会考虑是否在pop区域内，如果不在pop区域才会隐藏<hr>默认值:<br><pre>false</pre>                                                                                                                       |                         boolean                         |                                                                                                                                                         |
| shadow-level        | 阴影级别<hr>默认值:<br><pre>low</pre>                                                                                                                                                                                                              |          [BoxShadowLevel](#linkboxshadowlevel)          | `high` , `middle` , `low`                                                                                                                               |
| shadow-direction    | 阴影方向<hr>默认值:<br><pre>down</pre>                                                                                                                                                                                                             |      [BoxShadowDirection](#linkboxshadowdirection)      | `up` , `down` , `left` , `right`                                                                                                                        |

</div>



## Events


<div class="events">

| 名称 | 参数                                                    | 描述     |
| :--- | :------------------------------------------------------ | :------- |
| open | `arg0` { [PopoverEventArgs](#linkpopovereventargs) } ： | 
打开事件 |

</div>



## Methods

### setDisplay(flag: boolean)
- 用法： 设置隐藏
- 参数：
	 - flag： true:显示，false:隐藏

### domRefresh()
- 用法： 刷新组件

### toggle()
- 用法： 

### open()
- 用法： 

### close()
- 用法： 

## 关联类型



### RenderedReturn {#linkrenderedreturn}

- 选项：

### PopoverReference {#linkpopoverreference}

- 描述： Popover
- PopoverReference = 	 Element \| [CommonExposed](#linkcommonexposed)

### StateColor {#linkstatecolor}

- StateColor = 	 `default` \| `primary` \| `success` \| `warn` \| `error`

### Placement {#linkplacement}

- Placement = 	 `left` \| `right` \| `top` \| `bottom` \| `top-start` \| `top-end` \| `bottom-start` \| `bottom-end` \| `left-start` \| `left-end` \| `right-start` \| `right-end` \| [StringOther](#linkstringother)

### Offset {#linkoffset}

- Offset = 	  \| number

### Dimensions {#linkdimensions}

- Dimensions = 	 [NoramlDimensions](#linknoramldimensions) \| [LimitDimensions](#linklimitdimensions)

### PoppoverMode {#linkpoppovermode}

- PoppoverMode = 	 `manual` \| `click` \| `hover` \| `click-out` \| `click-leave` \| [StringOther](#linkstringother)

### BoxShadowLevel {#linkboxshadowlevel}

- BoxShadowLevel = 	 `high` \| `middle` \| `low`

### BoxShadowDirection {#linkboxshadowdirection}

- BoxShadowDirection = 	 `up` \| `down` \| `left` \| `right`

### PopoverEventArgs {#linkpopovereventargs}

- 选项：

### CommonExposed {#linkcommonexposed}

- 选项：
	 - `uid__` { number } : Vue生成的组件ID
	 - `id__` { string } : 组件ID，也是渲染到页面上的元素ID
	 - `cType__` { string } : 平台特有的类型属性，也是组件名称
	 - `PLATFORM_OPTIONS__` { [PlatformOptions](#linkplatformoptions) } : 平台配置
	 - `refresh__` { Ref&lt;boolean&gt; } : 重新渲染控制
	 - `scopeId__` { Ref&lt;string&gt; } : 当前控件scopeId;
	 - `el` { Ref&lt;HTMLElement&gt; } : 当前控件根元素
	 - `isMounted` { Ref&lt;boolean&gt; } : 挂载状态
	 - `setDisplay` { (flag:boolean) =&gt; void } : 设置显示状态
	 - `domRefresh` { () =&gt; void } : 重新渲染

### StringOther {#linkstringother}

- StringOther = 	 string \& 

### NoramlDimensions {#linknoramldimensions}

- NoramlDimensions = 	 [StringOther](#linkstringother) \| number

### LimitDimensions {#linklimitdimensions}

- 选项：

### PlatformOptions {#linkplatformoptions}

- 选项：
	 - [`documentReady`] { () =&gt; void } : 

### Ref {#linkref}
