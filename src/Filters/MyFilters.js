import logger from '@/js/logger'
import tools from '@/js/tools'
import Vue from 'vue'

let MyFilter = {}

Vue.filter('formatDate', (value, format) => {
  logger.debug('filter formatDate', value, format)
  return value ? tools.formatDate(value, format) : ''
})

export default MyFilter
