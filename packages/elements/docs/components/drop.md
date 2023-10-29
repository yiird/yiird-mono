# Drop


Drop使用

## Slots


<div class="slots">

| 名称 | 参数 | 描述 |
| :--- | :--- | :--- |
| item |      |      |

</div>



## Props


<div class="props">

| 名称            | 描述                                                                           |                           类型                          | 可选值                                                                                                                  |
| :-------------- | :----------------------------------------------------------------------------- | :-----------------------------------------------------: | :---------------------------------------------------------------------------------------------------------------------- |
| id              | 组件id，若不设置会自动生成                                                     |                          String                         |                                                                                                                         |
| rendered        | 组件渲染完后的回调                                                             | (args:[RenderedReturn](#linkrenderedreturn)) =&gt; void |                                                                                                                         |
| display         | 显示隐藏<hr>默认值:<br><pre>false</pre>                                        |                         boolean                         |                                                                                                                         |
| reference       |                                                                                |        [PopoverReference](#linkpopoverreference)        |                                                                                                                         |
| source          |                                                                                |        Array&lt;[LabelValue](#linklabelvalue)&gt;       |                                                                                                                         |
| searchable      | <hr>默认值:<br><pre>true</pre>                                                 |                         Boolean                         |                                                                                                                         |
| size            | <hr>默认值:<br><pre>md</pre>                                                   |                    [Size](#linksize)                    | `2xs` , `xs` , `sm` , `md` , `lg` , `xl` , `2xl` , `1x` , `2x` , `3x` , `4x` , `5x` , `6x` , `7x` , `8x` , `9x` , `10x` |
| type            | 下拉类型<br/>`list` 列表结构<br/>`tree` 树形结构<hr>默认值:<br><pre>list</pre> |                       list \| tree                      | `list` , `tree`                                                                                                         |
| list-options    |                                                                                |                     ListPropsOptions                    |                                                                                                                         |
| tree-options    |                                                                                |                     TreePropsOptions                    |                                                                                                                         |
| allow-placement | <hr>默认值:<br><pre>default () {<br>  return ['bottom'];<br>}</pre>            |         Array&lt;[Placement](#linkplacement)&gt;        |                                                                                                                         |
| offset          | <hr>默认值:<br><pre>5</pre>                                                    |                          Number                         |                                                                                                                         |
| mode            | <hr>默认值:<br><pre>click - leave</pre>                                        |            [PoppoverMode](#linkpoppovermode)            | `manual` , `click` , `hover` , `click-out` , `click-leave`                                                              |
| min-width       |                                                                                |                     number \| string                    |                                                                                                                         |
| max-width       |                                                                                |                     number \| string                    |                                                                                                                         |
| max-height      |                                                                                |                     number \| string                    |                                                                                                                         |

</div>



## Events


<div class="events">

| 名称      | 参数 | 描述                             |
| :-------- | :--- | :------------------------------- |
| select    |      |                                  |
| click-out |      | 点击下拉组件、挂载组件以外的区域 |

</div>



## Methods

### setDisplay(flag: boolean)
- 用法： 设置隐藏
- 参数：
	 - flag： true:显示，false:隐藏

### domRefresh()
- 用法： 刷新组件



### doFilterData_()
- 用法： 

## 关联类型



### RenderedReturn {#linkrenderedreturn}

- 选项：

### PopoverReference {#linkpopoverreference}

- 描述： Popover
- PopoverReference = 	 Element \| [CommonExposed](#linkcommonexposed)

### LabelValue {#linklabelvalue}

- 选项：
	 - `label` { string } : 标签

### Size {#linksize}

- Size = 	 [TshirtSize](#linktshirtsize) \| [NumberSize](#linknumbersize) \| number \| (string &amp; { fromT?: any })

### Placement {#linkplacement}

- Placement = 	 `left` \| `right` \| `top` \| `bottom` \| `top-start` \| `top-end` \| `bottom-start` \| `bottom-end` \| `left-start` \| `left-end` \| `right-start` \| `right-end` \| [StringOther](#linkstringother)

### PoppoverMode {#linkpoppovermode}

- PoppoverMode = 	 `manual` \| `click` \| `hover` \| `click-out` \| `click-leave` \| [StringOther](#linkstringother)

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

### TshirtSize {#linktshirtsize}

- TshirtSize = 	 `2xs` \| `xs` \| `sm` \| `md` \| `lg` \| `xl` \| `2xl`

### NumberSize {#linknumbersize}

- NumberSize = 	 `1x` \| `2x` \| `3x` \| `4x` \| `5x` \| `6x` \| `7x` \| `8x` \| `9x` \| `10x`

### StringOther {#linkstringother}

- StringOther = 	 string \& 

### PlatformOptions {#linkplatformoptions}

- 选项：
	 - [`documentReady`] { () =&gt; void } : 

### Ref {#linkref}
