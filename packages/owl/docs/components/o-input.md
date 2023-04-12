# OInput

:::warning 功能描述
此组件为文本域组件，[查看样例](/examples/text)。

1、可用`v-model`进行数据绑定

2、支持前、后缀图标和文本

3、支持前、后缀文本绑定到值

4、支持表单内使用、表格内使用、单独使用

5、支持数据校验

6、支持类型复原，比如输入字符串为数字，绑定值会转化为数字类型；输入字符串为boolean，绑定值会转化为boolean类型，undefined会转为null

7、支持输入类型：文本类型🟢、密码模式🟢、日期模式🔴、日期时间模式🔴、时间模式🔴
:::

## Css 变量

`--o-input-color` 字体颜色

`--o-input-placeholder-color` 提示语颜色

`--o-input-line-height` 行高

`--o-input-border-color` 边框颜色

`--o-input-prefix-bg-color` 前缀背景色

`--o-input-suffix-bg-color` 后缀背景色

## Slots

| 名称   | 参数 | 描述 |
| :----- | :--- | :--- |
| prefix |      | 前缀 |
| suffix |      | 后缀 |

## Props

| 名称        |                       类型                      | 必填 | 可选值                                                                                                                  | 默认值 | 描述                                 |
| :---------- | :---------------------------------------------: | :--: | :---------------------------------------------------------------------------------------------------------------------- | :----- | :----------------------------------- |
| id          |                      String                     |      |                                                                                                                         |        | 组件id，若不设置会自动生成           |
| display     |                     Boolean                     |      |                                                                                                                         | true   | 显示隐藏                             |
| type        |                      String                     |      | `text` , `password` , `date` , `time` , `datetime`                                                                      | text   | 输入类型                             |
| size        |                      String                     |      | `xxs` , `xs` , `sm` , `md` , `lg` , `xl` , `xxl` , `1x` , `2x` , `3x` , `4x` , `5x` , `6x` , `7x` , `8x` , `9x` , `10x` | md     | 尺寸                                 |
| placeholder |                      String                     |      |                                                                                                                         |        | 提示语                               |
| prefix      | IconName,IconDefinition,[InputIcon](#inputicon) |      |                                                                                                                         |        | 文本域前缀图标                       |
| suffix      |                      String                     |      |                                                                                                                         |        | 文本域后缀图标                       |
| prefixText  |                      String                     |      |                                                                                                                         |        | 前缀文本                             |
| suffixText  |                      String                     |      |                                                                                                                         |        | 后缀文本                             |
| bind        |                      String                     |      | `all` , `prefix` , `suffix`                                                                                             |        | 输入的值，绑定前缀、后缀或两者的文本 |
| radius      |                  boolean,number                 |      |                                                                                                                         | true   | 圆角                                 |
| loading     |                     Boolean                     |      |                                                                                                                         | false  | 加载状态                             |
| disabled    |                     Boolean                     |      |                                                                                                                         | false  | 禁用状态                             |
| readonly    |                     Boolean                     |      |                                                                                                                         | false  | 禁用状态                             |

## Events

| 名称              | 参数                                                                           | 描述             |
| :---------------- | :----------------------------------------------------------------------------- | :--------------- |
| focus             | `arg0` { EventBinding } ：回调参数<br>关联类型：[EventBinding](#eventbinding)  | 获得焦点         |
| blur              | `arg0` { EventBinding } ：回调参数<br>关联类型：[EventBinding](#eventbinding)  | 失去焦点         |
| click-prefix-icon | `arg0` { EventBinding } ：回调参数<br>关联类型：[EventBinding](#eventbinding)  | 前缀图标单击事件 |
| click-suffix-icon | `arg0` { EventBinding } ：回调参数<br>关联类型：[EventBinding](#eventbinding)  | 后缀图标单击事件 |

## Methods

### domRefresh()
- 用法： 刷新组件













### onSelectedDay()
- 用法： :::warning 功能描述<br/>此组件为文本域组件，[查看样例](/examples/text)。<br/><br/>1、可用`v-model`进行数据绑定<br/><br/>2、支持前、后缀图标和文本<br/><br/>3、支持前、后缀文本绑定到值<br/><br/>4、支持表单内使用、表格内使用、单独使用<br/><br/>5、支持数据校验<br/><br/>6、支持类型复原，比如输入字符串为数字，绑定值会转化为数字类型；输入字符串为boolean，绑定值会转化为boolean类型，undefined会转为null<br/><br/>7、支持输入类型：文本类型🟢、密码模式🟢、日期模式🔴、日期时间模式🔴、时间模式🔴<br/>:::<br/><br/>## Css 变量<br/><br/>`--o-input-color` 字体颜色<br/><br/>`--o-input-placeholder-color` 提示语颜色<br/><br/>`--o-input-line-height` 行高<br/><br/>`--o-input-border-color` 边框颜色<br/><br/>`--o-input-prefix-bg-color` 前缀背景色<br/><br/>`--o-input-suffix-bg-color` 后缀背景色

### onEnterPress(e: KeyboardEvent)
- 用法： :::warning 功能描述<br/>此组件为文本域组件，[查看样例](/examples/text)。<br/><br/>1、可用`v-model`进行数据绑定<br/><br/>2、支持前、后缀图标和文本<br/><br/>3、支持前、后缀文本绑定到值<br/><br/>4、支持表单内使用、表格内使用、单独使用<br/><br/>5、支持数据校验<br/><br/>6、支持类型复原，比如输入字符串为数字，绑定值会转化为数字类型；输入字符串为boolean，绑定值会转化为boolean类型，undefined会转为null<br/><br/>7、支持输入类型：文本类型🟢、密码模式🟢、日期模式🔴、日期时间模式🔴、时间模式🔴<br/>:::<br/><br/>## Css 变量<br/><br/>`--o-input-color` 字体颜色<br/><br/>`--o-input-placeholder-color` 提示语颜色<br/><br/>`--o-input-line-height` 行高<br/><br/>`--o-input-border-color` 边框颜色<br/><br/>`--o-input-prefix-bg-color` 前缀背景色<br/><br/>`--o-input-suffix-bg-color` 后缀背景色
- 参数：
	 - e： undefined

## 关联类型



### InputIcon

- 选项：
	 - `icon` { IconName } : 
	 - `prefix` { IconPrefix } : 

### EventBinding

- 选项：
	 - `event` { Event } : Dom事件对象
	 - `value` { unknown } : 组件值