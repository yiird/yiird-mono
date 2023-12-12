# Select


Select使用

## Slots


<div class="slots">

| 名称 | 参数 | 描述 |
| :--- | :--- | :--- |
| item |      |      |

</div>



## Props


<div class="props">

| 名称                       | 描述                                                                                               |                                                                               类型                                                                               | 可选值                                                                                                                  |
| :------------------------- | :------------------------------------------------------------------------------------------------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------: | :---------------------------------------------------------------------------------------------------------------------- |
| id                         | 组件id，若不设置会自动生成                                                                         |                                                                              String                                                                              |                                                                                                                         |
| display                    | 显示隐藏<hr>默认值:<br><pre>true</pre>                                                             |                                                                              Boolean                                                                             |                                                                                                                         |
| rendered                   | 组件渲染完后的回调                                                                                 |                                                      (args:[RenderedReturn](#linkrenderedreturn)) =&gt; void                                                     |                                                                                                                         |
| theme                      |                                                                                                    |                                                             OpperatorTheme&lt;unknown&gt; \| unknown                                                             |                                                                                                                         |
| name                       | 表单项 `name`                                                                                      |                                                                              string                                                                              |                                                                                                                         |
| placeholder                | 占位提示内容                                                                                       |                                                                              string                                                                              |                                                                                                                         |
| disabled                   | 禁用<hr>默认值:<br><pre>false</pre>                                                                |                                                                              boolean                                                                             |                                                                                                                         |
| readonly                   | 只读<hr>默认值:<br><pre>false</pre>                                                                |                                                                              boolean                                                                             |                                                                                                                         |
| status                     | 数据状态<hr>默认值:<br><pre>default</pre>                                                          |                                                                   [DataStatus](#linkdatastatus)                                                                  | `default` , `success` , `error` , `warn`                                                                                |
| v-model                    | 数据双向绑定                                                                                       |                                             string \| boolean \| number \| Array&lt;string&gt; \| Array&lt;number&gt;                                            |                                                                                                                         |
| multi                      | 是否是多选<hr>默认值:<br><pre>false</pre>                                                          |                                                                              boolean                                                                             |                                                                                                                         |
| source                     | 数据源                                                                                             |                                                                         Array&lt;any&gt;                                                                         |                                                                                                                         |
| loading                    | <hr>默认值:<br><pre>false</pre>                                                                    |                                                                              boolean                                                                             |                                                                                                                         |
| once                       | 选择一次就关闭下拉<hr>默认值:<br><pre>true</pre>                                                   |                                                                              Boolean                                                                             |                                                                                                                         |
| searchable                 | 是否可以搜索<hr>默认值:<br><pre>false</pre>                                                        |                                                                              boolean                                                                             |                                                                                                                         |
| mode<br /><span>(*)</span> | 下拉模式<br/>`tree` 下拉树<br/>`list` 下拉列表                                                     |                                                                           tree \| list                                                                           | `tree` , `list`                                                                                                         |
| mapping                    | <hr>默认值:<br><pre>default (props: any) {<br>  return props.mode === 'tree' ? {} : {};<br>}</pre> |                                                                                \|                                                                                |                                                                                                                         |
| size                       | <hr>默认值:<br><pre>md</pre>                                                                       |                                                                         [Size](#linksize)                                                                        | `2xs` , `xs` , `sm` , `md` , `lg` , `xl` , `2xl` , `1x` , `2x` , `3x` , `4x` , `5x` , `6x` , `7x` , `8x` , `9x` , `10x` |
| pop-options                | <hr>默认值:<br><pre>default () {<br>  return {<br>    fixedWidth: false<br>  };<br>}</pre>         |                                                             [SelectPopOptions](#linkselectpopoptions)                                                            |                                                                                                                         |
| tree-options               | <hr>默认值:<br><pre>default () {<br>  return {<br>    screenSize: 10<br>  };<br>}</pre>            | Partial&lt;Omit&lt;Readonly&lt;ExtractPropTypes&lt;typeof TreeProps&gt;&gt;,id \| display \| size \| source \| draggable \| multi \| defaultSelectedKeys&gt;&gt; |                                                                                                                         |

</div>



## Events


<div class="events">

| 名称               | 参数 | 描述 |
| :----------------- | :--- | :--- |
| update-model-value |      |      |
| change             |      |      |

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

### OpperatorTheme {#linkopperatortheme}


### DataStatus {#linkdatastatus}

- DataStatus = 	 `default` \| `success` \| `error` \| `warn`

### Size {#linksize}

- Size = 	 [TshirtSize](#linktshirtsize) \| [NumberSize](#linknumbersize) \| number \| (string &amp; { fromT?: any })

### SelectPopOptions {#linkselectpopoptions}

- 选项：

### Partial {#linkpartial}


### Omit {#linkomit}


### Readonly {#linkreadonly}


### ExtractPropTypes {#linkextractproptypes}


### TshirtSize {#linktshirtsize}

- TshirtSize = 	 `2xs` \| `xs` \| `sm` \| `md` \| `lg` \| `xl` \| `2xl`

### NumberSize {#linknumbersize}

- NumberSize = 	 `1x` \| `2x` \| `3x` \| `4x` \| `5x` \| `6x` \| `7x` \| `8x` \| `9x` \| `10x`