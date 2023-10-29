# Input


Input使用

## Props


<div class="props">

| 名称         | 描述                                                        |                           类型                          | 可选值                                                                                                                  |
| :----------- | :---------------------------------------------------------- | :-----------------------------------------------------: | :---------------------------------------------------------------------------------------------------------------------- |
| id           | 组件id，若不设置会自动生成                                  |                          String                         |                                                                                                                         |
| display      | 显示隐藏<hr>默认值:<br><pre>true</pre>                      |                         Boolean                         |                                                                                                                         |
| rendered     | 组件渲染完后的回调                                          | (args:[RenderedReturn](#linkrenderedreturn)) =&gt; void |                                                                                                                         |
| name         | 表单项 `name`                                               |                          string                         |                                                                                                                         |
| placeholder  | 占位提示内容                                                |                          string                         |                                                                                                                         |
| disabled     | 禁用<hr>默认值:<br><pre>false</pre>                         |                         boolean                         |                                                                                                                         |
| readonly     | 只读<hr>默认值:<br><pre>false</pre>                         |                         boolean                         |                                                                                                                         |
| size         | 尺寸<hr>默认值:<br><pre>md</pre>                            |                    [Size](#linksize)                    | `2xs` , `xs` , `sm` , `md` , `lg` , `xl` , `2xl` , `1x` , `2x` , `3x` , `4x` , `5x` , `6x` , `7x` , `8x` , `9x` , `10x` |
| status       | 数据状态<hr>默认值:<br><pre>default</pre>                   |              [DataStatus](#linkdatastatus)              | `default` , `success` , `error` , `warn`                                                                                |
| v-model      | 数据双向绑定                                                |                     string \| number                    |                                                                                                                         |
| loading      | 加载标志<hr>默认值:<br><pre>false</pre>                     |                         boolean                         |                                                                                                                         |
| max-length   | 最大长度                                                    |                          number                         |                                                                                                                         |
| show-counter | 是否显示计数<hr>默认值:<br><pre>false</pre>                 |                         Boolean                         |                                                                                                                         |
| shadow       | 是否使用阴影<hr>默认值:<br><pre>true</pre>                  |                         boolean                         |                                                                                                                         |
| mode         | 类型<hr>默认值:<br><pre>text</pre>                          |               [InputMode](#linkinputmode)               | `text` , `password` , `number`                                                                                          |
| prefixes     | <hr>默认值:<br><pre>default () {<br>  return [];<br>}</pre> |             Array&lt;[Affix](#linkaffix)&gt;            |                                                                                                                         |
| suffixes     | <hr>默认值:<br><pre>default () {<br>  return [];<br>}</pre> |             Array&lt;[Affix](#linkaffix)&gt;            |                                                                                                                         |

</div>



## Events


<div class="events">

| 名称          | 参数                                                          | 描述       |
| :------------ | :------------------------------------------------------------ | :--------- |
| change        | `arg0` { [FormItemEventArgs](#linkformitemeventargs) } ：     | Change事件 |
| focus         | `arg0` { [FormItemEventArgs](#linkformitemeventargs) } ：     | 焦点事件   |
| blur          | `arg0` { [FormItemEventArgs](#linkformitemeventargs) } ：     | 失去事件   |
| input         | `arg0` { [FormItemEventArgs](#linkformitemeventargs) } ：参数 | Input事件  |
| right-action  |                                                               |            |
| left-action   |                                                               |            |
| prefix-action |                                                               |            |
| suffix-action |                                                               |            |
| tab-key-down  |                                                               |            |

</div>



## Methods

### setDisplay(flag: boolean)
- 用法： 设置隐藏
- 参数：
	 - flag： true:显示，false:隐藏

### domRefresh()
- 用法： 刷新组件











### doCheckPassword(flag: boolean)
- 用法： 显示隐藏密码
- 参数：
	 - flag： `true` 显示密码



## 关联类型



### RenderedReturn {#linkrenderedreturn}

- 选项：

### Size {#linksize}

- Size = 	 [TshirtSize](#linktshirtsize) \| [NumberSize](#linknumbersize) \| number \| (string &amp; { fromT?: any })

### DataStatus {#linkdatastatus}

- DataStatus = 	 `default` \| `success` \| `error` \| `warn`

### InputMode {#linkinputmode}

- InputMode = 	 `text` \| `password` \| `number`

### Affix {#linkaffix}

- 描述： Affix
- 选项：
	 - `kind` { `icon` \| `icon-text` \| `button` } : 指定Affix渲染的目标组件
	 - [`text`] { string } : 提示语或者显示文本
	 - [`icon`] { IconDefinition \| IconPack \| IconName \| [StringOther](#linkstringother) } : 图标
	 - [`onClick`] { (args:any) =&gt; void } : 操作回调
	 - [`el`] { Ref } : 可将dom节点挂在到此项上
	 - [`style`] { CSSProperties \| [StringOther](#linkstringother) } : 样式

### FormItemEventArgs {#linkformitemeventargs}

- 选项：

### TshirtSize {#linktshirtsize}

- TshirtSize = 	 `2xs` \| `xs` \| `sm` \| `md` \| `lg` \| `xl` \| `2xl`

### NumberSize {#linknumbersize}

- NumberSize = 	 `1x` \| `2x` \| `3x` \| `4x` \| `5x` \| `6x` \| `7x` \| `8x` \| `9x` \| `10x`

### StringOther {#linkstringother}

- StringOther = 	 string \& 

### ActionCallback {#linkactioncallback}

- 方法型：	 (args:any) =&gt; void