import logger from '@/js/logger'
import Vue from 'vue'
import Vuex from 'vuex'
import tools from '@/js/tools'

Vue.use(Vuex)
const LOCAL_USER_KEY = 'vue-total-2004-userinfo'
// 本地用户信息储存服务
const USER_SERVICE = {
  saveUser(userinfo) {
    localStorage.setItem(LOCAL_USER_KEY, JSON.stringify(userinfo))
  },
  loadUser() {
    let userinfo = localStorage.getItem(LOCAL_USER_KEY)
    if (userinfo) {
      try {
        return JSON.parse(userinfo)
      } catch (ex) {
        return {
          isLogin: false,
          tbUser: {},
          tbUserInfo: {},
          userOtherInfo: {},
        }
      }
    }
    return {
      isLogin: false,
      tbUser: {},
      tbUserInfo: {},
      userOtherInfo: {},
    }
  },
  removeUser() {
    localStorage.removeItem(LOCAL_USER_KEY)
  },
}

export default new Vuex.Store({
  state: {
    count: 0,
    loginUser: USER_SERVICE.loadUser(),
  },
  getters: {},
  mutations: {
    addCount(state) {
      state.count++
    },
    setUserInfo(state, user) {
      // 本地保存用户信息
      USER_SERVICE.saveUser(user)
      // 更新vuex的信息
      state.loginUser = USER_SERVICE.loadUser()
      // state.loginUser = JSON.parse(JSON.stringify(user))
    },
    removeUserInfo(state) {
      // 清除本地用户信息
      USER_SERVICE.removeUser()
      state.loginUser = USER_SERVICE.loadUser()
    },
  },
  actions: {
    updataCount({ commit }) {
      let pro = new Promise((resolve, reject) => {
        logger.debug(resolve, reject)
        setTimeout(() => {
          commit('addCount')
          resolve()
        }, 2000)
      })
      return pro
    },

    updateUserInfo({ commit }) {
      return new Promise((resolve, reject) => {
        tools.ajax(
          '/user/auth/getUserInfo',
          {},
          (data) => {
            let user = { isLogin: data.success }
            if (data.success) {
              user.tbUser = data.tbUser
              user.tbUserInfo = data.tbUserInfo
              user.userOtherInfo = data.userOtherInfo
              commit('setUserInfo', user)
              resolve()
            } else {
              commit('removeUserInfo')
              reject()
            }
          },
          true
        )
      })
    },
  },
  modules: {},
})

/*
  用户登录的vuex逻辑
  1、用户登录相关的信息会用vuex储存
  2、所有需要用户登录相关信息的地方都要使用computed调用vuex中储存的用户信息
  3、为了避免用户强制刷新或者开新标签页导致vuex的用户信息丢失，需要将vuex的信息保存到本地储存
  4、当用户信息改变的时候，需要调用action去更新vuex中的用户信息，比如登录成功、安全退出、修改用户信息这类功能
*/
