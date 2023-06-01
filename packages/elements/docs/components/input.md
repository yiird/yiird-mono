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

| 名称         | 描述                                       |             类型            | 可选值                                                                                                                  |
| :----------- | :----------------------------------------- | :-------------------------: | :---------------------------------------------------------------------------------------------------------------------- |
| id           | 组件id，若不设置会自动生成                 |            String           |                                                                                                                         |
| display      | 显示隐藏<hr>默认值:<br><pre>true</pre>     |           Boolean           |                                                                                                                         |
| v-model      |                                            |        String,Number        |                                                                                                                         |
| v-model:data |                                            |      [object](#object)      |                                                                                                                         |
| label        | 标题                                       |            String           |                                                                                                                         |
| disabled     | 是否禁用<hr>默认值:<br><pre>false</pre>    |           Boolean           |                                                                                                                         |
| readonly     | 是否禁用<hr>默认值:<br><pre>false</pre>    |           Boolean           |                                                                                                                         |
| size         | 尺寸<hr>默认值:<br><pre>md</pre>           |            String           | `2xs` , `xs` , `sm` , `md` , `lg` , `xl` , `2xl` , `1x` , `2x` , `3x` , `4x` , `5x` , `6x` , `7x` , `8x` , `9x` , `10x` |
| shadow       | 是否使用阴影<hr>默认值:<br><pre>true</pre> |           Boolean           |                                                                                                                         |
| loading      | 是否使用阴影<hr>默认值:<br><pre>true</pre> |           Boolean           |                                                                                                                         |
| right-action | 右侧扩展                                   | [InputAction](#inputaction) |                                                                                                                         |
| left-action  | 左侧扩展                                   | [InputAction](#inputaction) |                                                                                                                         |

</div>



## Methods

### setDisplay(flag: boolean)
- 用法： 设置隐藏
- 参数：
	 - flag： true:显示，false:隐藏

### domRefresh()
- 用法： 刷新组件

### doFoucs_()
- 用法： 

### doBlur_()
- 用法： 

## 关联类型



### InputAction

- 选项：
	 - `text` { string } : 
	 - `icon` { IconNameOrDefinition } : 

- 关联类型：
	 - [IconNameOrDefinition](#iconnameordefinition)