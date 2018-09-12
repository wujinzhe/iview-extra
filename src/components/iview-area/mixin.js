export default {
  methods: {
    valueToString (value) {
      return value ? `${value.code},${value.name}` : ''
    },
    valueToObject (value) {
      let obj = value.split(',')
      return { code: obj[0], name: obj[1] }
    }
  }
}
