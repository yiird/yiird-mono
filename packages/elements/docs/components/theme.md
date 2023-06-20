# Theme


Theme 用于配置主题

## Slots


<div class="slots">

| 名称    | 参数 | 描述 |
| :------ | :--- | :--- |
| default |      |      |

</div>



## Props


<div class="props">

| 名称       | 描述                            |                 类型                | 可选值 |
| :--------- | :------------------------------ | :---------------------------------: | :----- |
| dark       | <hr>默认值:<br><pre>false</pre> |               Boolean               |        |
| theme-vars |                                 | [UserThemeVars](#linkuserthemevars) |        |

</div>



## 关联类型



### UserThemeVars {#linkuserthemevars}

- 选项：
	 - `componentSize` { [TshirtSize](#linktshirtsize) \| [NumberSize](#linknumbersize) } : 默认组件尺寸
	 - `spaceSize` { number } : 
	 - `iconPrefix` { IconPrefix } : 默认图标前缀
	 - `fontFamily` { string } : 字体
	 - `fontSize` { number } : 字体标准大小 `13` `14` `16`
	 - `ratioOfComponentHeightToFontSize` { number } : 组件高度与字体的比值
	 - `ratioOfTextLineHeightToFontSize` { number } : 文本行高与字体的比值
	 - `fontWeightLight` { number } : 字重
	 - `fontWeightRegular` { number } : 
	 - `fontWeightBold` { number } : 
	 - `colorPrimary` { `red` \| `volcano` \| `orange` \| `gold` \| `yellow` \| `lime` \| `green` \| `cyan` \| `blue` \| `geekblue` \| `purple` \| `magenta` \| `grey` \| `gray` } : 主色
	 - `colorSuccess` { `lime` \| `green` } : 辅助色-成功
	 - `colorError` { `red` \| `volcano` } : 辅助色-失败
	 - `colorWarn` { `orange` \| `gold` } : 辅助色-警告

### TshirtSize {#linktshirtsize}

- TshirtSize = 	 `2xs` \| `xs` \| `sm` \| `md` \| `lg` \| `xl` \| `2xl`

### NumberSize {#linknumbersize}

- NumberSize = 	 `1x` \| `2x` \| `3x` \| `4x` \| `5x` \| `6x` \| `7x` \| `8x` \| `9x` \| `10x`

### Array {#linkarray}
