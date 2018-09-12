<template>
  <div style="margin:100px;">
    <h3>数字输入组件</h3>
    <iview-number v-model="test" style="width: 200px;"></iview-number>
    <h3>地址组件 （双向绑定值）</h3>
    <iview-area v-model="value" type-name="name"></iview-area>
    <h3>地址组件 （给定初始化的值）</h3>
    <iview-area ref="area" v-model="value1" type-name="name"></iview-area>
    <Button type="primary" @click="$refs.area.clear()">清空</Button>
    <Icon type="md-alarm" />
    <Button type="primary" shape="circle" icon="ios-search"></Button>
    <div style="margin-top: 20px;">{{JSON.stringify(value1)}}</div>
  </div>
</template>

<script>

export default {
  data () {
    return {
      test: 1,
      text: 2,
      value: [],
      value1: []
    }
  },
  methods: {
    keypress (event) {
      if (event.keyCode === 49) {
        event.returnValue = true
        return
      }
      event.returnValue = false
    },
    keydown (val) {
      console.log(val)
    }
  },
  mounted () {
    setTimeout(() => {
      this.value1 = [
        {
          code: '21',
          name: '辽宁省'
        },
        {

          name: '沈阳市'
        },
        {

          name: '大东区'
        }
      ]
    })
  }
}
</script>

<style scoped>
  h3 {
    margin-top: 20px;
    margin-bottom: 10px;
  }
</style>
