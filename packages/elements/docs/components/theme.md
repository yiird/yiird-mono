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

| 名称       | 描述                            |               类型              | 可选值 |
| :--------- | :------------------------------ | :-----------------------------: | :----- |
| dark       | <hr>默认值:<br><pre>false</pre> |             Boolean             |        |
| theme-vars |                                 | [UserThemeVars](#userthemevars) |        |

</div>



## 关联类型



### UserThemeVars

- 选项：
	 - `ye_size` { Size } : 默认组件尺寸
	 - `ye_iconPrefix` { IconPrefix } : 默认图标前缀
	 - `ye_fontFamily` { string } : 字体
	 - `ye_fontSize` { number } : 字体标准大小 `13` `14` `16`
	 - `ye_baseHeightPercentOfFontSize` { number } : 基础行高相对于字体大小的百分比
	 - `ye_colorPrimary` { 'red' | 'volcano' | 'orange' | 'gold' | 'yellow' | 'lime' | 'green' | 'cyan' | 'blue' | 'geekblue' | 'purple' | 'magenta' | 'grey' | 'gray' } : 主色
	 - `ye_colorSuccess` { 'lime' | 'green' } : 辅助色-成功
	 - `ye_colorError` { 'red' | 'volcano' } : 辅助色-失败
	 - `ye_colorWarn` { 'orange' | 'gold' } : 辅助色-警告

- 关联类型：
	 - [Size](#size)