# OPopper



## Slots

| 名称    | 参数 | 描述 |
| :------ | :--- | :--- |
| default |      |      |

## Props

| 名称             |                       类型                       | 必填 | 可选值                                                                                                                                                  | 默认值                                                                            | 描述                                                                                                                                                                                              |
| :--------------- | :----------------------------------------------: | :--: | :------------------------------------------------------------------------------------------------------------------------------------------------------ | :-------------------------------------------------------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| id               |                      String                      |      |                                                                                                                                                         |                                                                                   | 组件id，若不设置会自动生成                                                                                                                                                                        |
| display          |                      Boolean                     |      |                                                                                                                                                         | true                                                                              | 显示隐藏                                                                                                                                                                                          |
| reference        | Element,[VirtualElement](#virtualelement),string |      |                                                                                                                                                         |                                                                                   | 参照物<br/>reference 可为DOM元素、虚拟DOM元素、vue refDOM对象、css选择器                                                                                                                          |
| mode             |                      String                      |      | `manul` , `click` , `hover` , `click-out`                                                                                                               | hover                                                                             | 显示隐藏模式<br/>`manul` 根据 `display` 进行显示隐藏<br/>`click` 点击参照物显示，点击其他非参照物区域隐藏<br/>`hover` 鼠标进入参照物隐藏，移出隐藏<br/>`click-out` 点击参照物显示，移出参照物隐藏 |
| hideOnPopper     |                      Boolean                     |      |                                                                                                                                                         | false                                                                             | 鼠标在popper上时是否允许隐藏                                                                                                                                                                      |
| hideOnOut        |                      Boolean                     |      |                                                                                                                                                         | false                                                                             | 当参照物在裁剪区域内显示，参照物移动出裁剪区域则隐藏                                                                                                                                              |
| offset           |           [PopperOffset](#popperoffset)          |      |                                                                                                                                                         | default() {
            return {
                mainAxis: 8
            };
        } | 设置相对参照物的偏移                                                                                                                                                                              |
| placement        |                      String                      |      | `top` , `top-start` , `top-end` , `right` , `right-start` , `right-end` , `bottom` , `bottom-start` , `bottom-end` , `left` , `left-start` , `left-end` | bottom                                                                            | 设置相对参照物的位置                                                                                                                                                                              |
| arrowPlacement   |                      String                      |      | `edge*-start|*-end靠近参照物边缘开始或结束` , `fit自适应`                                                                                               | edge                                                                              | 箭头位置                                                                                                                                                                                          |
| updateEveryFrame |                      Boolean                     |      |                                                                                                                                                         | false                                                                             | 更新每一帧                                                                                                                                                                                        |
| shadow           |                      Boolean                     |      |                                                                                                                                                         | true                                                                              |                                                                                                                                                                                                   |
| bgColor          |                      String                      |      |                                                                                                                                                         |                                                                                   |                                                                                                                                                                                                   |
| borderColor      |                      String                      |      |                                                                                                                                                         |                                                                                   |                                                                                                                                                                                                   |

## Events

| 名称         | 参数 | 描述 |
| :----------- | :--- | :--- |
| open         |      |      |
| close        |      |      |
| click-popper |      |      |

## Methods

### domRefresh()
- 用法： 刷新组件



### getEl()
- 用法： 

## 关联类型



### VirtualElement

- 描述： 虚拟元素定义<br/>您可以使用虚拟元素而不是真实的 DOM 元素作为Popper参考。
- 选项：
	 - `getBoundingClientRect` { () => DOMRect } : 
	 - `contextElement` { Element } : 

### PopperOffset

- 描述： 偏移量
- 选项：
	 - `crossAxis` { number } : 参照物侧方向滑动偏移量
	 - `mainAxis` { number } : 距离参照物距离偏移量