# Title


Title使用

## Slots


<div class="slots">

| 名称    | 参数 | 描述 |
| :------ | :--- | :--- |
| default |      |      |

</div>



## Props


<div class="props">

| 名称       | 描述                                     |                           类型                          | 可选值                     |
| :--------- | :--------------------------------------- | :-----------------------------------------------------: | :------------------------- |
| id         | 组件id，若不设置会自动生成               |                          String                         |                            |
| display    | 显示隐藏<hr>默认值:<br><pre>true</pre>   |                         Boolean                         |                            |
| rendered   | 组件渲染完后的回调                       | (args:[RenderedReturn](#linkrenderedreturn)) =&gt; void |                            |
| strong     | 加粗                                     |                         Boolean                         |                            |
| delete     | 删除线                                   |                         Boolean                         |                            |
| underline  | 下滑线                                   |                         Boolean                         |                            |
| italic     | 斜体                                     |                         Boolean                         |                            |
| mark       | 标记                                     |                                                         |                            |
| secondary  | 是否是次要文本                           |                         Boolean                         |                            |
| selectable | 是否可选择<hr>默认值:<br><pre>true</pre> |                         Boolean                         |                            |
| level      | <hr>默认值:<br><pre>1</pre>              |              [TitleLevel](#linktitlelevel)              | `1` , `2` , `3` , `4`      |
| align      | <hr>默认值:<br><pre>start</pre>          |                   [Align](#linkalign)                   | `start` , `center` , `end` |
| ellipsis   | 文本溢出配置                             |      [SingleLineEllipsis](#linksinglelineellipsis)      |                            |

</div>



## Methods

### setDisplay(flag: boolean)
- 用法： 设置隐藏
- 参数：
	 - flag： true:显示，false:隐藏

### domRefresh()
- 用法： 刷新组件

## 关联类型



### RenderedReturn {#linkrenderedreturn}

- 选项：

### TitleLevel {#linktitlelevel}

- TitleLevel = 	 `1` \| `2` \| `3` \| `4`

### Align {#linkalign}

- 描述： 对齐方式<br/>`start` : 开始位置<br/>`center` : 中间位置<br/>`end` : 结束位置
- Align = 	 `start` \| `center` \| `end`

### SingleLineEllipsis {#linksinglelineellipsis}

- 描述： 单行文本溢出配置
- 选项：