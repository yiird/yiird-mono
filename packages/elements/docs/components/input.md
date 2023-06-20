# Input


Input使用

## Slots


<div class="slots">

| 名称   | 参数 | 描述 |
| :----- | :--- | :--- |
| prefix |      | 前缀 |
| suffix |      | 后缀 |

</div>



## Props


<div class="props">

| 名称         | 描述                                        |                        类型                       | 可选值                                                                                                                  |
| :----------- | :------------------------------------------ | :-----------------------------------------------: | :---------------------------------------------------------------------------------------------------------------------- |
| id           | 组件id，若不设置会自动生成                  |                       String                      |                                                                                                                         |
| display      | 显示隐藏<hr>默认值:<br><pre>true</pre>      |                      Boolean                      |                                                                                                                         |
| name         | &lt;input&gt;的名称                         |                       string                      |                                                                                                                         |
| placeholder  | 占位信息                                    |                       string                      |                                                                                                                         |
| v-model      |                                             |                  string \| number                 |                                                                                                                         |
| max-length   | 最大长度                                    |                       number                      |                                                                                                                         |
| show-counter | 是否显示计数<hr>默认值:<br><pre>false</pre> |                      Boolean                      |                                                                                                                         |
| disabled     | 是否禁用<hr>默认值:<br><pre>false</pre>     |                      Boolean                      |                                                                                                                         |
| readonly     | 是否禁用<hr>默认值:<br><pre>false</pre>     |                      Boolean                      |                                                                                                                         |
| status       | 数据状态<hr>默认值:<br><pre>default</pre>   |           [DataStatus](#linkdatastatus)           | `default` , `success` , `error` , `warn`                                                                                |
| size         | 尺寸<hr>默认值:<br><pre>md</pre>            |                 [Size](#linksize)                 | `2xs` , `xs` , `sm` , `md` , `lg` , `xl` , `2xl` , `1x` , `2x` , `3x` , `4x` , `5x` , `6x` , `7x` , `8x` , `9x` , `10x` |
| shadow       | 是否使用阴影<hr>默认值:<br><pre>true</pre>  |                      boolean                      |                                                                                                                         |
| loading      | 是否使用阴影<hr>默认值:<br><pre>false</pre> |                      boolean                      |                                                                                                                         |
| type         | 类型<hr>默认值:<br><pre>text</pre>          |            [InputType](#linkinputtype)            | `text` , `password` , `number`                                                                                          |
| v-model:data |                                             |                       object                      |                                                                                                                         |
| prefix-icon  | 前缀                                        | [IconNameOrDefinition](#linkiconnameordefinition) |                                                                                                                         |
| prefix-text  | 前缀                                        |                       string                      |                                                                                                                         |
| suffix-icon  | 后缀                                        | [IconNameOrDefinition](#linkiconnameordefinition) |                                                                                                                         |
| suffix-text  | 后缀                                        |                       string                      |                                                                                                                         |
| right-action | 右侧扩展                                    |          [InputAction](#linkinputaction)          |                                                                                                                         |
| left-action  | 左侧扩展                                    |          [InputAction](#linkinputaction)          |                                                                                                                         |

</div>



## Events


<div class="events">

| 名称          | 参数                                                    | 描述               |
| :------------ | :------------------------------------------------------ | :----------------- |
| input         | `arg0` { [InputEventArgs](#linkinputeventargs) } ：参数 | Input事件          |
| change        | `arg0` { [InputEventArgs](#linkinputeventargs) } ：     | Change事件         |
| focus         | `arg0` { [InputEventArgs](#linkinputeventargs) } ：     | 焦点事件           |
| blur          | `arg0` { [InputEventArgs](#linkinputeventargs) } ：     | 失去事件           |
| right-action  |                                                         | 右侧action点击事件 |
| left-action   |                                                         | 左侧action点击事件 |
| prefix-action |                                                         |                    |
| suffix-action |                                                         |                    |

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



### DataStatus {#linkdatastatus}

- DataStatus = 	 `default` \| `success` \| `error` \| `warn`

### Size {#linksize}

- Size = 	 [TshirtSize](#linktshirtsize) \| [NumberSize](#linknumbersize)

### InputType {#linkinputtype}

- InputType = 	 `text` \| `password` \| `number`

### IconNameOrDefinition {#linkiconnameordefinition}

- IconNameOrDefinition = 	 IconDefinition \| IconPack \| IconName

### InputAction {#linkinputaction}

- 选项：
	 - `text` { string } : 
	 - `icon` { IconDefinition \| IconPack \| IconName } : 

### InputEventArgs {#linkinputeventargs}

- 描述： 事件参数
- 选项：
	 - `ev` { Event } : 事件对象
	 - `input` { any } : 输入数据
	 - `whole` { any } : 包括前后缀完整数据
	 - `prefix` { Element } : 前缀DOM元素
	 - `suffix` { Element } : 后缀DOM元素
	 - `prefixText` { string \| `null` } : 前缀文本
	 - `suffixText` { string \| `null` } : 后缀文本

### TshirtSize {#linktshirtsize}

- TshirtSize = 	 `2xs` \| `xs` \| `sm` \| `md` \| `lg` \| `xl` \| `2xl`

### NumberSize {#linknumbersize}

- NumberSize = 	 `1x` \| `2x` \| `3x` \| `4x` \| `5x` \| `6x` \| `7x` \| `8x` \| `9x` \| `10x`