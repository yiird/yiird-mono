# OVideo



## Props

| 名称    |   类型  | 必填 | 可选值 | 默认值 | 描述                       |
| :------ | :-----: | :--: | :----- | :----- | :------------------------- |
| id      |  String |      |        |        | 组件id，若不设置会自动生成 |
| display | Boolean |      |        | true   | 显示隐藏                   |
| src     |  String |      |        |        |                            |

## Methods

### domRefresh()
- 用法： 刷新组件

### doFullscreen()
- 用法： 设置全屏显示

### doPlay(flag: boolean)
- 用法： 控制播放/暂停
- 参数：
	 - flag： true 播放，false 暂停

### doAdjustVolume(count: number)
- 用法： 设置音量
- 参数：
	 - count： 0..1之间的数字

### doForward()
- 用法： 快进

### doBack()
- 用法： 快退