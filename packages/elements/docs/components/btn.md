# Btn


Button使用

## Slots

| 名称    | 参数 | 描述 |
| :------ | :--- | :--- |
| default |      |      |

## Props

| 名称      |   类型  | 必填 | 可选值                                                                                                                  | 默认值    | 描述                       |
| :-------- | :-----: | :--: | :---------------------------------------------------------------------------------------------------------------------- | :-------- | :------------------------- |
| id        |  String |      |                                                                                                                         |           | 组件id，若不设置会自动生成 |
| display   | Boolean |      |                                                                                                                         | true      | 显示隐藏                   |
| size      |  String |      | `2xs` , `xs` , `sm` , `md` , `lg` , `xl` , `2xl` , `1x` , `2x` , `3x` , `4x` , `5x` , `6x` , `7x` , `8x` , `9x` , `10x` | md        | 尺寸                       |
| color     |  String |      | `default` , `primary` , `success` , `warning` , `danger`                                                                | default   | 颜色                       |
| textColor |  String |      |                                                                                                                         |           | 文本颜色                   |
| shape     |  String |      | `rectangle` , `circle` , `square` , `ellipse`                                                                           | rectangle | 形状可选                   |
| disabled  | Boolean |      |                                                                                                                         | false     | 是否禁用按钮               |
| mode      |  String |      | `normal` , `empty` , `link` , `dashed`                                                                                  | normal    | 模式                       |
| loading   | Boolean |      |                                                                                                                         | false     |                            |

## Methods

### domRefresh()
- 用法： 刷新组件