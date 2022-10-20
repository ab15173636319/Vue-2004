// 工具接口
import sparkMd5 from 'spark-md5'
import serverInfo from '@/js/server'
import { MessageBox } from 'element-ui'
import logger from '@/js/logger'
import qs from 'qs'
import axios from 'axios'
import AutoWebSocket from '@/js/AutoWebSocket'
import router from '@/router/index'
import store from '@/store/index'

let tools = {}

// 格式化日期
tools.formatDate = (value, format) => {
  try {
    // 获取日期格式参数
    format = format ? format : 'yyyy-MM-dd hh:mm:ss'
    if (!isNaN(value) && !(value instanceof Date)) {
      let time = new Date()
      time.setTime(parseInt(value))
      value = time
    }
    let year = value.getFullYear() + ''
    let month = value.getMonth() + 1
    let day = value.getDate()
    let hour = value.getHours()
    let minute = value.getMinutes()
    let second = value.getSeconds()
    month = month < 10 ? '0' + month : '' + month
    day = day < 10 ? '0' + day : '' + day
    hour = hour < 10 ? '0' + hour : '' + hour
    minute = minute < 10 ? '0' + minute : '' + minute
    second = second < 10 ? '0' + second : '' + second
    format = format.replace('yyyy', year)
    format = format.replace('MM', month)
    format = format.replace('dd', day)
    format = format.replace('hh', hour)
    format = format.replace('mm', minute)
    format = format.replace('ss', second)
    format = format.replace('ms', value.getMilliseconds())
    return format
  } catch (ex) {
    logger.error(ex)
    return ''
  }
}
//性别列表
tools.SEX_LIST = [
  { value: 'm', text: '男生' },
  { value: 'f', text: '女生' },
]

// 是否为手机模式
tools.isMobile = () => {
  return tools.getBrowserInfo().versions.mobile
}

// 是否为ios
tools.isIos = () => {
  return tools.getBrowserInfo().versions.ios
}
// 是否为android
tools.isAndroid = () => {
  return tools.getBrowserInfo().versions.android
}
// 是否为weixin
tools.isWx = () => {
  return tools.getBrowserInfo().versions.weixin
}

// 获取浏览器信息
tools.getBrowserInfo = () => {
  let browser = {
    versions: (() => {
      let u = navigator.userAgent
      // let app = navigator.appVersion;
      return {
        trident: u.indexOf('Trident') > -1, //IE内核
        presto: u.indexOf('Presto') > -1, //opera内核
        webKit: u.indexOf('AppleWebKit') > -1, //苹果、谷歌内核
        gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1, //火狐内核
        mobile: !!u.match(/AppleWebKit.*Mobile.*/), //是否为移动终端
        ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端
        android: u.indexOf('Android') > -1 || u.indexOf('Adr') > -1, //android终端
        iPhone: u.indexOf('iPhone') > -1, //是否为iPhone或者QQHD浏览器
        iPad: u.indexOf('iPad') > -1, //是否iPad
        webApp: u.indexOf('Safari') == -1, //是否web应该程序，没有头部与底部
        weixin: u.indexOf('MicroMessenger') > -1, //是否微信 （2015-01-22新增）
        qq: u.match(/\sQQ/i) == ' qq', //是否QQ
      }
    })(),
    language: (navigator.browserLanguage || navigator.language).toLowerCase(),
  }

  return browser
}

// 合并json对象
tools.concatJson = (...jsons) => {
  logger.debug('json参数列表：', jsons)
  let result = {}
  jsons.forEach((json) => {
    for (const key in json) {
      if (Object.hasOwnProperty.call(json, key)) {
        result[key] = JSON.parse(JSON.stringify(json[key]))
      }
    }
  })
  return result
}

// json格式化
const styles = {
  key: 'color: red',
  string: 'color: fuchsia',
  number: 'color: green',
  boolean: 'color: maroon',
  other: 'color: maroon',
}

tools.formatJson = (json, highlight) => {
  // 缩进显示json字符串
  const result = JSON.stringify(json, undefined, 4)
  if (highlight) {
    return tools.jsonSyntaxHighlight(result)
  }
  return result
}

tools.jsonSyntaxHighlight = (json) => {
  // 格式化显示json
  // json语法高亮
  json = json.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
  json = json.replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+-]?\d+)?)/g, function (match) {
    let style = 'number'
    if (/^"/.test(match)) {
      if (/:$/.test(match)) {
        style = 'key'
      } else {
        style = 'string'
      }
    } else if (/true|false/.test(match)) {
      style = 'boolean'
    } else if (/null/.test(match)) {
      style = 'other'
    }
    return '<span style="' + styles[style] + '">' + match + '</span>'
  })
  return json
}

// 文件相关功能
// 获取文件扩展名
tools.getFileSuffix = (filename) => {
  let pos = filename.lastIndexOf('.')
  let suffix = ''
  if (pos != -1) {
    suffix = filename.substring(pos)
  }
  return suffix
}

// 获取大类型名称
tools.getFileType = (type) => {
  let index = type.indexOf('/')
  return index > -1 ? type.substring(0, index) : type
}

// 打开文件选中对话框并获取文件
tools.openFile = (cb, instance) => {
  let result = { el: null, file: null, type: '' }
  let file = document.createElement('input')
  file.setAttribute('type', 'file')
  result.el = file
  // 文件改变事件
  file.addEventListener('change', () => {
    logger.debug('文件选中变化', file.files)
    if (file.files && file.files.length == 1) {
      result.file = file.files[0]
      result.type = tools.getFileType(result.file.type)
      result.suffix = tools.getFileSuffix(result.file.name)
      cb.call(instance, result)
      return
    }
    cb.call(instance, null)
  })

  file.click()
}

