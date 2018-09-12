<template>
  <div class="iview-area">
    <!-- 省份的选择 -->
    <Select
      placeholder="请选择省"
      clearable
      v-model="currentProvince"
      @on-change="change"
      not-found-text=""
      style="width:120px">
      <Option
        v-for="(item, index) in provinceList"
        :value="item.name"
        :label="item.name"
        :key="index">
        {{ item.name }}
      </Option>
    </Select>
    <!-- 市的选择 -->
    <Select
      placeholder="请选择市"
      clearable
      v-model="currentCity"
      @on-change="change"
      not-found-text=""
      style="width:120px">
      <Option
        v-for="(item, index) in cityList"
        :value="item.name"
        :label="item.name"
        :key="index">
        {{ item.name }}
      </Option>
    </Select>
    <!-- 区的选择 -->
    <Select
      not-found-text=""
      placeholder="请选择区"
      @on-change="change"
      clearable
      v-model="currentArea"
      style="width:120px">
      <Option
        v-for="(item, index) in areaList"
        :value="item.name"
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

function getInfo (list, obj) {
  list.some(item => {
    if (obj.code && item.code === obj.code) {
      obj.name = item.name
      return true
    }

    if (obj.name && item.name === obj.name) {
      obj.code = item.code
      return true
    }
  })
}

export default {
  data () {
    return {
      /** 省市区的select组件的值 */
      provinceList: [],
      cityList: [],
      areaList: []
    }
  },
  computed: {
    // 当前的省份对象{code: 'xxx', name: 'xxx}
    province () {
      return this.value[0]
    },
    // 当前的市对象{code: 'xxx', name: 'xxx}
    city () {
      return this.value[1]
    },
    // 当前的区对象{code: 'xxx', name: 'xxx}
    area () {
      return this.value[2]
    },
    currentProvince: {
      get () {
        return this.getTotalInfo('province').name
      },
      set (val) {
        this.$emit('change', [
          this.getTotalInfo('province'),
          this.getTotalInfo('city'),
          this.getTotalInfo('area')
        ])
      }
    },
    currentCity: {
      get () {
        // this.$nextTick(() => {})
        return this.getTotalInfo('city').name
      },
      set (val) {
        this.$emit('change', [
          this.getTotalInfo('province'),
          this.getTotalInfo('city'),
          this.getTotalInfo('area')
        ])
      }
    },
    currentArea: {
      get () {
        return this.getTotalInfo('area').name
      },
      set (val) {
        this.$emit('change', [
          this.getTotalInfo('province'),
          this.getTotalInfo('city'),
          this.getTotalInfo('area')
        ])
      }
    }
  },
  watch: {
    // value (val) {
    //   console.log('value', val)
    //   let province = val[0]
    // },
    province (val) {
      this.provinceList.some(item => {
        if (item.name === val.name) {
          this.createList('city', item.citys)
          return true
        }
      })
    },
    city (val) {
      this.cityList.some(item => {
        if (item.name === val.name) {
          this.createList('area', item.areas)
          return true
        }
      })
    }
  },
  props: {
    value: {
      type: Array,
      default: () => []
    }
  },
  model: {
    props: 'value',
    event: 'change'
  },
  methods: {
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
    /** 获取省市区的完整信息 */
    getTotalInfo (type) {
      let result = { name: '', code: '' }

      if (this[type]) {
        if (!this[type]['name'] && !this[type]['code']) throw new TypeError('省市区数组对象必须包含name或者code属性')

        result = this[type]
        getInfo(this[`${type}List`], result)
      }
      return result
    },
    change () {
      console.log('change')
    }
  },
  created () {
    this.createList('province', area)
  }
}
</script>

<style scoped lang="less">
  .iview-area {
    display: inline-block;
  }
</style>
