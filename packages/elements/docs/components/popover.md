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

| 名称                | 描述                                                                                                                                                                                                                                              |                      类型                     | 可选值                                                                                                                                                  |
| :------------------ | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | :-------------------------------------------: | :------------------------------------------------------------------------------------------------------------------------------------------------------ |
| id                  | 组件id，若不设置会自动生成                                                                                                                                                                                                                        |                     String                    |                                                                                                                                                         |
| display             | 显示隐藏<hr>默认值:<br><pre>false</pre>                                                                                                                                                                                                           |                    boolean                    |                                                                                                                                                         |
| reference           | 挂载元素或挂载元素的ID                                                                                                                                                                                                                            |           string \| ReferenceElement          |                                                                                                                                                         |
| boundary            | 边界<hr>默认值:<br><pre>clippingAncestors</pre>                                                                                                                                                                                                   |                    Boundary                   |                                                                                                                                                         |
| color               | 颜色<hr>默认值:<br><pre>default</pre>                                                                                                                                                                                                             |    [StateColor](#linkstatecolor) \| string    | `default` , `primary` , `success` , `warn` , `error`                                                                                                    |
| text                | 内容                                                                                                                                                                                                                                              |                     string                    |                                                                                                                                                         |
| text-color          | 文本颜色<hr>默认值:<br><pre>#ffffff</pre>                                                                                                                                                                                                         |    [StateColor](#linkstatecolor) \| string    | `default` , `primary` , `success` , `warn` , `error`                                                                                                    |
| mode                | 默认为`fill`填充模式，`border`:边框模式<hr>默认值:<br><pre>fill</pre>                                                                                                                                                                             |       [PoppoverMode](#linkpoppovermode)       | `border` , `fill` , `empty`                                                                                                                             |
| default-placement   | 默认位置,相对于`reference`<hr>默认值:<br><pre>bottom</pre>                                                                                                                                                                                        |          [Placement](#linkplacement)          | `left` , `right` , `top` , `bottom` , `top-start` , `top-end` , `bottom-start` , `bottom-end` , `left-start` , `left-end` , `right-start` , `right-end` |
| allow-placement     | 允许出现的位置,相对于`reference`<hr>默认值:<br><pre>default (rawProps: any) {<br>  return getAllowPlacement(rawProps.defaultPlacement);<br>}</pre>                                                                                                |         [Placement](#linkplacement)[]         |                                                                                                                                                         |
| arrow-size          | 箭头尺寸<hr>默认值:<br><pre>8 px</pre>                                                                                                                                                                                                            |                string \| number               |                                                                                                                                                         |
| offset              | 距离挂载元素的偏移<hr>默认值:<br><pre>5</pre>                                                                                                                                                                                                     |                     number                    |                                                                                                                                                         |
| max-width           | 最大宽度，默认自适应                                                                                                                                                                                                                              |                string \| number               |                                                                                                                                                         |
| hide-mode           | 显示隐藏模式<br/>`click` 点击挂载元素显示，点击其他非其他区域隐藏<br/>`hover` 鼠标进入挂载元素显示，移出隐藏<br/>`click-out` 点击挂载元素显示，点其他区域隐藏<br/>`click-leave` 点击挂载元素显示，移到其他区域隐藏<hr>默认值:<br><pre>click</pre> |   [PoppoverHideMode](#linkpoppoverhidemode)   | `click` , `hover` , `click-out` , `click-leave`                                                                                                         |
| hide-think-over-pop | 隐藏时是否考虑pop区域，如果为true时，隐藏的时候会考虑是否在pop区域内，如果不在pop区域才会隐藏<hr>默认值:<br><pre>true</pre>                                                                                                                       |                    boolean                    |                                                                                                                                                         |
| shadow-level        | 阴影级别<hr>默认值:<br><pre>low</pre>                                                                                                                                                                                                             |     [BoxShadowLevel](#linkboxshadowlevel)     | `high` , `middle` , `low`                                                                                                                               |
| shadow-direction    | 阴影方向<hr>默认值:<br><pre>down</pre>                                                                                                                                                                                                            | [BoxShadowDirection](#linkboxshadowdirection) | `up` , `down` , `left` , `right`                                                                                                                        |

</div>



## Methods

### setDisplay(flag: boolean)
- 用法： 设置隐藏
- 参数：
	 - flag： true:显示，false:隐藏

### domRefresh()
- 用法： 刷新组件

## 关联类型



### StateColor {#linkstatecolor}

- StateColor = 	 `default` \| `primary` \| `success` \| `warn` \| `error`

### PoppoverMode {#linkpoppovermode}

- PoppoverMode = 	 `border` \| `fill` \| `empty`

### Placement {#linkplacement}

- Placement = 	 `left` \| `right` \| `top` \| `bottom` \| `top-start` \| `top-end` \| `bottom-start` \| `bottom-end` \| `left-start` \| `left-end` \| `right-start` \| `right-end`

### Array {#linkarray}


### PoppoverHideMode {#linkpoppoverhidemode}

- PoppoverHideMode = 	 `click` \| `hover` \| `click-out` \| `click-leave`

### BoxShadowLevel {#linkboxshadowlevel}

- BoxShadowLevel = 	 `high` \| `middle` \| `low`

### BoxShadowDirection {#linkboxshadowdirection}

- BoxShadowDirection = 	 `up` \| `down` \| `left` \| `right`