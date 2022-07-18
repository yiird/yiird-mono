# OPopper



## Slots

| 名称    | 参数 | 描述 |
| :------ | :--- | :--- |
| default |      |      |

## Props

| 名称            |                       类型                       | 必填 | 可选值                                                                                                                                                                                       | 默认值                            | 描述                                                                                                                                                                                              |
| :-------------- | :----------------------------------------------: | :--: | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :-------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| id              |                      String                      |      |                                                                                                                                                                                              |                                   | 组件id，若不设置会自动生成                                                                                                                                                                        |
| display         |                      Boolean                     |      |                                                                                                                                                                                              | true                              | 显示隐藏                                                                                                                                                                                          |
| reference       | Element,[VirtualElement](#virtualelement),string |      |                                                                                                                                                                                              |                                   | 参照物<br/>reference 可为DOM元素、虚拟DOM元素、vue refDOM对象、css选择器                                                                                                                          |
| mode            |                      String                      |      | `manul` , `click` , `hover` , `click-out`                                                                                                                                                    | hover                             | 显示隐藏模式<br/>`manul` 根据 `display` 进行显示隐藏<br/>`click` 点击参照物显示，点击其他非参照物区域隐藏<br/>`hover` 鼠标进入参照物隐藏，移出隐藏<br/>`click-out` 点击参照物显示，移出参照物隐藏 |
| followReference |                      Boolean                     |      |                                                                                                                                                                                              | false                             | 当参照物在裁剪区域内显示，参照物移动出裁剪区域则隐藏                                                                                                                                              |
| canHideOnPopper |                      Boolean                     |      |                                                                                                                                                                                              | true                              | 鼠标在popper上时是否允许隐藏                                                                                                                                                                      |
| offset          |           [PopperOffset](#popperoffset)          |      |                                                                                                                                                                                              | default() {
			return {
				distance: 8
			};
		} | 设置相对参照物的偏移                                                                                                                                                                              |
| placement       |                      String                      |      | `auto` , `auto-start` , `auto-end` , `top` , `bottom` , `left` , `right` , `top-start` , `top-end` , `bottom-start` , `bottom-end` , `right-start` , `right-end` , `left-start` , `left-end` | bottom                            | 设置相对参照物的位置                                                                                                                                                                              |

## Methods

### domRefresh()
- 用法： 刷新组件

### show()
- 用法： 显示

### hide()
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
	 - `skid` { number } : 参照物侧方向滑动偏移量
	 - `distance` { number } : 距离参照物距离偏移量