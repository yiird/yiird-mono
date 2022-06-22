# OButton

Button使用

## Slots

| 名称    | 参数                                                                                   | 描述         |
| :------ | :------------------------------------------------------------------------------------- | :----------- |
| default | `arg0` { String } ：参数描述<br>`arg1` { Arg1 } ：参数描述<br>关联类型：[Arg1](#arg1)  | 这是一个slot |

## Props

| 名称     |   类型  | 必填 | 可选值                                           | 默认值    | 描述         |
| :------- | :-----: | :--: | :----------------------------------------------- | :-------- | :----------- |
| id       |  String |      |                                                  |           |              |
| display  | Boolean |      |                                                  | true      |              |
| size     |  String |      | `xxs` , `xs` , `sm` , `md` , `lg` , `xl` , `xxl` | md        | 尺寸         |
| color    |  String |      | default,primary,success,warning,danger           | default   | 颜色         |
| shape    |  String |      | rectangle,circle,square,ellipse                  | rectangle | 形状可选     |
| disabled | Boolean |      |                                                  | false     | 是否禁用按钮 |
| mode     |  String |      | light,empty,link                                 |           | 模式         |

## Methods

### domRefresh()
- 用法： 刷新组件

### domRefresh2()
- 用法： Button使用

### doClick()
- 用法： Button使用

## 关联类型



### Arg1

- 描述： Arg1说明
- 选项：
	 - `age` { string } : 年龄