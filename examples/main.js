// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import iView from 'iview'
// import iViewExtra from '../src/'
import iViewExtra from '../dist/iview-extra.js'
import 'iview/dist/styles/iview.css'

// const bbb = require('../dist1/index.js')
import bbb from '../dist1/index.js'
// bbb
console.log(bbb)
console.log('------')
console.log(iViewExtra)
Vue.use(iView)
Vue.use(iViewExtra)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  render: h => h(App)
})
