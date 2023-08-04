import {
  ValidationObserver,
  ValidationProvider,
  extend,
  localize,
} from 'vee-validate'
import vi from 'vee-validate/dist/locale/vi.json'
import * as rules from 'vee-validate/dist/rules'
import Vue from 'vue'

Object.keys(rules).forEach((rule) => {
  // eslint-disable-next-line import/namespace
  extend(rule, rules[rule as keyof typeof rules])
})

extend('length', {
  message: (fieldName) => {
    return `${fieldName} độ dài chưa đúng`
  },
})

extend('email', {
  message: () => {
    return `Email không đúng định dạng`
  },
})

extend('required', {
  message: (fieldName) => {
    return `${fieldName} không được để trống`
  },
})

Vue.component('ValidationObserver', ValidationObserver)
Vue.component('ValidationProvider', ValidationProvider)
localize('vi', vi)
