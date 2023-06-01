# Icon


Button使用

## Props


<div class="props">

| 名称                       | 描述                                                                                                                                                                                                                                                                                                                                                                                                                                          |                      类型                     | 可选值                                                                                                                      |
| :------------------------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :-------------------------------------------: | :-------------------------------------------------------------------------------------------------------------------------- |
| id                         | 组件id，若不设置会自动生成                                                                                                                                                                                                                                                                                                                                                                                                                    |                     String                    |                                                                                                                             |
| display                    | 显示隐藏<hr>默认值:<br><pre>true</pre>                                                                                                                                                                                                                                                                                                                                                                                                        |                    Boolean                    |                                                                                                                             |
| name<br /><span>(*)</span> | 图标名称<br/><br/>例如：<br/>&lt;i class=&quot;fa-solid fa-address-book&quot;&gt;&lt;/i&gt;<br/>描述的是 `fas` 风格的 `address-book`。<br/><br/>组件配置如下：<br/>`prefix`=&quot;fas&quot;<br/>`icon`=&quot;address-book&quot;<br/>或<br/>不设置 `prefix`<br/>设置`icon` 为 `IconDefinition`类型<br/><br/>`import { faCamera } from &#39;@fortawesome/free-solid-svg-icons&#39;;`<br/><br/>[查询图标](https://fontawesome.com/search?m=free) |              IconNameOrDefinition             |                                                                                                                             |
| size                       | 图标尺寸<hr>默认值:<br><pre>md</pre>                                                                                                                                                                                                                                                                                                                                                                                                          |                     String                    | `2xs` , `xs` , `sm` , `md` , `lg` , `xl` , `2xl` , `1x` , `2x` , `3x` , `4x` , `5x` , `6x` , `7x` , `8x` , `9x` , `10x`     |
| fixed-width                | 修复图标宽度<hr>默认值:<br><pre>true</pre>                                                                                                                                                                                                                                                                                                                                                                                                    |                    Boolean                    |                                                                                                                             |
| rotation                   | 旋转<hr>默认值:<br><pre>null</pre>                                                                                                                                                                                                                                                                                                                                                                                                            |                  IconRotation                 | `90` , `180` , `270` , `90` , `180` , `270`                                                                                 |
| flip                       | 翻转                                                                                                                                                                                                                                                                                                                                                                                                                                          |                     String                    | `horizontal` , `vertical` , `both`                                                                                          |
| animation                  | 动画<br/>`beat`: 有节奏的放大缩小。<br/>`fade`: 淡入和淡出图标。<br/>`beat-fade`: beat与fade合并动画。<br/>`bounce`: 上下弹跳。<br/>`flip`: 在 3D 空间中旋转图标（打开新窗口）。 默认情况下，翻转将图标围绕 Y 轴旋转 180 度。 翻转有助于转换、处理状态或使用在现实世界中翻转的物理对象。<br/>`shake`: 来回摇动。<br/>`spin`: 旋转。<br/>`spin-pulse`: 八步旋转。<br/>`spin-reverse`: 逆时针旋转<br/>`spin-pulse-reverse`: 逆时针八步旋转。    |                     String                    | `beat` , `fade` , `beat-fade` , `bounce` , `flip` , `shake` , `spin` , `spin-pulse` , `spin-reverse` , `spin-pulse-reverse` |
| animation-options          | 动画配置选项                                                                                                                                                                                                                                                                                                                                                                                                                                  | [IconAnimationOptions](#iconanimationoptions) |                                                                                                                             |

</div>



## Methods

### setDisplay(flag: boolean)
- 用法： 设置隐藏
- 参数：
	 - flag： true:显示，false:隐藏

### domRefresh()
- 用法： 刷新组件

## 关联类型



### IconAnimationOptions

- 描述： 动画配置选项
- 选项：
	 - `animationDuration` { string } : <br/>说明：持续时间，以秒(s)计算，animationDuration=&#39;1s&#39;<br/>适用动画： `所有`
	 - `animationDirection` { 'normal' | 'reverse' | 'alternate' | 'alternate-reverse' } : <br/>说明：动画播放方向。`normal` 默认方向，`reverse` 反向播放，`alternate` 循环，`alternate-reverse` 反向循环。	请查看 css [`animation-direction`](https://developer.mozilla.org/en-US/docs/Web/CSS/animation-direction)<br/>适用动画： `所有`
	 - `animationDelay` { string } : <br/>说明：设置动画初始化延迟。请查看 css [`animation-delay`](https://developer.mozilla.org/en-US/docs/Web/CSS/animation-delay)<br/>适用动画：`所有`
	 - `animationIterationCount` { string } : <br/>说明：设置动画重复次数。请查看 css [`animation-iteration-count`](https://developer.mozilla.org/en-US/docs/Web/CSS/animation-iteration-count)<br/>适用动画：`所有`
	 - `animationTiming` { string } : <br/>说明：设置动画在每个周期的持续时间内如何进行。请查看 css [`animation-timing`](https://developer.mozilla.org/en-US/docs/Web/CSS/animation-timing-function)<br/>适用动画：`所有`
	 - `beatScale` { string } : <br/>说明：图标缩放最大值<br/>适用动画： `beat` `beat-fade`
	 - `fadeOpacity` { string } : <br/>说明：淡入淡出时最低透明度<br/>适用动画： `fade` `beat-fade`
	 - `bounceRebound` { string } : <br/>说明：设置图标在跳跃后着陆时的反弹量<br/>适用动画： `bounce`
	 - `bounceHeight` { string } : <br/>说明：设置图标在弹跳时跳到的最大高度<br/>适用动画： `bounce`
	 - `bounceStartScaleX` { string } : <br/>说明：设置开始反弹时图标的水平扭曲（“挤压”）<br/>适用动画： `bounce`
	 - `bounceStartScaleY` { string } : <br/>说明：设置开始反弹时图标的垂直扭曲（“挤压”）<br/>适用动画： `bounce`
	 - `bounceJumpScaleX` { string } : <br/>说明：设置跳跃到顶部时图标的水平扭曲（“挤压”）<br/>适用动画： `bounce`
	 - `bounceJumpScaleY` { string } : <br/>说明：设置跳跃到顶部时图标的垂直扭曲（“挤压”）<br/>适用动画： `bounce`
	 - `bounceLandScaleX` { string } : <br/>说明：设置跳跃后着陆时图标的水平扭曲（“挤压”）<br/>适用动画： `bounce`
	 - `bounceLandScaleY` { string } : <br/>说明：设置跳跃后着陆时图标的垂直扭曲（“挤压”）<br/>适用动画： `bounce`
	 - `flipX` { string } : <br/>说明：设置表示旋转轴的向量的 x 坐标（介于 0 和 1 之间<br/>适用动画： `flip`
	 - `flipY` { string } : <br/>说明：设置表示旋转轴的向量的 y 坐标（介于 0 和 1 之间）<br/>适用动画： `flip`
	 - `flipZ` { string } : <br/>说明：设置表示旋转轴的向量的 z 坐标（介于 0 和 1 之间）<br/>适用动画： `flip`
	 - `flipAngle` { string } : <br/>说明：设置翻转的旋转角度。 正角表示顺时针旋转，负角表示逆时针旋转。<br/>适用动画： `flip`