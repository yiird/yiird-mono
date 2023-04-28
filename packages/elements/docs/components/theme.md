# Theme


Theme 用于配置主题

## Slots

| 名称    | 参数 | 描述 |
| :------ | :--- | :--- |
| default |      |      |

## Props

| 名称      |               类型              | 必填 | 可选值 | 默认值 | 描述 |
| :-------- | :-----------------------------: | :--: | :----- | :----- | :--- |
| dark      |             Boolean             |      |        | false  |      |
| themeVars | [UserThemeVars](#userthemevars) |      |        |        |      |

## 关联类型



### UserThemeVars

- 选项：
	 - `fontFamily` { string } : 字体
	 - `fontSize` { number } : 字体标准大小 `13` `14` `16`
	 - `colorPrimary` { 'red' | 'volcano' | 'orange' | 'gold' | 'yellow' | 'lime' | 'green' | 'cyan' | 'blue' | 'geekblue' | 'purple' | 'magenta' | 'grey' | 'gray' } : 主色
	 - `colorSuccess` { 'lime' | 'green' } : 辅助色-成功
	 - `colorError` { 'red' | 'volcano' } : 辅助色-失败
	 - `colorWarn` { 'orange' | 'gold' } : 辅助色-警告