// 获取文件信息
tools.getFileInfo = (file) => {
  return {
    suffix: tools.getFileSuffix(file.name),
    size: file.size,
    type: file.type,
    origSize: file.origSize,
    name: file.name,
  }
}

// 复制文本的方法
tools.copyText = async (str) => {
  // 尝试先用剪贴板api复制文本
  try {
    await navigator.clipboard.writeText(str)
    logger.debug('剪贴板复制文本成功')
    return
  } catch (err) {
    logger.debug('剪贴板复制文本失败: ', err)
  }
  // 不成功则用原始的方式复制
  let input = document.createElement('input')
  input.readOnly = 'readonly'
  input.value = str
  document.body.appendChild(input)
  input.select()
  input.setSelectionRange(0, input.value.length)
  document.execCommand('Copy')
  document.body.removeChild(input)
  logger.debug('原始api复制文本成功')
}

// 将正则校验封装到插件
tools.regValidate = (rule, value, cb, reg, message) => {
  logger.debug(rule)
  if (reg.test(value)) {
    cb()
  } else {
    cb(new Error(message))
  }
}

// md5加密
tools.md5 = (info) => {
  if (info && info.trim() != '') {
    return sparkMd5.hash(info)
  }
  return ''
}

// 服务器信息
tools.serverInfo = serverInfo

tools.empty = () => {}

// ajax
axios.interceptors.request.use((config) => {
  logger.debug('请求配置信息：', config)
  // 处理json参数
  config.data = qs.stringify(config.data, { allowDots: true })
  // 处理get请求（如果链接带有?查询参数就拼接&，否则就直接拼接查询参数）
  let getStr = config.url.indexOf('?') > -1 ? '&' : '?'
  if (config.method == 'get') {
    config.url = config.url + getStr + config.data
    config.data = ''
  }
  // 处理请求地址
  config.url = serverInfo.serverUrl + config.url
  // 处理token头信息
  let headers = config.headers ? config.headers : {}
  headers.token = serverInfo.loadToken()
  config.headers = headers
  return config
})

axios.interceptors.response.use(
  (response) => {
    // 正确应答处理
    logger.debug('应答结果信息：', response)
    // 保存token信息
    serverInfo.saveToken(response)
    return response
  },
  (error) => {
    // 正确应答处理
    logger.debug('应答错误信息：', error)
    return Promise.reject(error)
  }
)

tools.ajax = (url, param, cb, handleMessage, method, returnPromise) => {
  // 处理参数
  logger.debug('ajax请求参数：', url, param, cb, handleMessage, method)
  cb = cb ? cb : tools.empty
  method = method ? method : 'post'
  // 发起请求
  let promise = axios({
    url: url,
    data: param,
    method: method,
  })
  // 直接返回promise的情况
  if (returnPromise) {
    logger.debug('自己处理promise的情况')
    return promise
  }
  // 通用处理
  promise
    .then((resp) => {
      logger.debug('ajax请求结果：', resp)
      logger.debug('ajax请求参数：', param)
      // 处理code1000需要登录的情况
      if (resp.data && resp.data.code && resp.data.code == 1000) {
        store.commit('removeLoginInfo')
        MessageBox({
          type: 'error',
          message: resp.data.message,
          title: '您没有登录',
          callback: () => {
            router.push('/login')
          },
        })
        return
      }
      // 应答结果为错误且不需要处理的就直接弹出对话框
      if (!resp.data.success && !handleMessage) {
        MessageBox({ type: 'error', message: resp.data.message, title: '大三学习期间的报错' })
        return
      }
      // logger.debug('自己处理应答结果')
      cb(resp.data)
    })
    .catch((error) => {
      logger.debug('ajax请求错误：', error)
      if (!handleMessage) {
        MessageBox({ type: 'error', message: '访问数据失败：' + error, title: '教学管理系统' })
        return
      }
      // logger.debug('自己处理错误结果')
      cb({ code: 500, success: false, message: '访问数据失败！', error: error })
    })
}

// 文件上传
// 文件约束
const MAX_FILE_SIZE = 5 * 1024 * 1024
const MAX_FILE_SIZE_MESSAGE = { code: 500, success: false, message: '上传文件大小不能超过5MB' }
const fileAxios = axios.create()
tools.upload = (url, param, file, callback) => {
  logger.debug('上传信息：', url, param, file)
  if (file.size > MAX_FILE_SIZE) {
    callback(MAX_FILE_SIZE_MESSAGE)
    return
  }
  url = serverInfo.serverUrl + url
  callback = callback ? callback : function () {}
  let formdata = new FormData()
  formdata.append('file', file)
  // 需要转换多级json数据为一级的方法，需要判断数据是否为json的方法
  for (let key in param) {
    formdata.append(key, param[key])
  }
  let promise = fileAxios({
    method: 'post',
    url: url,
    data: formdata,
    headers: {
      token: serverInfo.loadToken(),
      'Content-Type': 'multipart/form-data',
    },
  })
  promise
    .then((resp) => {
      logger.debug('ajax应答结果：', resp.data)
      serverInfo.saveToken(resp.data)
      callback(resp.data)
    })
    .catch((error) => {
      logger.debug('ajax处理发生错误：', error)
      callback({ code: 500, success: false, message: '访问数据失败！', error: error })
    })
}

// 获取文件下载地址
tools.getDownloadUrl = (fid) => {
  return serverInfo.serverUrl + '/user/file/download?fid=' + fid
}

// websocket管理集合
let wsMap = new Map()
// websocket封装

tools.websocket = (app) => {
  if (wsMap.has(app)) {
    return wsMap.get(app)
  }
  const socket = new AutoWebSocket(serverInfo.websocketUrl + app)
  wsMap.set(app, socket)
  socket.connect()
  return socket
}

export default tools
