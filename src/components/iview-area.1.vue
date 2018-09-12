<template>
  <div class="iview-area">
    <!-- 省份的选择 -->
    <Select
      placeholder="请选择省"
      clearable
      v-model="currentProvinceIndex"
      @on-change="provinceChange"
      label-in-value
      not-found-text=""
      style="width:120px">
      <Option
        v-for="(item, index) in provinceList"
        :value="index"
        :label="item.name"
        :key="index">
        {{ item.name }}
      </Option>
    </Select>
    <!-- 市的选择 -->
    <Select
      placeholder="请选择市"
      clearable
      v-model="currentCityIndex"
      @on-change="cityChange"
      label-in-value
      not-found-text=""
      style="width:120px">
      <Option
        v-for="(item, index) in cityList"
        :value="index"
        :label="item.name"
        :key="index">
        {{ item.name }}
      </Option>
    </Select>
    <!-- 区的选择 -->
    <Select
      not-found-text=""
      placeholder="请选择区"
      @on-change="areaChange"
      clearable
      v-model="currentAreaIndex"
      style="width:120px">
      <Option
        v-for="(item, index) in areaList"
        :value="index"
        :label="item.name"
        :key="index">
        {{ item.name }}
      </Option>
    </Select>
  </div>
</template>

<script>
import area from '@/data/area'
const allField = { code: '00', name: '全部' }

export default {
  data () {
    return {
      current: {
        provinceIndex: '',
        cityIndex: '',
        areaIndex: ''
      },
      /** 省市区的select组件的值 */
      provinceList: [],
      cityList: [],
      areaList: []
    }
  },
  computed: {
    // 计算当前的省市区数组
    valueList: {
      get () {
        let result = []

        this.currentProvinceIndex && result.push(this.currentProvince)
        this.currentCityIndex && result.push(this.currentCity)
        this.currentAreaIndex && result.push(this.currentArea)

        switch (this.typeName) {
          case 'all': return result
          case 'name': return result.map(item => { return item.name })
          case 'code': return result.map(item => { return item.code })
        }
      }
    },
    currentProvinceIndex: {
      get () {
        console.log(this.getIndex('province', this.value[0]))
        return this.getIndex('province', this.value[0])
      },
      set (val) {
        this.current.provinceIndex = ''
      }
    },
    currentProvince: {
      get () {
        let { code, name } = this.provinceList[this.current.provinceIndex] || allField
        return { code, name }
      }
    },
    currentCityIndex: {
      get () {
        return this.getIndex('city', this.value[1])
      },
      set (val) {
        this.current.cityIndex = ''
      }
    },
    currentCity: {
      get () {
        let { code, name } = this.cityList[this.current.cityIndex] || allField
        return { code, name }
      }
    },
    currentAreaIndex: {
      get () {
        return this.getIndex('area', this.value[2])
      },
      set (val) {
        this.current.areaIndex = ''
      }
    },
    currentArea: {
      get () {
        let { code, name } = this.areaList[this.current.areaIndex] || allField
        return { code, name }
      }
    }
  },
  props: {
    value: {
      type: Array,
      default: () => []
    },
    typeName: {
      type: String,
      default: 'all',
      validator (value) {
        return ['all', 'name', 'code'].indexOf(value) !== -1
      }
    }
  },
  model: {
    props: 'value',
    event: 'change'
  },
  methods: {
    /** 将传入的值进行显示 */
    // init () {
    //   if (this.value.length === 0) return

    //   let temp

    //   let getIndex = function (val) {
    //     temp = this.value.shift()

    //     if (!temp) return false

    //     return this[`${val}List`].some((item, index) => {
    //       if (item.code === temp.code || item.name === temp.name) {
    //         this.current[`${val}Index`] = index
    //         this[`${val}Change`]({label: temp.name, value: index})
    //         return true
    //       }
    //     })
    //   }.bind(this)

    //   getIndex('province') &&
    //   getIndex('city') &&
    //   getIndex('area')
    // },
    getIndex (val, temp) {
      if (!temp) return '' // 不存在返回空字符串
      var result = ''
      console.log(this[`${val}List`])
      this[`${val}List`].some((item, index) => {
        if (item.code === temp.code || item.name === temp.name) {
          this[`${val}Change`]({label: temp.name, value: index})
          result = index
        }
      })
      // 没找到返回空字符串
      return result
    },
    /** 创建省，市，区的下拉列表数据
     * @method createList
     * @param {String} type 类型只有'province', 'city', 'area' 表示初始化不同的数据
     * @param {Array} list 初始化的列表
     */
    createList (type, list) {
      // 如果传入的list为undefined，则列表置为空
      if (!list) {
        this[`${type}List`] = []
        return
      }

      this[`${type}List`] = [allField, ...list]
    },

    /** 改变省份 获取省份的索引和值 {label: "北京市", value: 1} */
    provinceChange (val) {
      // 在一些老版本的iview中 select清空值 会传递 {label: "", value: ""}
      // 2.14.0版本以上会 则传递undefined 为了兼容老版本的iview
      // 获取选中省份的城市
      let citys = (val &&
                  val.value &&
                  this.provinceList[val.value]['citys']) ||
                  undefined

      // 渲染city列表
      this.createList('city', citys)

      // 将原有的city和area重置为''
      this.current.cityIndex = ''
      this.current.areaIndex = ''

      this.$emit('change', this.valueList)
      this.$emit('onChange', this.valueList)
    },

    /** 改变市 */
    cityChange (val) {
      // 在一些老版本的iview中 select清空值 会传递 {label: "", value: ""}
      // 2.14.0版本以上会 则传递undefined 为了兼容老版本的iview
      // 获取选中城市的区
      let areas = (val &&
                  val.value &&
                  this.cityList[val.value]['areas']) ||
                  undefined

      // 渲染area列表
      this.createList('area', areas)

      // 将原有的area重置为''
      this.current.areaIndex = ''

      this.$emit('change', this.valueList)
      this.$emit('onChange', this.valueList)
    },

    /** 改变区 */
    areaChange () {
      this.$emit('change', this.valueList)
      this.$emit('onChange', this.valueList)
    },

    /** 清空所有，重置 */
    clear () {
      this.current.provinceIndex = ''
      this.current.cityIndex = ''
      this.current.areaIndex = ''

      this.$emit('change', this.valueList)
    }

  },
  created () {
    this.createList('province', area)
    // this.init()
  }
}
</script>

<style scoped lang="less">
  .iview-area {
    display: inline-block;
  }
</style>
