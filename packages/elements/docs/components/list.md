# List


List使用

## Props


<div class="props">

| 名称    | 描述                                                              |           类型          | 可选值    |
| :------ | :---------------------------------------------------------------- | :---------------------: | :-------- |
| id      | 组件id，若不设置会自动生成                                        |          String         |           |
| display | 显示隐藏<hr>默认值:<br><pre>true</pre>                            |         Boolean         |           |
| items   | 列表项<hr>默认值:<br><pre>default () {<br>  return [];<br>}</pre> | [ListItem](#listitem)[] |           |
| layout  | 布局<br/>`h`: 横向<br/>`v`: 纵向<hr>默认值:<br><pre>h</pre>       |          String         | `h` , `v` |

</div>



## Methods

### setDisplay(flag: boolean)
- 用法： 设置隐藏
- 参数：
	 - flag： true:显示，false:隐藏

### domRefresh()
- 用法： 刷新组件

## 关联类型



### ListItem

- 描述： 列表项
- 选项：
	 - `avatar` { string | IconNameOrDefinition } : 头像
	 - `title` { string } : 标题
	 - `description` { string } : 描述