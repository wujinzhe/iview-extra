<template>
  <Input
    v-model="inputValue"
    placeholder=""
    :number="true"
    @on-keydown="keyDown"
    @on-change="change"
    @on-keyup="keyUp"
    @input="handleInput"
    v-on="$listeners"
    v-bind="$attrs">
  </Input>
</template>

<script>
export default {
  data () {
    return {
      inputValue: this.value
    }
  },
  props: {
    value: {
      type: Number
    }
  },
  watch: {
    value (val) {
      // console.log(val)
      this.inputValue = val
    }
  },
  methods: {
    keyDown (key) {
      // console.log(key)
    },
    change (val) {
      // console.log(val)
    },
    keyUp (val) {
      // console.log(val)
      // console.log(this.$parent)
    },
    handleInput (value) {
      console.log('-----------')
      console.log(value)
      // let value = event.target.value
      this.$emit('input', value)
      // console.log('11', value)
    }
  }
}
</script>

<style scoped>

</style>
