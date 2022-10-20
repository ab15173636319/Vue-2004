import logger from '@/js/logger'
import tools from '@/js/tools'

let MyPluins = {}
// install方法就是规范约定
MyPluins.install = (Vue) => {
  //插件核心功能还是对vue对象进行扩展
  Vue.prototype.$logger = logger

  Vue.prototype.$md5 = tools.md5
}

export default MyPluins
