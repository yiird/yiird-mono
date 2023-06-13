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
	 - `ye_size` { [TshirtSize](#linktshirtsize) \| [NumberSize](#linknumbersize) } : 默认组件尺寸
	 - `ye_spaceSize` { number } : 
	 - `ye_iconPrefix` { IconPrefix } : 默认图标前缀
	 - `ye_fontFamily` { string } : 字体
	 - `ye_fontSize` { number } : 字体标准大小 `13` `14` `16`
	 - `ye_baseHeightPercentOfFontSize` { number } : 基础行高相对于字体大小的百分比
	 - `fontWeightLight` { number } : 字重
	 - `fontWeightRegular` { number } : 
	 - `fontWeightBold` { number } : 
	 - `ye_colorPrimary` { `red` \| `volcano` \| `orange` \| `gold` \| `yellow` \| `lime` \| `green` \| `cyan` \| `blue` \| `geekblue` \| `purple` \| `magenta` \| `grey` \| `gray` } : 主色
	 - `ye_colorSuccess` { `lime` \| `green` } : 辅助色-成功
	 - `ye_colorError` { `red` \| `volcano` } : 辅助色-失败
	 - `ye_colorWarn` { `orange` \| `gold` } : 辅助色-警告

### TshirtSize {#linktshirtsize}

- TshirtSize = 	 `2xs` \| `xs` \| `sm` \| `md` \| `lg` \| `xl` \| `2xl`

### NumberSize {#linknumbersize}

- NumberSize = 	 `1x` \| `2x` \| `3x` \| `4x` \| `5x` \| `6x` \| `7x` \| `8x` \| `9x` \| `10x`

### Array {#linkarray}
