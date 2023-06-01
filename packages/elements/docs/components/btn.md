# Btn


Button使用

## Slots


<div class="slots">

| 名称    | 参数 | 描述 |
| :------ | :--- | :--- |
| default |      |      |
| drop    |      |      |

</div>



## Props


<div class="props">

| 名称     | 描述                                        |                    类型                   | 可选值                                                                                                                  |
| :------- | :------------------------------------------ | :---------------------------------------: | :---------------------------------------------------------------------------------------------------------------------- |
| id       | 组件id，若不设置会自动生成                  |                   String                  |                                                                                                                         |
| display  | 显示隐藏<hr>默认值:<br><pre>true</pre>      |                  Boolean                  |                                                                                                                         |
| icon     |                                             |            IconNameOrDefinition           |                                                                                                                         |
| size     | 尺寸<hr>默认值:<br><pre>md</pre>            |                   String                  | `2xs` , `xs` , `sm` , `md` , `lg` , `xl` , `2xl` , `1x` , `2x` , `3x` , `4x` , `5x` , `6x` , `7x` , `8x` , `9x` , `10x` |
| color    | 颜色<hr>默认值:<br><pre>default</pre>       | StateColor,StateColorGroupStatecolorgroup | `default` , `primary` , `success` , `warn` , `error`                                                                    |
| shape    | 形状可选<hr>默认值:<br><pre>rectangle</pre> |                   String                  | `rectangle` , `circle` , `square` , `ellipse`                                                                           |
| disabled | 是否禁用按钮<hr>默认值:<br><pre>false</pre> |                  Boolean                  |                                                                                                                         |
| mode     | 模式<hr>默认值:<br><pre>default</pre>       |                   String                  | `default` , `half` , `empty` , `link` , `dashed`                                                                        |
| loading  | 加载状态<hr>默认值:<br><pre>false</pre>     |                  Boolean                  |                                                                                                                         |
| shadow   | 是否使用阴影<hr>默认值:<br><pre>true</pre>  |                  Boolean                  |                                                                                                                         |

</div>



## Methods

### setDisplay(flag: boolean)
- 用法： 设置隐藏
- 参数：
	 - flag： true:显示，false:隐藏

### domRefresh()
- 用法： 刷新组件

## 关联类型



### StateColorGroup

- 选项：
	 - `primary` { Color } : 
	 - `primaryHover` { Color } : 
	 - `secondary` { Color } : 
	 - `halfAlpha` { Color } : 
	 - `text` { Color } : 