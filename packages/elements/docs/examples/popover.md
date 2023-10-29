---
title: 气泡弹框
---

# `Popover`

气泡用于`提示信息`、`下拉显示`,比如：鼠标移到元素上显示提示文本，或者点击下拉选择等。
`popover`有两种使用形式：一种是组件形式，一种是`v-tooltip`形式

## 位置

<Example name="popover-position" ></Example>



## 挂载方式

两种挂载气泡的形式

- 使用目标元素的ref引用
- 通过`v-tooltip`挂载提示语
  
<Example name="popover" ></Example>


## 显示隐藏模式

<Example name="popover-mode" ></Example>


## 文本内容&插槽内容

内容可以是纯文本或者是组件，如果是纯文本可以使用`text`属性，也可以默认插槽的形式放到`popover`标签内，如果是其他组件或者复杂信息建议放到默认插槽内。


<Example name="popover-content"></Example>

## 隐藏时是否考虑弹出层区域

有一种情况，当鼠标指针移出绑定的参考元素，并移动到pop上时，我们不希望pop隐藏。比如：下拉选择功能，当鼠标移动到pop上的选择项时不能隐藏pop。需要设置`hide-think-over-pop = true`。

<Example name="popover-thinkover" ></Example>


## 气泡尺寸

<Example name="popover-size" ></Example>

