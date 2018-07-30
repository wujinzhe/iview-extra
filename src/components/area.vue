<template>
  <div>
    <Select
      placeholder="全部省"
      clearable
      v-model="currentProvince"
      @on-change="provinceChange"
      not-found-text=""
      style="width:200px">
      <Option
        v-for="item in provinceList"
        :value="item.value"
        :key="item.value">
        {{ item.label }}
      </Option>
    </Select>
    <Select
      placeholder="全部市"
      clearable
      v-model="currentCity"
      @on-change="cityChange"
      not-found-text=""
      style="width:200px">
      <Option
        v-for="item in cityList"
        :value="item.value"
        :key="item.value">
        {{ item.label }}
      </Option>
    </Select>
    <Select
      not-found-text=""
      placeholder="全部区"
      clearable
      v-model="currentArea"
      style="width:200px">
      <Option
        v-for="item in areaList"
        :value="item.value"
        :key="item.value">
        {{ item.label }}
      </Option>
    </Select>
  </div>
</template>

<script>
import pcaa from 'area-data/pcaa'
export default {
  data () {
    return {
      currentProvince: '',
      currentCity: '',
      currentArea: '',
      provinceList: [],
      cityList: [],
      areaList: []
    }
  },
  methods: {
    /** 初始化省的数据 */
    initProvince () {
      this.provinceList.push({
        value: '000000',
        label: '全部'
      })

      for (let p in pcaa[86]) {
        this.provinceList.push({
          value: p,
          label: pcaa[86][p]
        })
      }
    },

    /** 根据code初始化市或区的数据 */
    initCityArea (type, code) {
      // 如果code为undefined或者000000（全部）则市或者区列表为空
      if (!code || code === '000000') {
        this[`${type}List`] = []
        return
      }

      this[`${type}List`] = [{
        value: '000000',
        label: '全部'
      }]

      for (let p in pcaa[code]) {
        this[`${type}List`].push({
          value: p,
          label: pcaa[code][p]
        })
      }
    },

    /** 改变省份 */
    provinceChange (val) {
      // 渲染city列表
      this.initCityArea('city', val)

      // 将原有的city和area重置为''
      this.currentCity = ''
      this.currentArea = ''
    },

    /** 改变市 */
    cityChange (val) {
      // 渲染area列表
      this.initCityArea('area', val)

      // 将原有的area重置为''
      this.currentArea = ''
    }

  },
  created () {
    console.log(pcaa)
    this.initProvince()
  }
}
</script>

<style scoped>

</style>
