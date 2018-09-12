<template>
  <Select
    placeholder="请选择区"
    clearable
    v-model="currentValue"
    @on-change="onChange"
    label-in-value
    not-found-text=""
    style="width:120px">
    <Option
      v-for="(item, index) in list"
      :value="item.code + ',' + item.name"
      :label="item.name"
      :key="index">
      {{ item.name }}
    </Option>
  </Select>
</template>

<script>
import mixin from './mixin.js'
export default {
  name: 'area',
  data () {
    return {}
  },
  mixins: [mixin],
  computed: {
    currentValue: {
      get () {
        return this.valueToString(this.value)
      },
      set (val) {
        console.log('currentValue area')
        this.$emit('change', this.valueToObject(val))
      }
    }
  },
  props: {
    list: {
      type: Array,
      default: () => []
    },
    value: {
      type: Object,
      default: () => {}
    }
  },
  model: {
    props: 'value',
    event: 'change'
  },
  methods: {
    onChange (val) {
      // console.log(val)
    }
  }
}
</script>
