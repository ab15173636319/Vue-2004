// 日志对象，只有开发模式（development）下才输出debug信息
let env = process.env.NODE_ENV
let logger = {
  debug() {
    if (env === 'development') {
      console.log.apply(this, arguments)
    }
  },
  info() {
    console.info.apply(this, arguments)
  },
  error() {
    console.error.apply(this, arguments)
  },
}

export default logger
