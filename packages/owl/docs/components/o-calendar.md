# OCalendar

日历

## Props

| 名称    |   类型  | 必填 | 可选值 | 默认值     | 描述                       |
| :------ | :-----: | :--: | :----- | :--------- | :------------------------- |
| id      |  String |      |        |            | 组件id，若不设置会自动生成 |
| display | Boolean |      |        | true       | 显示隐藏                   |
| format  |  String |      |        | yyyy-MM-dd |                            |

## Events

| 名称           | 参数                                                                                                   | 描述         |
| :------------- | :----------------------------------------------------------------------------------------------------- | :----------- |
| selected-day   | `arg0` { CalendarEventBinding } ：回调参数<br>关联类型：[CalendarEventBinding](#calendareventbinding)  | 改变日时触发 |
| selected-year  | `arg0` { CalendarEventBinding } ：回调参数<br>关联类型：[CalendarEventBinding](#calendareventbinding)  | 改变年时触发 |
| selected-month | `arg0` { CalendarEventBinding } ：回调参数<br>关联类型：[CalendarEventBinding](#calendareventbinding)  | 改变月时触发 |

## Methods

### domRefresh()
- 用法： 刷新组件

### openSelectYear()
- 用法： 日历

### openSelectMonth()
- 用法： 日历















## 关联类型



### CalendarEventBinding

- 选项：
	 - `date` { Date } : 
	 - `type` { 'year' | 'month' | 'day' } : 
	 - `formatted` { string } : 
	 - `selectedNum` { number } : 