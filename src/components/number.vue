<template>
  <Input
    ref="input"
    v-model="currentValue"
    v-on="$listeners"
    v-bind="$attrs">
  </Input>
</template>

<script>
export default {
  data () {
    return {
      inputValue: this.value,
      oldValue: this.value
    }
  },
  computed: {
    currentValue: {
      get () {
        return parseInt(this.inputValue)
      },
      set (val) {
        this.inputValue = val
      }
    }
  },
  model: {
    props: 'value',
    event: 'input'
  },
  props: {
    value: {
      type: [Number, String]
    },
    decimal: {
      type: Number,
      default: 0
    },
    max: {
      type: Number,
      default: 100
    },
    min: {
      type: Number,
      default: 0
    }
  },
  watch: {
    value (val) {
      console.log('current', val)
      console.log('old', this.oldValue)
      // this.inputValue = val.toString().replace(/[^\d]*/g, '')
      this.$refs.input.setCurrentValue(this.currentValue)
      this.$emit('input', this.currentValue)

      this.oldValue = this.currentValue // 将当前值赋给oldValue，实时保存当前值的变量
    }
  },
  methods: {
    input (val) {
      // console.log(val)
      // let currentVal = this.inputValue + val
      // // true 表示不是数字
      // if (Number.isNaN(currentVal))
      console.log('input', this.inputValue)
      this.$emit('input', this.currentValue)
    }
  }
}
</script>

<style scoped>

</style>
