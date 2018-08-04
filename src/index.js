import Number from './components/number.vue'
import Area from './components/area.vue'

const component = {
  Number,
  iArea: Area
}

const install = function install (Vue, option) {
  for (let key in component) {
    Vue.component(key, component[key])
  }
}

const iviewExtra = {
  install,
  ...component
}

export default iviewExtra
// module.exports.default = module.exports = iviewExtra
