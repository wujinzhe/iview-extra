<template>
  <div>
    <area-province v-model="province" :list="provinceList"/>
    <area-city v-model="city" :list="cityList"/>
    <area-area v-model="area" :list="areaList"/>
  </div>
</template>

<script>
import areaProvince from './province.vue'
import areaCity from './city.vue'
import areaArea from './area.vue'
import areaData from '@/data/area'

export default {
  name: 'iview-area',
  components: {
    areaProvince,
    areaCity,
    areaArea
  },
  data () {
    return {
      provinceList: areaData,
      cityList: [],
      areaList: [],
      province: '',
      city: '',
      area: ''
    }
  },
  watch: {
    province (val) {
      this.setCityList(val)
    },
    city (val) {
      console.log('watch city')
      this.setAreaList(val)
    }
  },
  methods: {
    setCityList (val) {
      this.provinceList.some(item => {
        if (item.name === val.name || item.code === val.code) {
          this.cityList = item.citys
          return true
        }
      })
    },
    setAreaList (val) {
      this.cityList.some(item => {
        if (item.name === val.name || item.code === val.code) {
          this.areaList = item.areas
          return true
        }
      })
    }
  },
  created () {
    this.setCityList(this.province)
    this.setAreaList(this.area)
  },
  mounted () {
    setTimeout(() => {
      this.province = {
        name: '江西省',
        code: '36'
      }
      this.city = {
        name: '南昌市',
        code: '3601'
      }
      this.area = {
        name: '进贤县',
        code: '360124'
      }
    }, 3000)
  }
}
</script>

<style scoped>

</style>
