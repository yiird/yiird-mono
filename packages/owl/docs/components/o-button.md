# OButton

Button使用

## Slots

| 名称    | 参数 | 描述     |
| :------ | :--- | :------- |
| default |      | 默认插槽 |

## Props

| 名称      |   类型  | 必填 | 可选值                                                                                                                  | 默认值    | 描述                       |
| :-------- | :-----: | :--: | :---------------------------------------------------------------------------------------------------------------------- | :-------- | :------------------------- |
| id        |  String |      |                                                                                                                         |           | 组件id，若不设置会自动生成 |
| display   | Boolean |      |                                                                                                                         | true      | 显示隐藏                   |
| size      |  String |      | `xxs` , `xs` , `sm` , `md` , `lg` , `xl` , `xxl` , `1x` , `2x` , `3x` , `4x` , `5x` , `6x` , `7x` , `8x` , `9x` , `10x` | md        | 尺寸                       |
| color     |  String |      | `info` , `primary` , `success` , `warning` , `danger`                                                                   | info      | 颜色                       |
| textColor |  String |      |                                                                                                                         |           | 文本颜色                   |
| shape     |  String |      | `rectangle` , `circle` , `square` , `ellipse`                                                                           | rectangle | 形状可选                   |
| disabled  | Boolean |      |                                                                                                                         | false     | 是否禁用按钮               |
| mode      |  String |      | `normal` , `light` , `empty` , `link` , `apple`                                                                         | normal    | 模式                       |

## Methods

### domRefresh()
- 用法： 刷新组件