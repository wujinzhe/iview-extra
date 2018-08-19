import iviewNumber from './components/iview-number.vue'
import iviewArea from './components/iview-area.vue'

const iviewExtraComponent = {
  iviewNumber,
  iviewArea
}
const install = function install (Vue, option) {
  for (let key in iviewExtraComponent) {
    Vue.component(key, iviewExtraComponent[key].default)
  }
}

const iviewExtra = {
  install,
  ...iviewExtraComponent
}

export default iviewExtra
// module.exports.default = module.exports = iviewExtra
