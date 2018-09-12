import iviewNumber from './components/iview-number.vue'
import iviewArea from './components/iview-area/index.vue'

const iviewExtraComponent = {
  iviewNumber,
  iviewArea
}

const install = function install (Vue, option) {
  for (let key in iviewExtraComponent) {
    Vue.component(key, iviewExtraComponent[key])
  }
}

const iviewExtra = {
  install,
  ...iviewExtraComponent
}

export default iviewExtra
