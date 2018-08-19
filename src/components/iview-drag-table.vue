<template>
  <div class="drag-table">
    <Table
      ref="dragable"
      :columns="columnsList"
      :data="value"
      v-bind="$attrs"
      v-on="$listeners"
    ></Table>
  </div>
</template>

<script>
import Sortable from 'sortablejs'

export default {
  name: 'iview-drag-table',
  props: {
    columnsList: Array,
    value: Array
  },
  methods: {
    startFunc (e) {
      this.$emit('on-start', e.oldIndex)
    },
    endFunc (e) {
      let movedRow = this.value[e.oldIndex]
      this.value.splice(e.oldIndex, 1)
      this.value.splice(e.newIndex, 0, movedRow)
      this.$emit('on-end', {
        value: this.value,
        from: e.oldIndex,
        to: e.newIndex
      })
    },
    chooseFunc (e) {
      this.$emit('on-choose', e.oldIndex)
    }
  },
  mounted () {
    var el = this.$refs.dragable.$children[1].$el.children[1]
    let vm = this
    Sortable.create(el, {
      onStart: vm.startFunc,
      onEnd: vm.endFunc,
      onChoose: vm.chooseFunc
    })
  }
}
</script>

<style>
</style>
