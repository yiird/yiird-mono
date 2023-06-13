# Tabs


Tabs使用

## Slots


<div class="slots">

| 名称        | 参数 | 描述         |
| :---------- | :--- | :----------- |
| extra-left  |      | 左侧辅助插槽 |
| extra-right |      | 右侧辅助插槽 |

</div>



## Props


<div class="props">

| 名称          | 描述                                                                                                                                                      |                     类型                    | 可选值                                                                                                                  |
| :------------ | :-------------------------------------------------------------------------------------------------------------------------------------------------------- | :-----------------------------------------: | :---------------------------------------------------------------------------------------------------------------------- |
| id            | 组件id，若不设置会自动生成                                                                                                                                |                    String                   |                                                                                                                         |
| display       | 显示隐藏<hr>默认值:<br><pre>true</pre>                                                                                                                    |                   Boolean                   |                                                                                                                         |
| items         | 选项<hr>默认值:<br><pre>default () {<br>  return [];<br>}</pre>                                                                                           |          [TabItem](#linktabitem)[]          |                                                                                                                         |
| active-key    | 当前激活的选项卡标识，可以是序号（从0开始），也可以是Tab ID<hr>默认值:<br><pre>0</pre>                                                                    |               number \| string              |                                                                                                                         |
| disabled-keys | 禁用选项卡标识，可以是序号（从0开始），也可以是Tab ID<hr>默认值:<br><pre>default () {<br>  return [];<br>}</pre>                                          | [Array](#linkarray)&lt;string \| number&gt; |                                                                                                                         |
| closeable     | 是否可关闭<hr>默认值:<br><pre>false</pre>                                                                                                                 |                   boolean                   |                                                                                                                         |
| size          | 尺寸<hr>默认值:<br><pre>md</pre>                                                                                                                          |              [Size](#linksize)              | `2xs` , `xs` , `sm` , `md` , `lg` , `xl` , `2xl` , `1x` , `2x` , `3x` , `4x` , `5x` , `6x` , `7x` , `8x` , `9x` , `10x` |
| mode          | 文本模式<hr>默认值:<br><pre>text</pre>                                                                                                                    |       &#39;text&#39; \| &#39;card&#39;      | `text` , `card`                                                                                                         |
| gutter        | 间距<hr>默认值:<br><pre>default (rawProps: any) {<br>  if ('card' === rawProps.mode) {<br>    return 5;<br>  } else {<br>    return 15;<br>  }<br>}</pre> |                    number                   |                                                                                                                         |

</div>



## Methods

### setDisplay(flag: boolean)
- 用法： 设置隐藏
- 参数：
	 - flag： true:显示，false:隐藏

### domRefresh()
- 用法： 刷新组件

### active(activeKey: ,inView: boolean)
- 用法： 激活目标选项卡
- 参数：
	 - activeKey： - TAB序号或ID
	 - inView： - 知否移动到可视区域，默认：true

### close(key: )
- 用法： 关闭指定Tab
- 参数：
	 - key： 目标序号或者ID

## 关联类型



### Array {#linkarray}


### TabItem {#linktabitem}

- 描述： 标签对象
- 选项：
	 - `id` { string } : 
	 - `name` { string } : 
	 - `icon` { IconDefinition \| IconPack \| IconName } : 
	 - `closeable` { boolean } : 
	 - `page` { string \| Component } : 

### Size {#linksize}

- Size = 	 [TshirtSize](#linktshirtsize) \| [NumberSize](#linknumbersize)

### TshirtSize {#linktshirtsize}

- TshirtSize = 	 `2xs` \| `xs` \| `sm` \| `md` \| `lg` \| `xl` \| `2xl`

### NumberSize {#linknumbersize}

- NumberSize = 	 `1x` \| `2x` \| `3x` \| `4x` \| `5x` \| `6x` \| `7x` \| `8x` \| `9x` \| `10x`