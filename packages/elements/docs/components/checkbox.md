# Checkbox


Checkbox使用

## Props


<div class="props">

| 名称        | 描述                                                                                                                                                                                                                                                 |                                    类型                                   | 可选值                                                                                                                  |
| :---------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :-----------------------------------------------------------------------: | :---------------------------------------------------------------------------------------------------------------------- |
| id          | 组件id，若不设置会自动生成                                                                                                                                                                                                                           |                                   String                                  |                                                                                                                         |
| display     | 显示隐藏<hr>默认值:<br><pre>true</pre>                                                                                                                                                                                                               |                                  Boolean                                  |                                                                                                                         |
| rendered    | 组件渲染完后的回调                                                                                                                                                                                                                                   |          (args:[RenderedReturn](#linkrenderedreturn)) =&gt; void          |                                                                                                                         |
| name        | 表单项 `name`                                                                                                                                                                                                                                        |                                   string                                  |                                                                                                                         |
| placeholder | 占位提示内容                                                                                                                                                                                                                                         |                                   string                                  |                                                                                                                         |
| disabled    | 禁用<hr>默认值:<br><pre>false</pre>                                                                                                                                                                                                                  |                                  boolean                                  |                                                                                                                         |
| readonly    | 只读<hr>默认值:<br><pre>false</pre>                                                                                                                                                                                                                  |                                  boolean                                  |                                                                                                                         |
| size        | 尺寸<hr>默认值:<br><pre>md</pre>                                                                                                                                                                                                                     |                             [Size](#linksize)                             | `2xs` , `xs` , `sm` , `md` , `lg` , `xl` , `2xl` , `1x` , `2x` , `3x` , `4x` , `5x` , `6x` , `7x` , `8x` , `9x` , `10x` |
| status      | 数据状态<hr>默认值:<br><pre>default</pre>                                                                                                                                                                                                            |                       [DataStatus](#linkdatastatus)                       | `default` , `success` , `error` , `warn`                                                                                |
| v-model     | 数据双向绑定                                                                                                                                                                                                                                         | string \| boolean \| number \| Array&lt;string&gt; \| Array&lt;number&gt; |                                                                                                                         |
| multi       | 是否是多选<hr>默认值:<br><pre>false</pre>                                                                                                                                                                                                            |                                  boolean                                  |                                                                                                                         |
| source      |                                                                                                                                                                                                                                                      |                 Array&lt;[LabelValue](#linklabelvalue)&gt;                |                                                                                                                         |
| icons       | <hr>默认值:<br><pre>default (props: any) {<br>  return props.multi ?<br>    {<br>      checked: faSquareCheck,<br>      notChecked: faSquare<br>    } :<br>    {<br>      checked: faSquareCheck,<br>      notChecked: faSquare<br>    };<br>}</pre> |                      [SelectIcons](#linkselecticons)                      |                                                                                                                         |

</div>



## Events


<div class="events">

| 名称   | 参数                                                      | 描述       |
| :----- | :-------------------------------------------------------- | :--------- |
| change | `arg0` { [CheckboxEventArgs](#linkcheckboxeventargs) } ： | Change事件 |
| focus  | `arg0` { [CheckboxEventArgs](#linkcheckboxeventargs) } ： | 焦点事件   |
| blur   | `arg0` { [CheckboxEventArgs](#linkcheckboxeventargs) } ： | 失去事件   |

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

### Size {#linksize}

- Size = 	 [TshirtSize](#linktshirtsize) \| [NumberSize](#linknumbersize) \| number \| (string &amp; { fromT?: any })

### DataStatus {#linkdatastatus}

- DataStatus = 	 `default` \| `success` \| `error` \| `warn`

### LabelValue {#linklabelvalue}

- 选项：
	 - `label` { string } : 标签

### SelectIcons {#linkselecticons}

- 选项：
	 - [`checked`] { IconDefinition \| IconPack \| IconName \| [StringOther](#linkstringother) } : 选中状态图标
	 - [`notChecked`] { IconDefinition \| IconPack \| IconName \| [StringOther](#linkstringother) } : 为选中状态图标

### CheckboxEventArgs {#linkcheckboxeventargs}

- 选项：

### TshirtSize {#linktshirtsize}

- TshirtSize = 	 `2xs` \| `xs` \| `sm` \| `md` \| `lg` \| `xl` \| `2xl`

### NumberSize {#linknumbersize}

- NumberSize = 	 `1x` \| `2x` \| `3x` \| `4x` \| `5x` \| `6x` \| `7x` \| `8x` \| `9x` \| `10x`

### StringOther {#linkstringother}

- StringOther = 	 string \& 