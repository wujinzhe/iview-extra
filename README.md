# iview-extra  基于iview的UI组件


## 使用

``` bash
# 安装依赖
npm install iview-extra -S

```

``` JS
import iViewExtra from 'iview-extra'

Vue.use(iViewExtra)
```
和iview一样引入，引入完之后可以直接使用对应的组件，样式只需要引入iview的样式即可，不需要引入其它样式

## 提供组件

### 1. 省市区组件
##### 使用方法
```Vue
<template>
   <iview-area
        v-model="teamArea"
        @onChange="changeTeamArea"
        ref="teamArea"
        type-name="name">
    </iview-area> 
</template>
```
##### iviewExtra props
<table>
    <thead>
        <tr>
            <td>属性</td>
            <td>说明</td>
            <td>类型</td>
            <td>默认值</td>
        </tr>
        <tr>
            <td>value</td>
            <td>省市区组件中的value值，可以用v-model双向绑定数据</td>
            <td>Array</td>
            <td>[]</td> 
        </tr>
        <tr>
            <td>typeName</td>
            <td>v-model中绑定数据格式，可选值为：'all'、'name'、'code'</td>
            <td>String</td>
            <td>'all'</td> 
        </tr>
    </thead>
</table>

##### iviewExtra events
<table>
    <thead>
        <tr>
            <td>事件名</td>
            <td>说明</td>
            <td>返回值</td>
        </tr>
        <tr>
            <td>on-change</td>
            <td>省市区切换时，省市区组件值变化，默返回值为[省信息,市信息,区信息]</td>
            <td>当前组件的返回值</td>
        </tr>
        <tr>
            <td>change</td>
            <td>xxx</td>
            <td>zzz</td>
        </tr>
    </thead>
</table>