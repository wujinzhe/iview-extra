// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import iView from 'iview'
import 'iview/dist/styles/iview.css'

// const bbb = require('../dist1/index.js')
// import bbb from '../dist1/bbb.js'
import iViewExtra from 'iview-extra'
// import iViewExtra from '../dist/iviewExtra.js'
// // const iViewExtra = require('../dist/iview-extra.js')
// // bbb
// console.log(bbb)
// console.log('------')
// console.log(iViewExtra)
Vue.use(iViewExtra)
Vue.use(iView)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  render: h => h(App)
})
