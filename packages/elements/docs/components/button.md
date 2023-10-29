# Button


Button使用

## Slots


<div class="slots">

| 名称    | 参数 | 描述 |
| :------ | :--- | :--- |
| default |      |      |

</div>



## Props


<div class="props">

| 名称          | 描述                                                                                                                                                                                                                                                                                                                                                                                                                                         |                                                    类型                                                    | 可选值                                                                                                                  |
| :------------ | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :--------------------------------------------------------------------------------------------------------: | :---------------------------------------------------------------------------------------------------------------------- |
| id            | 组件id，若不设置会自动生成                                                                                                                                                                                                                                                                                                                                                                                                                   |                                                   String                                                   |                                                                                                                         |
| display       | 显示隐藏<hr>默认值:<br><pre>true</pre>                                                                                                                                                                                                                                                                                                                                                                                                       |                                                   Boolean                                                  |                                                                                                                         |
| rendered      | 组件渲染完后的回调                                                                                                                                                                                                                                                                                                                                                                                                                           |                           (args:[RenderedReturn](#linkrenderedreturn)) =&gt; void                          |                                                                                                                         |
| icon          | 图标名称<br/><br/>例如：<br/>&lt;i class=&quot;fa-solid fa-address-book&quot;&gt;&lt;/i&gt;<br/>描述的是 `fas` 风格的 `address-book`。<br/><br/>组件配置如下：<br/>`prefix`=&quot;fas&quot;<br/>`icon`=&quot;address-book&quot;<br/>或<br/>不设置 `prefix`<br/>设置`icon` 为 `IconDefinition`类型<br/><br/>`import { faCamera } from &#39;@fortawesome/pro-solid-svg-icons&#39;;`<br/><br/>[查询图标](https://fontawesome.com/search?m=free) |                              [IconNameOrDefinition](#linkiconnameordefinition)                             |                                                                                                                         |
| text          |                                                                                                                                                                                                                                                                                                                                                                                                                                              |                                                   string                                                   |                                                                                                                         |
| size          | 图标尺寸<hr>默认值:<br><pre>md</pre>                                                                                                                                                                                                                                                                                                                                                                                                         |                                              [Size](#linksize)                                             | `2xs` , `xs` , `sm` , `md` , `lg` , `xl` , `2xl` , `1x` , `2x` , `3x` , `4x` , `5x` , `6x` , `7x` , `8x` , `9x` , `10x` |
| icon-position | 图标位置<hr>默认值:<br><pre>left</pre>                                                                                                                                                                                                                                                                                                                                                                                                       |                                                right \| left                                               | `right` , `left`                                                                                                        |
| color         | 颜色<hr>默认值:<br><pre>default</pre>                                                                                                                                                                                                                                                                                                                                                                                                        | [StateColor](#linkstatecolor) \| [StateColorGroup](#linkstatecolorgroup) \| (string &amp; { fromT?: any }) | `default` , `primary` , `success` , `warn` , `error`                                                                    |
| shape         | 形状可选<hr>默认值:<br><pre>rectangle</pre>                                                                                                                                                                                                                                                                                                                                                                                                  |                                       [ButtonShape](#linkbuttonshape)                                      | `rectangle` , `circle` , `square` , `ellipse`                                                                           |
| disabled      | 是否禁用按钮<hr>默认值:<br><pre>false</pre>                                                                                                                                                                                                                                                                                                                                                                                                  |                                                   Boolean                                                  |                                                                                                                         |
| mode          | 模式<hr>默认值:<br><pre>default</pre>                                                                                                                                                                                                                                                                                                                                                                                                        |                                        [ButtonMode](#linkbuttonmode)                                       | `default` , `half` , `empty` , `link` , `dashed`                                                                        |
| loading       | 加载状态<hr>默认值:<br><pre>false</pre>                                                                                                                                                                                                                                                                                                                                                                                                      |                                                   Boolean                                                  |                                                                                                                         |
| shadow        | 是否使用阴影<hr>默认值:<br><pre>true</pre>                                                                                                                                                                                                                                                                                                                                                                                                   |                                                   boolean                                                  |                                                                                                                         |

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

### IconNameOrDefinition {#linkiconnameordefinition}

- IconNameOrDefinition = 	 IconDefinition \| IconPack \| IconName \| [StringOther](#linkstringother)

### Size {#linksize}

- Size = 	 [TshirtSize](#linktshirtsize) \| [NumberSize](#linknumbersize) \| number \| (string &amp; { fromT?: any })

### StateColor {#linkstatecolor}

- StateColor = 	 `default` \| `primary` \| `success` \| `warn` \| `error`

### StateColorGroup {#linkstatecolorgroup}

- 选项：
	 - `primary` { Color } : 主色
	 - `darker` { Color } : 以主色为基础，深一点
	 - `lighter` { Color } : 以主色为基础，淡一点
	 - `translucent` { Color } : 以主色为基础，半透明
	 - `text` { Color } : 对应的文本颜色

### ButtonShape {#linkbuttonshape}

- ButtonShape = 	 `rectangle` \| `circle` \| `square` \| `ellipse` \| [StringOther](#linkstringother)

### ButtonMode {#linkbuttonmode}

- ButtonMode = 	 `default` \| `half` \| `empty` \| `link` \| `dashed` \| [StringOther](#linkstringother)

### StringOther {#linkstringother}

- StringOther = 	 string \& 

### TshirtSize {#linktshirtsize}

- TshirtSize = 	 `2xs` \| `xs` \| `sm` \| `md` \| `lg` \| `xl` \| `2xl`

### NumberSize {#linknumbersize}

- NumberSize = 	 `1x` \| `2x` \| `3x` \| `4x` \| `5x` \| `6x` \| `7x` \| `8x` \| `9x` \| `10x`