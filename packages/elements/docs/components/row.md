# Row


Row使用

## Slots

| 名称    | 参数 | 描述 |
| :------ | :--- | :--- |
| default |      |      |

## Props

| 名称    |               类型              | 必填 | 可选值                                                                         | 默认值  | 描述                       |
| :------ | :-----------------------------: | :--: | :----------------------------------------------------------------------------- | :------ | :------------------------- |
| id      |              String             |      |                                                                                |         | 组件id，若不设置会自动生成 |
| display |             Boolean             |      |                                                                                | true    | 显示隐藏                   |
| gutter  | number,number[],string,string[] |      |                                                                                | 5       | 槽的尺寸                   |
| justify |              String             |      | `start` , `end` , `center` , `space-between` , `space-around` , `space-evenly` | start   | 水平方向的对齐方式         |
| align   |              String             |      | `start` , `end` , `center` , `stretch`                                         | stretch | 垂直方向对齐方式           |

## Methods

### domRefresh()
- 用法： 刷新组件