# Tree


Tree使用

## Props

| 名称      | 描述                                                                                                                                                 |                 类型                | 可选值                                                                                                                  |
| :-------- | :--------------------------------------------------------------------------------------------------------------------------------------------------- | :---------------------------------: | :---------------------------------------------------------------------------------------------------------------------- |
| id        | 组件id，若不设置会自动生成                                                                                                                           |                String               |                                                                                                                         |
| display   | 显示隐藏<hr>默认值:<br><pre>true</pre>                                                                                                               |               Boolean               |                                                                                                                         |
| items     | <hr>默认值:<br><pre>default () {<br>  return [];<br>}</pre>                                                                                          |               object[]              |                                                                                                                         |
| keyConfig | <hr>默认值:<br><pre>default () {<br>  return {<br>    key: 'id',<br>    pkey: 'pid',<br>    ckey: 'children',<br>    tkey: 'name'<br>  };<br>}</pre> | [TransforOptions](#transforoptions) |                                                                                                                         |
| size      |                                                                                                                                                      |                 Size                | `2xs` , `xs` , `sm` , `md` , `lg` , `xl` , `2xl` , `1x` , `2x` , `3x` , `4x` , `5x` , `6x` , `7x` , `8x` , `9x` , `10x` |

## Methods

### setDisplay(flag: boolean)
- 用法： 设置隐藏
- 参数：
	 - flag： true:显示，false:隐藏

### domRefresh()
- 用法： 刷新组件

## 关联类型



### TransforOptions

- 选项：
	 - `key` { string } : 
	 - `pkey` { string } : 
	 - `ckey` { string } : 
	 - `tkey` { string } : 
	 - `operatorNodeFn` { (node: TreeNode) => void } : 