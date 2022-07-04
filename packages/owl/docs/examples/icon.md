---
title: 图标 o-icon
---

# Example - `o-icon`

```ts
import { faCamera } from '@fortawesome/free-solid-svg-icons';
import {createUI,OwlOptions} from '@yiird/owl';
const app = Vue.createApp();

const options:OwlOptions = {
    //装载icon到环境中
    icons:[faCamera]
}
app.use(createUI(),options)
```

## Size

<ClientOnly>
    <Example name="icon-size"  iframe-height="400px"></Example>
</ClientOnly>

## Fixed Width

<ClientOnly>
    <Example name="icon-fixed-width"  iframe-height="180px"></Example>
</ClientOnly>


## Rotate and Flip

<ClientOnly>
    <Example name="icon-rotation-flip" iframe-height="400px" ></Example>
</ClientOnly>

## Animate

<ClientOnly>
    <Example name="icon-animate" iframe-height="400px" ></Example>
</ClientOnly>