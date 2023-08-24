# Menu


Menu使用

## Props


<div class="props">

| 名称       | 描述                                                                                                                                                                                                             |                 类型                | 可选值 |
| :--------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :---------------------------------: | :----- |
| id         | 组件id，若不设置会自动生成                                                                                                                                                                                       |                String               |        |
| display    | 显示隐藏<hr>默认值:<br><pre>true</pre>                                                                                                                                                                           |               Boolean               |        |
| source     | 数据，此数据为标准树形结构数据或者能构成标准树形结构的扁平数据<hr>默认值:<br><pre>default () {<br>  return [];<br>}</pre>                                                                                        |         Array&lt;object&gt;         |        |
| key-config | 标识(字段)配置<br/><br/>告知组件主键、父主键、显示文本、子节点分别对应数据中的字段<hr>默认值:<br><pre>{<br>  key: 'id',<br>  pkey: 'pid',<br>  ckey: 'children',<br>  ikey: 'icon',<br>  tkey: 'name'<br>}</pre> | [TreeKeyConfig](#linktreekeyconfig) |        |
| mode       |                                                                                                                                                                                                                  |               MenuMode              |        |

</div>



## Methods

### setDisplay(flag: boolean)
- 用法： 设置隐藏
- 参数：
	 - flag： true:显示，false:隐藏

### domRefresh()
- 用法： 刷新组件

## 关联类型



### TreeKeyConfig {#linktreekeyconfig}

- 选项：
	 - `key` { string } : 主键标识
	 - `pkey` { string } : 父级标识
	 - `ckey` { string } : 子节点标识(如果是扁平数据，则不需要配置ckey)
	 - `ikey` { string } : 图标标识，如果数据中没有图标属性，则使用props中配置的图标
	 - `tkey` { string } : 文本内容标识